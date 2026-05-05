const validator = require('validator');
const { exec } = require('child_process');
const path = require('path');

/**
 * URL safety checker integrating Python ML models
 * @param {string} url - The URL to check
 * @returns {object} - Result of the check
 */
const checkUrlSafety = async (url) => {
  // 1. Validate URL format
  if (!validator.isURL(url)) {
    return { status: 'invalid', message: 'Invalid URL format' };
  }

  // 2. Try to run the Python ML model predictor
  try {
    const pythonScript = path.join(__dirname, '../../scan/predict.py');
    const result = await new Promise((resolve, reject) => {
      // Use 'python' or 'py' depending on windows environment
      exec(`python "${pythonScript}" "${url}"`, (error, stdout, stderr) => {
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

  // 3. Fallback mock check if python model fails (e.g., Python not installed)
  console.log("Falling back to basic URL check...");
  const maliciousKeywords = ['phishing', 'malware', 'scam', 'free-money', 'verify-account-now'];
  const lowercaseUrl = url.toLowerCase();

  const isSuspicious = maliciousKeywords.some(keyword => lowercaseUrl.includes(keyword));

  if (isSuspicious) {
    return {
      status: 'malicious',
      threatType: 'Social Engineering / Phishing (Fallback Mode)',
      confidence: 0.85,
      fallbackMode: true,
      message: 'Python not found. Using basic keyword detection.'
    };
  }

  if (!url.startsWith('https://')) {
    return {
      status: 'suspicious',
      threatType: 'Insecure Connection (HTTP) (Fallback Mode)',
      confidence: 0.5,
      fallbackMode: true,
      message: 'Python not found. Using basic keyword detection.'
    };
  }

  return {
    status: 'safe',
    threatType: 'none',
    confidence: 0.99,
    fallbackMode: true,
    message: 'Python not found. Using basic keyword detection.'
  };
};

module.exports = { checkUrlSafety };
