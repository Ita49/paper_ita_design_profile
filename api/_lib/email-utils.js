const crypto = require('crypto');

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidEmail(email) {
  return typeof email === 'string' && email.length <= 254 && EMAIL_RE.test(email.trim());
}

function shortHash(input) {
  return crypto.createHash('sha256').update(input).digest('hex').slice(0, 24);
}

module.exports = { isValidEmail, shortHash };
