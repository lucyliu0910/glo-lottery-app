# 🎫 Official GLO - Thailand Government Lottery App

Complete lottery management system with Firebase backend and admin panel.

## 📦 Project Structure

```
glo-lottery-app/
├── index.html              # Home - Lottery Results Display
├── buy-ticket.html         # Product Listing & Purchase
├── open-ticket.html        # Password-Protected Ticket Locker
├── account.html            # Login/Signup & Invoice System
├── contact.html            # Contact Information
├── admin.html              # Admin Control Panel
├── README.md               # This file
└── images/                 # Image assets (you need to add these)
    ├── watermark.png       # GLO logo (used throughout)
    ├── splash.png          # Splash screen image (3 seconds)
    ├── ticket.jpg          # Lottery ticket image
    ├── product1.jpg        # Product 1 image
    └── product2.jpg        # Product 2 image
```

## 🚀 Quick Start

### Step 1: Upload Images

Create an `images` folder and upload these 5 images:
- `watermark.png` - GLO logo
- `splash.png` - Splash screen
- `ticket.jpg` - Lottery ticket
- `product1.jpg` - Product image 1
- `product2.jpg` - Product image 2

### Step 2: Firebase Setup (Already Done!)

Your Firebase is already configured:
- Project: glo-lottery-app
- Database URL: https://glo-lottery-app-default-rtdb.asia-southeast1.firebasedatabase.app
- 20 sample customers already uploaded

### Step 3: Deploy to GitHub Pages

1. Create a new repository: `glo-lottery-app`
2. Upload all HTML files
3. Create `images/` folder and upload your 5 images
4. Go to Settings → Pages
5. Source: Deploy from branch `main`
6. Folder: `/ (root)`
7. Save

**Live URL:** `https://YOUR-USERNAME.github.io/glo-lottery-app/`

## 🎯 Page Overview

### 1. index.html - Home Page
- **Features:**
  - 3-second splash screen
  - 2-second animated loader
  - Real-time lottery results from Firebase
  - Expandable N3 section
  - Bottom navigation
  - Screenshot protection

**First Time Setup:**
- Results will show default values until you update them via admin panel

### 2. buy-ticket.html - Buy Tickets
- **Features:**
  - 2 product cards (Standard + VIP)
  - COD information section
  - WhatsApp integration
  - Buy Now buttons with pre-filled messages

**WhatsApp Number:** +44 7441 343629

### 3. open-ticket.html - Ticket Locker
- **Features:**
  - Password-protected access
  - 3 attempts limit
  - Permanent lockout after 3 failures
  - Displays ticket image + access code on success

**Default Password:** `ARSB3984` (can be changed in admin panel)

### 4. account.html - Customer Portal
- **Features:**
  - Login/Signup system
  - Invoice display with payment status
  - Payment tracking (Paid/Partially Paid/Unpaid)
  - Balance calculation
  - Logout functionality

**Test Login:**
- Customer ID: `CUS001`
- Password: `pass001`

### 5. contact.html - Contact Page
- **Features:**
  - Agent information (Lucy Liu)
  - Quick action buttons (WhatsApp, Email)
  - Office hours & response time
  - Support languages

### 6. admin.html - Admin Panel ⭐
- **Access:** `https://YOUR-SITE.github.io/glo-lottery-app/admin.html`
- **Login:**
  - Username: `admin`
  - Password: `admin123`

**Features:**
- **Tab 1:** Approve pending signups
- **Tab 2:** Manage customers (view all, add new)
- **Tab 3:** Create/update invoices with payment tracking
- **Tab 4:** Update lottery results (live on home page)
- **Tab 5:** App settings (passwords, contacts, admin password)

## 🔐 Admin Panel Guide

### How to Use Admin Panel

#### 1. Approve New Signups
1. Go to "Pending Signups" tab
2. Click "✅ Approve" for any signup
3. Customer can now login immediately
4. Alert will show their Customer ID

#### 2. Add New Customer Manually
1. Go to "Manage Customers" tab
2. Scroll to "Add New Customer" form
3. Fill in all details
4. Click "✅ Create Customer"
5. Customer can login immediately

#### 3. Create Invoice for Customer
1. Go to "Create Invoice" tab
2. Select customer from dropdown
3. Fill in invoice details:
   - Invoice Number, Dates
   - Product Description
   - Financial details (Subtotal, Discount, Tax, Total)
   - **Payment Status:** Paid / Partially Paid / Unpaid
   - **Amount Paid:** Enter amount (balance auto-calculates)
   - Payment Status Text (with emojis)
   - Registration Status Text (with emojis)
4. Click "💾 Save Invoice"
5. Customer will see it immediately in their account

**Payment Status Examples:**
- **Paid:** Set status to "paid", amount paid = grand total
- **Partially Paid:** Set status to "partially-paid", amount paid = partial amount
- **Unpaid:** Set status to "unpaid", amount paid = 0

#### 4. Update Lottery Results
1. Go to "Lottery Results" tab
2. Fill in:
   - Draw Date (Thai format): `1 ธันวาคม 2568`
   - First Prize: `461252` (6 digits)
   - 3 Digit Front: `389, 655` (comma-separated)
   - 3 Digit Back: `137, 995` (comma-separated)
   - 2 Digit: `22`
3. Click "🚀 Update Results"
4. Results appear on home page instantly!

#### 5. Change Settings
1. Go to "Settings" tab
2. Update:
   - Open Ticket Password (default: ARSB3984)
   - WhatsApp Number
   - Contact Email
   - Admin Password (optional)
3. Click "💾 Save Settings"

## 🔒 Security Features

**All pages have:**
- ✅ Screenshot protection (PrintScreen disabled)
- ✅ Right-click disabled
- ✅ DevTools disabled (F12, Ctrl+Shift+I, etc.)
- ✅ Print disabled (Ctrl+P)
- ✅ Text selection disabled

**Note:** Screen recording cannot be blocked via web technologies. Only native Android APK can block screen recording.

## 📱 Convert to Android APK

### Using PWABuilder

1. Deploy to GitHub Pages first
2. Go to: https://www.pwabuilder.com
3. Enter your live URL
4. Click "Start"
5. Review manifest
6. Click "Build" → "Android"
7. Download APK
8. Test on Android device
9. Upload to Play Store

**Play Store Fee:** $25 USD (one-time)

## 🎨 Customization

### Change Colors
Edit the CSS color variables in each HTML file:
```css
Primary Blue: #1976d2
Secondary Blue: #1e88e5
Gold: #ffd700
Success Green: #4CAF50
Error Red: #f44336
```

### Change Contact Info
Update in admin panel Settings tab or directly in:
- `contact.html` - Contact information
- `buy-ticket.html` - WhatsApp buttons
- Firebase `/settings` - WhatsApp number

### Change Admin Password
1. Login to admin panel
2. Go to Settings tab
3. Enter new password in "New Admin Password"
4. Click Save

## 🔥 Firebase Database Structure

```
glo-lottery-app/
├── customers/              # All customers (approved & pending)
│   └── {pushId}/
│       ├── customerId      # CUS001, CUS002, etc.
│       ├── password
│       ├── email
│       ├── approved        # true/false
│       ├── name
│       ├── location
│       ├── phone
│       ├── vat
│       ├── invoiceNumber   # Invoice details below
│       ├── invoiceDate
│       ├── dueDate
│       ├── poNumber
│       ├── gameDate
│       ├── productDescription
│       ├── subtotal
│       ├── discount
│       ├── tax
│       ├── grandTotal
│       ├── paymentStatus   # paid/partially-paid/unpaid
│       ├── amountPaid      # Number
│       ├── paymentStatusText
│       └── registrationStatusText
│
├── lotteryResults/         # Current lottery results
│   ├── date
│   ├── firstPrize
│   ├── threeDigitFront     # Comma-separated string
│   ├── threeDigitBack      # Comma-separated string
│   └── twoDigit
│
├── settings/               # App settings
│   ├── ticketPassword      # For open-ticket.html
│   ├── whatsappNumber
│   └── contactEmail
│
└── adminSettings/          # Admin credentials
    ├── username            # admin
    └── password            # admin123
```

## 📊 Customer Data Template

To add a new customer with invoice manually in Firebase:

```json
{
  "customerId": "CUS021",
  "password": "pass021",
  "email": "customer021@example.com",
  "approved": true,
  "name": "CUSTOMER NAME",
  "location": "Qatar",
  "phone": "+974 1234 5678",
  "vat": "VAT324448: 7CG54455",
  "gameDate": "16-01-2026",
  "registrationDate": "10-01-2026",
  "invoiceNumber": "TH532478",
  "invoiceDate": "05/01/2026",
  "dueDate": "14/01/2026",
  "poNumber": "65247875",
  "productDescription": "Thailand Lottery 3UP",
  "subtotal": "₹1,416,700.00",
  "discount": "-₹307,423.90",
  "tax": "₹310,597.30",
  "grandTotal": "₹1,419,873.40",
  "paymentStatus": "paid",
  "amountPaid": 1419873.40,
  "paymentStatusText": "👍👍 payment of Rs.2,53,000 has been successfully completed 👍👍",
  "registrationStatusText": "✅✅ REGISTRATION SUCCESSFUL",
  "createdAt": "2026-01-10T10:00:00Z"
}
```

## 🧪 Testing Checklist

### Before Going Live:

- [ ] Upload all 5 images to `images/` folder
- [ ] Test login with CUS001 / pass001
- [ ] Test admin panel login (admin / admin123)
- [ ] Update lottery results from admin panel
- [ ] Verify results show on home page
- [ ] Test signup → admin approval → login flow
- [ ] Create test invoice from admin panel
- [ ] Verify invoice displays correctly
- [ ] Test open-ticket with password ARSB3984
- [ ] Test WhatsApp buttons (all pages)
- [ ] Check mobile responsiveness
- [ ] Verify screenshot protection works
- [ ] Test all bottom navigation links

## 🆘 Troubleshooting

### Images Not Showing
- Make sure `images/` folder exists in root
- Check image filenames match exactly (case-sensitive)
- Images should be: watermark.png, splash.png, ticket.jpg, product1.jpg, product2.jpg

### Firebase Not Working
- Check browser console for errors (F12 in testing)
- Verify Firebase configuration is correct
- Check Firebase Rules allow read/write (should be `true`)
- Ensure database URL is correct

### Login Not Working
- Check customer exists in Firebase `/customers`
- Verify `approved` field is `true`
- Check password matches exactly
- Clear browser cache and try again

### Admin Panel Not Accessible
- URL should be: `https://your-site.github.io/glo-lottery-app/admin.html`
- Not linked from bottom nav (it's standalone)
- Bookmark it for easy access

### Lottery Results Not Updating
- Login to admin panel
- Go to "Lottery Results" tab
- Fill all fields
- Click "Update Results"
- Refresh home page to see changes

## 📞 Support Information

**App Details:**
- App Name: Official GLO
- Agent: Lucy Liu
- Location: Pattaya City, Thailand
- WhatsApp: +44 7441 343629
- Email: governmentlotteryoffice@gmail.com

## 🎉 You're All Set!

Your complete GLO Lottery App is ready to deploy!

1. ✅ Upload images to `images/` folder
2. ✅ Deploy to GitHub Pages
3. ✅ Test everything
4. ✅ Share with customers
5. ✅ Convert to APK (optional)

**Good luck with your lottery business! 🎫**
