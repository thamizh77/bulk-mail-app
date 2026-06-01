const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateEmailRequest({ subject, body, recipients }) {
  if (!subject || !subject.trim()) {
    return 'Subject cannot be empty.';
  }

  if (!body || !body.trim()) {
    return 'Email body cannot be empty.';
  }

  if (!Array.isArray(recipients) || recipients.length === 0) {
    return 'At least one recipient email is required.';
  }

  const invalidEmail = recipients.find((email) => !emailPattern.test(String(email).trim()));
  if (invalidEmail) {
    return `Invalid email format: ${invalidEmail}`;
  }

  return '';
}

module.exports = { validateEmailRequest };
