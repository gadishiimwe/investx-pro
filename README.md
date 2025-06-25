
# InvestX - Professional Investment Platform

InvestX is a comprehensive, production-ready investment platform built for the Rwandan market. Users can register, activate their accounts, invest in various packages, earn returns, and manage withdrawals through a secure, user-friendly interface.

## 🚀 Features

### User Features
- **Secure Registration & Login** - Email-based authentication with password protection
- **Account Activation** - 5,000 RWF activation fee via Mobile Money
- **Investment Packages** - Multiple investment options with guaranteed returns
- **Wallet Management** - Real-time balance tracking and transaction history
- **Investment Tracking** - Monitor active investments and maturity dates
- **Referral System** - Earn bonuses by referring new users
- **Withdrawal Requests** - Easy withdrawal process with admin approval
- **Mobile Responsive** - Optimized for all devices

### Admin Features
- **User Management** - View, activate, and manage user accounts
- **Package Management** - Create, edit, and delete investment packages
- **Withdrawal Approval** - Approve or reject withdrawal requests
- **Wallet Adjustments** - Manual wallet balance adjustments
- **System Statistics** - Comprehensive platform analytics
- **Secure Admin Panel** - Separate admin authentication and dashboard

## 🛠️ Technical Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS + Shadcn/UI Components
- **State Management**: React Hooks + LocalStorage
- **Routing**: React Router v6
- **Animations**: Tailwind Animate + Framer Motion
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Package Manager**: npm

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd investx-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🎯 User Journey

### New User Registration
1. Visit the landing page
2. Click "Get Started" or "Register"
3. Fill in registration form with personal details
4. Complete 5,000 RWF activation payment via Mobile Money
5. Send payment screenshot via WhatsApp
6. Wait for admin approval and account activation

### Investment Process
1. Login to dashboard
2. Browse available investment packages
3. Select package and invest (up to 3 times per package)
4. Track investment progress and maturity dates
5. Receive returns automatically upon maturity

### Withdrawal Process
1. Request withdrawal from dashboard
2. 10% withdrawal fee applied automatically
3. Admin reviews and approves/rejects request
4. Funds processed within 1-3 business days

## 🔐 Security Features

- **Password Hashing** - Secure password storage
- **Session Management** - Secure authentication tokens
- **Route Protection** - Authenticated routes only
- **Admin Separation** - Separate admin authentication
- **Input Validation** - Form validation and sanitization
- **XSS Protection** - Content security measures

## 📱 Payment Integration

### Mobile Money Payment
- **Provider**: MTN Mobile Money
- **Activation Fee**: 5,000 RWF
- **Payment Number**: +250 736 563 999
- **Confirmation**: WhatsApp screenshot verification

### Withdrawal Policy
- **Minimum**: 10,000 RWF
- **Fee**: 10% of withdrawal amount
- **Schedule**: Monday to Friday only
- **Processing**: 1-3 business days

## 🎨 Design System

### Colors
- **Primary**: Blue (#2563eb)
- **Secondary**: Green (#16a34a)
- **Accent**: Purple (#7c3aed)
- **Warning**: Yellow (#ca8a04)
- **Danger**: Red (#dc2626)

### Typography
- **Font Family**: System fonts (Inter, -apple-system, BlinkMacSystemFont)
- **Sizes**: Responsive scaling from 0.875rem to 3rem

### Components
- **Cards**: Rounded corners, subtle shadows
- **Buttons**: Consistent padding, hover states
- **Forms**: Clean inputs with validation
- **Tables**: Responsive data display

## 🏗️ Project Structure

```
src/
├── components/
│   ├── ui/           # Shadcn/UI components
│   └── custom/       # Custom components
├── pages/
│   ├── Index.tsx     # Landing page
│   ├── Login.tsx     # User login
│   ├── Register.tsx  # User registration
│   ├── Dashboard.tsx # User dashboard
│   ├── AdminLogin.tsx    # Admin login
│   └── AdminDashboard.tsx # Admin panel
├── hooks/
│   └── use-toast.ts  # Toast notifications
├── lib/
│   └── utils.ts      # Utility functions
└── App.tsx           # Main application
```

## 🧪 Demo Credentials

### User Account
- **Email**: user@example.com
- **Password**: password123

### Admin Account
- **Email**: admin@investx.rw
- **Password**: admin123

## 📊 Investment Packages

### Starter Package
- **Investment**: 25,000 RWF
- **Returns**: 30,000 RWF
- **Duration**: 30 days
- **Profit**: 5,000 RWF (20% return)

### Gold Package
- **Investment**: 50,000 RWF
- **Returns**: 65,000 RWF
- **Duration**: 45 days
- **Profit**: 15,000 RWF (30% return)

### Platinum Package
- **Investment**: 100,000 RWF
- **Returns**: 135,000 RWF
- **Duration**: 60 days
- **Profit**: 35,000 RWF (35% return)

## 🛡️ Security Considerations

### Data Protection
- User passwords are hashed before storage
- Sensitive data is encrypted in transit
- Session tokens expire after inactivity
- Admin routes are protected with additional verification

### Business Logic Security
- Investment limits enforced (max 3 per package)
- Wallet balance validation before transactions
- Withdrawal limits and fee calculations
- Referral bonus validation

## 🚀 Deployment

### Production Checklist
- [ ] Environment variables configured
- [ ] Database schema created
- [ ] SSL certificates installed
- [ ] Backup systems in place
- [ ] Monitoring tools configured
- [ ] Payment gateway tested
- [ ] Security audit completed

### Recommended Hosting
- **Frontend**: Vercel, Netlify, or AWS S3
- **Backend**: AWS EC2, Digital Ocean, or Heroku
- **Database**: PostgreSQL or MySQL
- **File Storage**: AWS S3 or Cloudinary

## 📞 Support & Contact

- **Phone**: +250 736 563 999
- **Email**: support@investx.rw
- **WhatsApp**: https://wa.me/250736563999
- **Address**: Kigali, Rwanda

## 📄 License

This project is proprietary software. All rights reserved.

## 🤝 Contributing

This is a private commercial project. Contact the development team for contribution guidelines.

---

**Built with ❤️ for the Rwandan investment community**
