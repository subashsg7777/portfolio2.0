const nodemailer = require('nodemailer');
require('dotenv').config();

// Determine email provider from EMAIL_USER
const emailUser = process.env.EMAIL_USER || '';
const isGmail = emailUser.includes('gmail.com');
const isOutlook = emailUser.includes('outlook.com') || emailUser.includes('hotmail.com');

// Create transporter based on email provider
let transportConfig;

if (isGmail) {
  transportConfig = {
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  };
} else if (isOutlook) {
  transportConfig = {
    host: 'smtp-mail.outlook.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    tls: {
      ciphers: 'SSLv3',
      rejectUnauthorized: false
    }
  };
} else {
  // Generic configuration
  transportConfig = {
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: process.env.EMAIL_PORT || 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  };
}

const transporter = nodemailer.createTransport(transportConfig);

// Verify transporter configuration
transporter.verify((error, success) => {
  if (error) {
    console.log('Email service configuration error:', error.message);
  } else if (success) {
    console.log('Email service is ready to send messages');
  }
});

/**
 * Send contact form email
 * @param {string} senderName - Name of the sender
 * @param {string} senderEmail - Email of the sender
 * @param {string} message - Message content
 * @returns {Promise} - Promise that resolves with sending status
 */
const sendContactEmail = async (senderName, senderEmail, message) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.RECIPIENT_EMAIL || 'subashanandaraj@outlook.com',
      subject: `New Contact Form Submission from ${senderName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px;">
            <h2 style="color: #333; margin-top: 0;">New Contact Form Submission</h2>
            
            <div style="background-color: white; padding: 20px; border-radius: 5px; margin: 15px 0;">
              <p style="margin: 10px 0;">
                <strong style="color: #0066cc;">From:</strong> ${senderName}
              </p>
              <p style="margin: 10px 0;">
                <strong style="color: #0066cc;">Email:</strong> <a href="mailto:${senderEmail}">${senderEmail}</a>
              </p>
            </div>

            <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #0066cc; margin: 15px 0; border-radius: 3px;">
              <strong style="color: #333;">Message:</strong>
              <p style="color: #555; line-height: 1.6; margin-top: 10px; white-space: pre-wrap;">${message}</p>
            </div>

            <div style="margin-top: 20px; padding-top: 15px; border-top: 1px solid #eee; font-size: 12px; color: #999;">
              <p style="margin: 5px 0;">This email was sent from your portfolio contact form.</p>
              <p style="margin: 5px 0; font-style: italic;">Please reply directly to ${senderEmail} to respond.</p>
            </div>
          </div>
        </div>
      `,
      replyTo: senderEmail
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('Contact email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };

  } catch (error) {
    console.error('Error sending contact email:', error.message);
    throw error;
  }
};

/**
 * Send confirmation email to the sender
 * @param {string} senderName - Name of the sender
 * @param {string} senderEmail - Email of the sender
 * @returns {Promise} - Promise that resolves with sending status
 */
const sendConfirmationEmail = async (senderName, senderEmail) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: senderEmail,
      subject: 'We Received Your Message - Subash Anandaraj',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0;">Thank You!</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 5px 0 0 0;">We've received your message</p>
          </div>
          
          <div style="background-color: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px;">
            <p style="color: #333; font-size: 16px; line-height: 1.6;">
              Hi <strong>${senderName}</strong>,
            </p>
            
            <p style="color: #555; font-size: 14px; line-height: 1.6;">
              Thank you for reaching out! I've received your message and will get back to you as soon as possible.
            </p>

            <p style="color: #555; font-size: 14px; line-height: 1.6;">
              In the meantime, feel free to connect with me on:
            </p>

            <div style="text-align: center; margin: 20px 0;">
              <a href="https://github.com/subashsg7777" style="display: inline-block; margin: 0 10px; color: #0066cc; text-decoration: none; font-weight: bold;">GitHub</a>
              <a href="https://www.linkedin.com/in/subash-anandaraj/" style="display: inline-block; margin: 0 10px; color: #0066cc; text-decoration: none; font-weight: bold;">LinkedIn</a>
            </div>

            <p style="color: #999; font-size: 12px; text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
              This is an automated response. Please don't reply to this email.
            </p>
          </div>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Confirmation email sent to:', senderEmail);
    return { success: true, messageId: info.messageId };

  } catch (error) {
    console.error('Error sending confirmation email:', error.message);
    throw error;
  }
};

module.exports = {
  sendContactEmail,
  sendConfirmationEmail
};
