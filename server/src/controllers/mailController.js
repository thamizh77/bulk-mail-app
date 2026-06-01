const createTransporter = require('../config/nodemailer');
const EmailHistory = require('../models/EmailHistory');
const { validateEmailRequest } = require('../utils/validators');

async function sendMail(req, res, next) {
  const { subject, body, recipients } = req.body;
  const validationError = validateEmailRequest({ subject, body, recipients });

  if (validationError) {
    return res.status(400).json({ success: false, message: validationError });
  }

  let historyRecord;

  try {
    const transporter = createTransporter();

    // Send one message with all recipients through the configured SMTP provider.
    await transporter.sendMail({
      from: `"Bulk Mail App" <${process.env.EMAIL_USER}>`,
      to: recipients,
      subject,
      text: body,
      html: `<div>${body.replace(/\n/g, '<br />')}</div>`
    });

    historyRecord = await EmailHistory.create({
      subject,
      body,
      recipients,
      status: 'success',
      sentAt: new Date()
    });

    return res.status(200).json({
      success: true,
      message: 'Email sent successfully.',
      data: {
        id: historyRecord._id,
        status: historyRecord.status,
        sentAt: historyRecord.sentAt
      }
    });
  } catch (error) {
    try {
      await EmailHistory.create({
        subject,
        body,
        recipients,
        status: 'failed',
        sentAt: new Date(),
        errorMessage: error.message
      });
    } catch (historyError) {
      return next(historyError);
    }

    return res.status(500).json({
      success: false,
      message: 'Email sending failed.',
      error: error.message
    });
  }
}

async function getHistory(req, res, next) {
  try {
    // Newest records first keeps the audit table useful for recent activity.
    const history = await EmailHistory.find().sort({ sentAt: -1 }).lean();
    return res.json({ success: true, data: history });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  sendMail,
  getHistory
};
