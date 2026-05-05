const validator = require('validator');
const { exec } = require('child_process');
const path = require('path');
const url_module = require('url');

/**
 * Advanced heuristic URL safety checker with ML model integration
 * @param {string} url - The URL to check
 * @returns {object} - Result of the check
 */
const checkUrlSafety = async (url) => {
  // Normalize URL - add protocol if missing
  let normalizedUrl = url.trim();
  if (!normalizedUrl.match(/^https?:\/\//i)) {
    normalizedUrl = 'http://' + normalizedUrl;
  }

  // 1. Validate URL format
  if (!validator.isURL(normalizedUrl, { require_protocol: false })) {
    return { status: 'invalid', message: 'Invalid URL format' };
  }

  // 2. Try to run the Python ML model predictor
  try {
    const pythonScript = path.join(__dirname, '../../scan/predict.py');
    const result = await new Promise((resolve, reject) => {
      // Use 'python' or 'py' depending on windows environment
      exec(`python "${pythonScript}" "${normalizedUrl}"`, { timeout: 15000 }, (error, stdout, stderr) => {
        if (error) {
          // Fallback if python is not installed or command fails
          console.error(`Python ML execution error: ${error.message}`);
          resolve(null);
          return;
        }
        try {
          const parsed = JSON.parse(stdout.trim());
          if (parsed.error) {
            console.error(`Python script error: ${parsed.error}`);
            resolve(null);
          } else {
            resolve(parsed);
          }
        } catch (parseError) {
          console.error(`Failed to parse python output: ${stdout}`);
          resolve(null);
        }
      });
    });

    if (result) {
      // Return result from Python ML Model
      return {
        status: result.status,
        threatType: result.threatType,
        confidence: result.confidence,
        model_used: result.model_used
      };
    }
  } catch (err) {
    console.error('Error running ML model:', err);
  }

  // 3. Advanced heuristic fallback (when Python ML model is unavailable)
  console.log("Falling back to advanced heuristic URL analysis...");
  return performHeuristicAnalysis(normalizedUrl);
};

/**
 * Advanced heuristic URL analysis - scores the URL based on multiple risk factors
 */
function performHeuristicAnalysis(urlString) {
  const lowercaseUrl = urlString.toLowerCase();
  let parsed;
  try {
    parsed = new URL(urlString);
  } catch {
    try {
      parsed = new URL('http://' + urlString);
    } catch {
      return { status: 'suspicious', threatType: 'Unparseable URL', confidence: 0.6, fallbackMode: true };
    }
  }

  const domain = parsed.hostname || '';
  const fullPath = parsed.pathname || '';
  const query = parsed.search || '';

  let riskScore = 0; // 0 = safe, higher = more risky
  const threats = [];

  // ── 1. Known malicious keywords ──
  const maliciousKeywords = [
    'phishing', 'malware', 'scam', 'free-money', 'verify-account-now',
    'login-verify', 'account-suspended', 'urgent-action', 'click-here-now',
    'prize-winner', 'lottery', 'free-iphone', 'bitcoin-free', 'hack',
    'crack', 'keygen', 'warez', 'torrent-download'
  ];
  const keywordMatches = maliciousKeywords.filter(kw => lowercaseUrl.includes(kw));
  if (keywordMatches.length > 0) {
    riskScore += 40;
    threats.push(`Suspicious keywords: ${keywordMatches.join(', ')}`);
  }

  // ── 2. IP address instead of domain name ──
  const ipPattern = /^(\d{1,3}\.){3}\d{1,3}$/;
  if (ipPattern.test(domain)) {
    riskScore += 25;
    threats.push('IP address used instead of domain name');
  }

  // ── 3. Excessive subdomains (more than 3 dots in domain) ──
  const dotCount = (domain.match(/\./g) || []).length;
  if (dotCount > 3) {
    riskScore += 15;
    threats.push(`Excessive subdomains (${dotCount} levels)`);
  }

  // ── 4. Suspicious TLDs ──
  const suspiciousTLDs = [
    '.xyz', '.top', '.club', '.work', '.date', '.racing', '.win',
    '.bid', '.stream', '.gq', '.cf', '.tk', '.ml', '.ga',
    '.buzz', '.icu', '.cam', '.rest', '.surf'
  ];
  const hasSuspiciousTLD = suspiciousTLDs.some(tld => domain.endsWith(tld));
  if (hasSuspiciousTLD) {
    riskScore += 10;
    threats.push('Suspicious top-level domain');
  }

  // ── 5. URL length check ──
  if (urlString.length > 200) {
    riskScore += 10;
    threats.push('Unusually long URL');
  }

  // ── 6. Excessive special characters in URL ──
  const specialCharCount = (urlString.match(/[@!#$%^&*()\[\]{}|\\<>~`]/g) || []).length;
  if (specialCharCount > 5) {
    riskScore += 15;
    threats.push('Excessive special characters');
  }

  // ── 7. @ symbol in URL (common in phishing) ──
  if (urlString.includes('@')) {
    riskScore += 20;
    threats.push('Contains @ symbol (potential redirect trick)');
  }

  // ── 8. Double slashes in path (not protocol) ──
  const pathDoubleSlash = fullPath.includes('//');
  if (pathDoubleSlash) {
    riskScore += 5;
    threats.push('Double slashes in path');
  }

  // ── 9. Homograph / typosquatting detection for popular domains ──
  const popularDomains = ['google', 'facebook', 'amazon', 'apple', 'microsoft', 'paypal', 'netflix', 'instagram', 'twitter', 'linkedin', 'github', 'yahoo', 'outlook', 'banking'];
  const domainWithoutTLD = domain.split('.').slice(0, -1).join('.');
  
  for (const popular of popularDomains) {
    // Check if domain contains a popular brand but isn't the real domain
    // Expanded regex to include more legitimate country TLDs
    const brandRegex = new RegExp(`^(www\\.)?${popular}\\.(com|org|net|co|io|in|co\\.in|co\\.uk|de|fr|jp|ca|au)$`);
    if (domainWithoutTLD.includes(popular) && !domain.match(brandRegex)) {
      // Could be typosquatting like "google-login.com" or "facebook-verify.xyz"
      riskScore += 20;
      threats.push(`Possible brand impersonation (${popular})`);
    }
  }

  // ── 10. Encoded characters (excessive % encoding) ──
  const encodedCount = (urlString.match(/%[0-9a-fA-F]{2}/g) || []).length;
  if (encodedCount > 5) {
    riskScore += 10;
    threats.push('Excessive URL encoding');
  }

  // ── 11. Known safe domains get a bonus ──
  const knownSafeDomains = [
    'google.com', 'www.google.com', 'google.co.in', 'www.google.co.in',
    'youtube.com', 'www.youtube.com', 'facebook.com', 'www.facebook.com', 
    'amazon.com', 'www.amazon.com', 'amazon.in', 'www.amazon.in',
    'wikipedia.org', 'en.wikipedia.org', 'github.com', 'www.github.com',
    'stackoverflow.com', 'www.stackoverflow.com', 'reddit.com', 'www.reddit.com',
    'twitter.com', 'www.twitter.com', 'x.com', 'www.x.com',
    'linkedin.com', 'www.linkedin.com', 'instagram.com', 'www.instagram.com',
    'microsoft.com', 'www.microsoft.com', 'apple.com', 'www.apple.com',
    'netflix.com', 'www.netflix.com', 'whatsapp.com', 'www.whatsapp.com',
    'yahoo.com', 'www.yahoo.com', 'bing.com', 'www.bing.com',
    'outlook.com', 'www.outlook.com', 'live.com', 'www.live.com',
    'mozilla.org', 'www.mozilla.org', 'cloudflare.com', 'www.cloudflare.com',
    'npmjs.com', 'www.npmjs.com', 'vercel.com', 'www.vercel.com',
    'render.com', 'www.render.com', 'heroku.com', 'www.heroku.com',
    'medium.com', 'www.medium.com', 'notion.so', 'www.notion.so',
    'figma.com', 'www.figma.com', 'canva.com', 'www.canva.com',
    'spotify.com', 'www.spotify.com', 'discord.com', 'www.discord.com',
    'slack.com', 'www.slack.com', 'zoom.us', 'www.zoom.us',
    'flipkart.com', 'www.flipkart.com', 'myntra.com', 'www.myntra.com',
    'paytm.com', 'www.paytm.com', 'zomato.com', 'www.zomato.com',
    'swiggy.com', 'www.swiggy.com', 'bookmyshow.com', 'www.bookmyshow.com'
  ];
  
  if (knownSafeDomains.includes(domain)) {
    riskScore = Math.max(0, riskScore - 50); // Larger safety bonus for known domains
  }

  // ── 12. Common safe TLDs get a small bonus ──
  const safeTLDs = ['.com', '.org', '.net', '.edu', '.gov', '.io', '.co', '.in', '.co.in', '.ac.in'];
  const hasSafeTLD = safeTLDs.some(tld => domain.endsWith(tld));
  if (hasSafeTLD && riskScore < 20) {
    riskScore = Math.max(0, riskScore - 5);
  }

  // ── Determine final result ──
  let status, threatType, confidence;

  if (riskScore >= 40) {
    status = 'malicious';
    threatType = threats.length > 0 ? threats.join(' | ') : 'Multiple risk indicators detected';
    confidence = Math.min(0.95, 0.6 + (riskScore / 200));
  } else if (riskScore >= 15) {
    status = 'suspicious';
    threatType = threats.length > 0 ? threats.join(' | ') : 'Minor risk indicators detected';
    confidence = Math.min(0.8, 0.4 + (riskScore / 100));
  } else {
    status = 'safe';
    threatType = 'none';
    confidence = Math.min(0.99, 0.85 + ((20 - riskScore) / 100));
  }

  return {
    status,
    threatType,
    confidence,
    fallbackMode: true,
    riskScore,
    message: 'Using advanced heuristic analysis (ML model unavailable).'
  };
}

module.exports = { checkUrlSafety };
