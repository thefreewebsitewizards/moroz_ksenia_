const nodemailer = require('nodemailer');

// Create email transporter
let transporter;

try {
  if (process.env.EMAIL_SERVICE === 'gmail') {
    transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD // Use App Password for Gmail
      }
    });
  } else if (process.env.SMTP_HOST) {
    transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
      }
    });
  } else {
    console.log('📧 Email service not configured - emails will be logged only');
  }
} catch (error) {
  console.error('❌ Error configuring email transporter:', error);
}

// Helper function to format currency
const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase()
  }).format(amount / 100);
};

// Helper function to format date
const formatDate = (timestamp) => {
  return new Date(timestamp * 1000).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Send order confirmation email
const sendOrderConfirmationEmail = async (customerEmail, paymentIntent) => {
  try {
    const orderItems = JSON.parse(paymentIntent.metadata?.orderItems || '[]');
    const amount = formatCurrency(paymentIntent.amount, paymentIntent.currency);
    const orderDate = formatDate(paymentIntent.created);
    
    const emailContent = {
      from: process.env.EMAIL_FROM || 'noreply@morozart.com',
      to: customerEmail,
      subject: `Order Confirmation - Moroz Art (Payment ID: ${paymentIntent.id})`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Order Confirmation</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .order-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .item { border-bottom: 1px solid #eee; padding: 15px 0; }
            .item:last-child { border-bottom: none; }
            .total { font-size: 1.2em; font-weight: bold; color: #667eea; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 0.9em; }
            .button { display: inline-block; background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 10px 0; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>🎨 Thank You for Your Purchase!</h1>
            <p>Your order has been confirmed and payment processed successfully.</p>
          </div>
          
          <div class="content">
            <h2>Order Details</h2>
            <div class="order-details">
              <p><strong>Order Date:</strong> ${orderDate}</p>
              <p><strong>Payment ID:</strong> ${paymentIntent.id}</p>
              <p><strong>Customer Email:</strong> ${customerEmail}</p>
              
              <h3>Items Ordered:</h3>
              ${orderItems.map(item => `
                <div class="item">
                  <strong>${item.name}</strong><br>
                  <span>Quantity: ${item.quantity || 1}</span><br>
                  <span>Price: ${formatCurrency(item.price * 100, paymentIntent.currency)}</span>
                </div>
              `).join('')}
              
              <div class="total">
                <p>Total Amount: ${amount}</p>
              </div>
            </div>
            
            <h3>What's Next?</h3>
            <ul>
              <li>🎨 Your artwork will be carefully prepared for shipping</li>
              <li>📦 You'll receive a shipping confirmation with tracking information</li>
              <li>🚚 Estimated delivery: 5-7 business days</li>
              <li>💝 Each piece comes with a certificate of authenticity</li>
            </ul>
            
            <div style="text-align: center;">
              <a href="${process.env.FRONTEND_URL}/orders" class="button">View Order Status</a>
            </div>
            
            <div class="footer">
              <p>Questions about your order? Contact us at <a href="mailto:support@morozart.com">support@morozart.com</a></p>
              <p>Thank you for supporting independent artists! 🎨</p>
              <p>© 2024 Moroz Art. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `
    };
    
    if (transporter) {
      await transporter.sendMail(emailContent);
      console.log(`📧 Order confirmation email sent to: ${customerEmail}`);
    } else {
      console.log(`📧 [EMAIL LOG] Order confirmation for: ${customerEmail}`);
      console.log(`📧 [EMAIL LOG] Subject: ${emailContent.subject}`);
      console.log(`📧 [EMAIL LOG] Amount: ${amount}`);
    }
    
  } catch (error) {
    console.error('Error sending order confirmation email:', error);
    // Don't throw error - email failures shouldn't break payment processing
  }
};

// Send payment failure notification
const sendPaymentFailureEmail = async (customerEmail, paymentIntent) => {
  try {
    const amount = formatCurrency(paymentIntent.amount, paymentIntent.currency);
    const failureReason = paymentIntent.last_payment_error?.message || 'Unknown error';
    
    const emailContent = {
      from: process.env.EMAIL_FROM || 'noreply@morozart.com',
      to: customerEmail,
      subject: `Payment Issue - Moroz Art (Payment ID: ${paymentIntent.id})`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Payment Issue</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #e74c3c; color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .button { display: inline-block; background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 10px 0; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 0.9em; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>⚠️ Payment Issue</h1>
            <p>We encountered an issue processing your payment.</p>
          </div>
          
          <div class="content">
            <div class="details">
              <p><strong>Payment ID:</strong> ${paymentIntent.id}</p>
              <p><strong>Amount:</strong> ${amount}</p>
              <p><strong>Issue:</strong> ${failureReason}</p>
            </div>
            
            <h3>What You Can Do:</h3>
            <ul>
              <li>🔄 Try again with a different payment method</li>
              <li>💳 Check that your card details are correct</li>
              <li>🏦 Contact your bank if the issue persists</li>
              <li>📞 Reach out to our support team for assistance</li>
            </ul>
            
            <div style="text-align: center;">
              <a href="${process.env.FRONTEND_URL}/checkout" class="button">Try Again</a>
            </div>
            
            <div class="footer">
              <p>Need help? Contact us at <a href="mailto:support@morozart.com">support@morozart.com</a></p>
              <p>© 2024 Moroz Art. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `
    };
    
    if (transporter) {
      await transporter.sendMail(emailContent);
      console.log(`📧 Payment failure email sent to: ${customerEmail}`);
    } else {
      console.log(`📧 [EMAIL LOG] Payment failure notification for: ${customerEmail}`);
      console.log(`📧 [EMAIL LOG] Reason: ${failureReason}`);
    }
    
  } catch (error) {
    console.error('Error sending payment failure email:', error);
  }
};

// Send artist notification email
const sendArtistNotificationEmail = async (artistEmail, notificationData) => {
  try {
    const { type, amount, customerEmail, orderItems } = notificationData;
    
    let subject, content;
    
    if (type === 'sale') {
      subject = `🎉 New Sale - ${formatCurrency(amount * 100)}`;
      content = `
        <h2>Congratulations! You have a new sale! 🎉</h2>
        <p><strong>Sale Amount:</strong> ${formatCurrency(amount * 100)}</p>
        <p><strong>Customer:</strong> ${customerEmail}</p>
        <p><strong>Items Sold:</strong></p>
        <ul>
          ${orderItems?.map(item => `<li>${item.name} (Qty: ${item.quantity || 1})</li>`).join('') || '<li>Details not available</li>'}
        </ul>
        <p>The funds will be transferred to your account according to your payout schedule.</p>
      `;
    } else if (type === 'payout') {
      subject = `💰 Payout Processed - ${formatCurrency(amount * 100)}`;
      content = `
        <h2>Your payout has been processed! 💰</h2>
        <p><strong>Payout Amount:</strong> ${formatCurrency(amount * 100)}</p>
        <p>The funds should appear in your bank account within 1-2 business days.</p>
      `;
    }
    
    const emailContent = {
      from: process.env.EMAIL_FROM || 'noreply@morozart.com',
      to: artistEmail,
      subject,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${subject}</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 10px 0; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 0.9em; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Moroz Art - Artist Portal</h1>
          </div>
          
          <div class="content">
            ${content}
            
            <div style="text-align: center;">
              <a href="${process.env.FRONTEND_URL}/artist/dashboard" class="button">View Dashboard</a>
            </div>
            
            <div class="footer">
              <p>Questions? Contact us at <a href="mailto:support@morozart.com">support@morozart.com</a></p>
              <p>© 2024 Moroz Art. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `
    };
    
    if (transporter) {
      await transporter.sendMail(emailContent);
      console.log(`📧 Artist notification email sent to: ${artistEmail}`);
    } else {
      console.log(`📧 [EMAIL LOG] Artist notification for: ${artistEmail}`);
      console.log(`📧 [EMAIL LOG] Type: ${type}`);
    }
    
  } catch (error) {
    console.error('Error sending artist notification email:', error);
  }
};

// Test email configuration
const testEmailConfiguration = async () => {
  try {
    if (!transporter) {
      console.log('📧 Email transporter not configured');
      return false;
    }
    
    await transporter.verify();
    console.log('📧 Email configuration is valid');
    return true;
  } catch (error) {
    console.error('📧 Email configuration error:', error);
    return false;
  }
};

module.exports = {
  sendOrderConfirmationEmail,
  sendPaymentFailureEmail,
  sendArtistNotificationEmail,
  testEmailConfiguration,
  formatCurrency,
  formatDate
};