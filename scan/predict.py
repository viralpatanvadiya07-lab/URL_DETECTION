import sys
import json
import os
import urllib.parse
import re
import warnings

# Suppress warnings
warnings.filterwarnings('ignore')

try:
    import joblib
    import numpy as np
    import pandas as pd
except ImportError:
    print(json.dumps({"error": "Missing required Python libraries. Please install numpy, pandas, joblib, xgboost, lightgbm, catboost."}))
    sys.exit(1)

def extract_features(url, feature_cols):
    """
    Extract features from URL matching the 86 feature columns.
    This is a simplified feature extractor. You may need to replace this
    with your original feature extraction logic used during model training.
    """
    parsed_url = urllib.parse.urlparse(url)
    domain = parsed_url.netloc
    path = parsed_url.path
    query = parsed_url.query
    
    features = {}
    
    # 1. Count-based features
    features['dots'] = url.count('.')
    features['at'] = url.count('@')
    features['equals'] = url.count('=')
    features['slashes'] = url.count('/')
    features['hyphens'] = url.count('-')
    features['colons'] = url.count(':')
    features['question_marks'] = url.count('?')
    features['underscore'] = url.count('_')
    features['tilde'] = url.count('~')
    features['percent'] = url.count('%')
    
    # 2. Digit and character features
    digits = sum(c.isdigit() for c in url)
    features['digits'] = digits
    
    lowercase = sum(c.islower() for c in url)
    uppercase = sum(c.isupper() for c in url)
    features['lowercase'] = lowercase
    features['uppercase'] = uppercase
    
    features['upper_to_lower_ratio'] = uppercase / max(1, lowercase)
    features['url_length'] = len(url)
    features['domain_length'] = len(domain)
    features['path_length'] = len(path)
    features['path_depth'] = path.count('/')
    features['query_length'] = len(query)
    features['query_count'] = query.count('&') + 1 if query else 0
    features['fragment_length'] = len(parsed_url.fragment)
    
    # Ratios
    features['digit_to_length_ratio'] = digits / max(1, len(url))
    special_chars = len(re.findall(r'[^a-zA-Z0-9]', url))
    features['special_chars'] = special_chars
    features['char_to_length_ratio'] = (len(url) - special_chars - digits) / max(1, len(url))
    features['specialchar_to_length_ratio'] = special_chars / max(1, len(url))
    
    # TLD features (dummy implementations, need proper TLD extraction)
    for col in feature_cols:
        if col.startswith('tld_'):
            tld = col.replace('tld_', '.')
            features[col] = 1 if domain.endswith(tld) else 0
            
    # Fill remaining missing features with 0
    for col in feature_cols:
        if col not in features:
            features[col] = 0
            
    # Create DataFrame with exact column order
    df = pd.DataFrame([features])
    return df[feature_cols]

def main():
    if len(sys.argv) < 2:
        print(json.dumps({"error": "No URL provided"}))
        sys.exit(1)
        
    url = sys.argv[1]
    
    # Setup paths
    base_dir = os.path.dirname(os.path.abspath(__file__))
    model_dir = os.path.join(base_dir, 'models')
    feature_cols_path = os.path.join(base_dir, 'feature_cols_v6.json')
    
    try:
        # Load feature columns
        with open(feature_cols_path, 'r') as f:
            feature_cols = json.load(f)
            
        # Extract features
        X = extract_features(url, feature_cols)
        
        # Load scaler
        scaler_path = os.path.join(model_dir, 'scaler_v6.pkl')
        if os.path.exists(scaler_path):
            scaler = joblib.load(scaler_path)
            X_scaled = scaler.transform(X)
        else:
            X_scaled = X.values
            
        # Try loading XGBoost model first
        xgb_path = os.path.join(model_dir, 'v6_xgb.pkl')
        try:
            model = joblib.load(xgb_path)
            # Some older joblib dumps of xgb might need specific loading, but let's assume it works
            prob = model.predict_proba(X_scaled)[0][1]
            pred = model.predict(X_scaled)[0]
            
            is_malicious = bool(pred == 1)
            confidence = float(prob if is_malicious else 1 - prob)
            
            print(json.dumps({
                "status": "malicious" if is_malicious else "safe",
                "confidence": confidence,
                "threatType": "Phishing/Malware" if is_malicious else "none",
                "model_used": "v6_xgb"
            }))
        except Exception as e:
            print(json.dumps({"error": f"Model prediction failed: {str(e)}"}))
            
    except Exception as e:
        print(json.dumps({"error": str(e)}))

if __name__ == "__main__":
    main()
