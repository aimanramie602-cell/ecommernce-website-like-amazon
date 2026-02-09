# ShopHub - E-Commerce Website

A modern, responsive e-commerce platform built with vanilla HTML, CSS, and JavaScript. ShopHub provides a complete shopping experience with product browsing, shopping cart management, secure checkout, and user authentication.

## 🎯 Features

### Core Functionality
- **Product Browsing**: Browse through multiple product categories with detailed product information
- **Shopping Cart**: Add/remove products with real-time cart updates and subtotal calculation
- **Checkout System**: Complete checkout process with shipping methods and payment information
- **User Authentication**: Sign-in page with email/password validation and social login options
- **Search Functionality**: Real-time product search with intelligent filtering
- **Responsive Design**: Fully responsive layout that works seamlessly on desktop, tablet, and mobile devices

### Product Display
- Featured products carousel
- Best sellers section
- New arrivals showcase
- Product ratings and reviews
- Deal badges and promotions
- Product filtering by category

### User Experience
- Smooth scroll animations
- Interactive navigation bar with dropdown menus
- Quick stats section showing delivery, returns, and support information
- Newsletter subscription
- Customer reviews and testimonials
- Quick access to cart from any page

### Authentication Features
- Email/password login form
- Password visibility toggle
- "Keep me signed in" option with localStorage support
- Social login buttons (Google, Facebook)
- Forgot password link
- Sign up page link
- Form validation with error messages

## 📁 Project Structure

```
WEBSITE PORTFOLIO/
├── index.html           # Main homepage
├── login.html          # Sign-in page
├── checkout.html       # Checkout page
├── script.js           # Main JavaScript functionality
├── style.css           # All styles and responsive design
├── assets/             # Images and media files
└── README.md          # This file
```

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No server or installation required - works locally

### Installation

1. **Download or Clone the Project**
   ```bash
   # If using git
   git clone <repository-url>
   cd "WEBSITE PORTFOLIO"
   ```

2. **Open in Browser**
   - Simply open `index.html` in your web browser
   - Or use a local server for better performance:
     ```bash
     # Python 3
     python -m http.server 8000
     
     # Python 2
     python -m SimpleHTTPServer 8000
     
     # Node.js (http-server)
     npx http-server
     ```

3. **Navigate to Local Server**
   - Open `http://localhost:8000` in your browser

## 🎨 Color Scheme

The website uses the Amazon-inspired color palette:
- **Primary Blue**: `#131921` - Navigation background
- **Accent Orange**: `#FF9900` - Buttons and highlights
- **Light Gray**: `#f5f5f5` - Backgrounds
- **Text Dark**: `#0f1419` - Primary text
- **Text Gray**: `#555` - Secondary text

## 📱 Pages Overview

### 1. **Home Page** (`index.html`)
The main landing page featuring:
- Top navigation with logo, search bar, and account access
- Secondary navigation with category links
- Hero banner with promotional content
- Quick stats section (delivery, returns, support)
- Featured products carousel
- All products grid
- Customer testimonials
- Newsletter subscription
- Footer with links and information

### 2. **Login Page** (`login.html`)
User authentication interface with:
- Email and password input fields
- Remember me checkbox
- Password visibility toggle
- Form validation
- Social login buttons (Google, Facebook)
- Forgot password link
- Sign up page link
- Back to home button
- Error and success messages

### 3. **Checkout Page** (`checkout.html`)
Complete purchase flow including:
- Order summary with itemized list
- Shipping address form
- Shipping method selection
- Payment information section
- Order total calculation
- Security information badge

## 💻 Technologies Used

- **HTML5**: Semantic markup and form elements
- **CSS3**: Flexbox, Grid, animations, and responsive design
- **JavaScript (Vanilla)**: No frameworks or libraries
- **Bootstrap CDN**: Optional utility classes
- **Font Awesome**: Icon library for UI elements

## 🛒 Shopping Cart Features

- Add/remove products dynamically
- Real-time cart count display
- Cart dropdown with item list
- Subtotal calculation
- Clear cart option
- Persistent cart state in session
- "Proceed to Checkout" button

## 🔐 User Authentication

### Login Features
- Email validation
- Password strength requirements
- Remember me functionality (localStorage)
- Form validation with user-friendly error messages
- Social login preparation (OAuth-ready)
- Password visibility toggle

### Security
- Client-side form validation
- Password masking by default
- Error feedback for failed validation
- Success confirmation before redirect

## 📊 Product Information Displayed

Each product shows:
- Product name
- Product icon/image
- Rating (stars) with review count
- Current price
- Original price (with strikethrough)
- "Add to Cart" button
- Deal badges (New, Hot, Sale)

## 🎬 Animations & Effects

- Scroll-triggered animations (fade-in, slide-up)
- Hover effects on products and buttons
- Smooth transitions on all interactive elements
- Cart dropdown animation
- Form input focus effects
- Button press animations

## 📱 Responsive Breakpoints

- **Desktop**: 1024px and above
- **Tablet**: 768px to 1023px
- **Mobile**: Below 768px
- **Small Mobile**: Below 480px

Each breakpoint has optimized layouts and adjusted font sizes for readability.

## 🔧 How to Use

### Adding Products to Cart
1. Click the "Add to Cart" button on any product
2. View cart by clicking the shopping cart icon in the navbar
3. Adjust quantities or remove items as needed

### Checkout Process
1. Click "Proceed to Checkout" in cart dropdown
2. Fill in shipping address
3. Select shipping method
4. Review order summary
5. Click "Place Order" to complete purchase

### Creating an Account
1. Click "Sign in" in the navbar
2. Click "Create one" under "Don't have an account?"
3. Fill in registration details
4. Click "Sign Up"

## 🌐 Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📈 Performance Features

- Lightweight vanilla JavaScript (no heavy frameworks)
- CSS Grid and Flexbox for efficient layouts
- Optimized images and placeholder usage
- Smooth scrolling behavior
- Hardware-accelerated animations
- Minimal external dependencies

## 🎯 Future Enhancements

- Backend API integration
- Real payment gateway integration
- User account management
- Order history and tracking
- Product reviews submission
- Wishlist functionality
- Advanced product filtering
- Real-time inventory management
- Mobile app version

## 📝 File Size

- `index.html`: ~636 lines
- `login.html`: ~350 lines
- `checkout.html`: Variable
- `style.css`: ~1587 lines
- `script.js`: ~368 lines

## ⚡ Quick Tips

1. **Customize Colors**: Edit CSS variables in `style.css` `:root` selector
2. **Add Products**: Modify the products array in `script.js`
3. **Change Company Name**: Replace "ShopHub" with your brand name throughout files
4. **Update Prices**: Modify the `productPrices` object in `script.js`

## 🐛 Known Issues

- Social login buttons are UI-only (require OAuth implementation)
- Forgot password is placeholder (requires backend)
- Sign up page needs to be created
- Payment processing is simulated (needs payment gateway)

## 📞 Support

For issues or questions:
1. Check console for JavaScript errors (F12 → Console)
2. Verify all files are in the same directory
3. Clear browser cache and reload
4. Try a different browser
5. Check responsive design at different screen sizes

## 📄 License

This project is provided as-is for educational and portfolio purposes.

## 🙏 Credits

- **Design Inspiration**: Amazon e-commerce platform
- **Icons**: Font Awesome Icons
- **CSS Framework**: Bootstrap CDN
- **Fonts**: Segoe UI, system fonts

---

**Version**: 1.0.0  
**Last Updated**: February 8, 2026  
**Status**: Active Development

Enjoy building with ShopHub! 🛍️
