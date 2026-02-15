# Email Configuration Setup Guide

## Setup Instructions for Outlook/Microsoft Email

### Step 1: Enable Two-Factor Authentication
1. Go to [account.microsoft.com/security](https://account.microsoft.com/security)
2. Enable Two-Factor Authentication (2FA) if not already enabled
3. Download the Microsoft Authenticator app on your phone

### Step 2: Generate App Password
1. Go to [account.microsoft.com/account/manage-my-microsoft-account](https://account.microsoft.com/account/manage-my-microsoft-account)
2. Click on "Security" in the left sidebar
3. Under "Advanced security options", click on "App passwords" (or go directly to [account.microsoft.com/account/security-info/app-passwords](https://account.microsoft.com/account/security-info/app-passwords))
4. Select "Mail" and "Windows" (or your device)
5. Microsoft will generate a 16-character password - **copy this password**

### Step 3: Update .env File
Create a `.env` file in the root directory (copy from `env.example`) and add:

```
EMAIL_USER=your-email@outlook.com
EMAIL_PASS=your-16-character-app-password
RECIPIENT_EMAIL=subashanandaraj@outlook.com
```

### Step 4: Test Email Configuration
Run the following command to test:
```bash
npm run dev
```

Submit a test message through the contact form to verify emails are being sent.

## Troubleshooting

### Error: "Invalid login"
- Ensure your Outlook account has 2FA enabled
- Double-check the app password (16 characters)
- Make sure you're using the correct email address

### Error: "SMTP Connection failed"
- Check internet connection
- Verify EMAIL_USER and EMAIL_PASS are correct
- Ensure .env file is in the root directory (not in client or server folders)

### Emails not arriving
- Check spam/junk folder
- Verify RECIPIENT_EMAIL is correct
- Check email service error logs in the server console

## Alternative: Using Gmail

If you prefer Gmail instead of Outlook:

1. Enable 2-Step Verification on your Google Account
2. Generate an App Password at [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
3. Update .env:
```
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-16-character-app-password
```

**Note:** With Gmail, change the email service in `server/services/emailService.js`:
```javascript
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});
```

## Features

✅ Sends contact form submissions to your inbox  
✅ Sends confirmation email to the sender  
✅ Professional HTML email formatting  
✅ Form validation before sending  
✅ Error handling and logging
