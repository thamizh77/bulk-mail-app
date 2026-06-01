import { useState } from 'react';
import Alert from '../components/Alert';
import Loader from '../components/Loader';
import { sendBulkEmail } from '../services/api';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function parseRecipients(value) {
  // Users enter recipients as comma-separated text; the API receives a clean array.
  return value
    .split(',')
    .map((email) => email.trim())
    .filter(Boolean);
}

function SendBulkEmail() {
  const [form, setForm] = useState({ subject: '', body: '', recipients: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const validate = () => {
    const recipients = parseRecipients(form.recipients);

    if (!form.subject.trim()) {
      return 'Subject cannot be empty.';
    }

    if (!form.body.trim()) {
      return 'Email body cannot be empty.';
    }

    if (recipients.length === 0) {
      return 'At least one recipient email is required.';
    }

    const invalidEmail = recipients.find((email) => !emailPattern.test(email));
    if (invalidEmail) {
      return `Invalid email format: ${invalidEmail}`;
    }

    return '';
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSuccess('');
    setError('');

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);
      await sendBulkEmail({
        subject: form.subject.trim(),
        body: form.body.trim(),
        recipients: parseRecipients(form.recipients)
      });
      setSuccess('Email sent successfully.');
      setForm({ subject: '', body: '', recipients: '' });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="page-section">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Campaign Composer</p>
          <h2>Send Bulk Email</h2>
        </div>
      </div>

      <div className="content-panel">
        <Alert type="success">{success}</Alert>
        <Alert type="error">{error}</Alert>

        <form className="form-stack" onSubmit={handleSubmit}>
          <label>
            Subject
            <input
              name="subject"
              value={form.subject}
              onChange={handleChange}
              placeholder="Monthly product update"
              disabled={loading}
            />
          </label>

          <label>
            Email Body
            <textarea
              name="body"
              value={form.body}
              onChange={handleChange}
              placeholder="Write your message here..."
              rows="10"
              disabled={loading}
            />
          </label>

          <label>
            Recipient Emails
            <textarea
              name="recipients"
              value={form.recipients}
              onChange={handleChange}
              placeholder="alice@example.com, bob@example.com"
              rows="4"
              disabled={loading}
            />
          </label>

          <button className="primary-button" type="submit" disabled={loading}>
            {loading ? <Loader label="Sending emails" /> : 'Send Email'}
          </button>
        </form>
      </div>
    </section>
  );
}

export default SendBulkEmail;
