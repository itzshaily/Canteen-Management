# Tasty Bites - Canteen Management System

Tasty Bites is a modern, responsive web application built with React for managing and ordering food items in a canteen. The platform features user authentication (signup/login), a dynamic menu with real-time inventory management via Firebase Realtime Database, and order tracking.

---

## Features

- **User Authentication**
  - Users can sign up, log in, and log out securely using Firebase Authentication.
  - Different views for regular users and admins.

- **Dynamic Menu**
  - Browse food items with images, descriptions, prices, and available quantity.
  - Search functionality with live filtering.
  - Add items to cart with quantity management.

- **Real-Time Inventory**
  - Product quantities update in real-time after order placement.
  - Admin panel to manage products, inventory, and view sales reports.

- **Order History**
  - Users can view their past orders with detailed receipts.

- **Responsive Design**
  - Fully responsive UI built with React and Bootstrap for desktop and mobile devices.
  - Smooth animations and modern visual effects enhance user experience.

- **PDF Receipt Generation**
  - Receipts generated at checkout with order details and downloadable PDF.

---

## Technologies Used

- React (Functional Components & Hooks)
- React Router v6
- Firebase Authentication & Realtime Database
- React Bootstrap & Bootstrap Icons
- jsPDF for PDF generation
- Firebase Realtime Data Listeners for dynamic updates

---

## Project Structure

/src
/components
/Auth # Login, Signup, User authentication components
/Home # Main user interface, product listing, cart, checkout
/AdminPanel # Admin dashboard and inventory management
/Cart # Shopping cart components
/OrderHistory # User order history views
/Utils # Helper components (Logo, Modals, etc.)
/hooks # Custom hooks (useProducts, useAdmin)
/services # Firebase service configs and helpers
/Database # Static database backup JSON (optional)
App.js # Main app entry with routing
firebase.js # Firebase config & initialization


---

## Installation & Setup

1. Clone the repository  
   `git clone https://github.com/itzshaily/Canteen-Management.git`

2. Navigate into the project directory  
   `cd Canteen-Management`

3. Install dependencies  
   `npm install`

4. Set up Firebase project  
   - Enable Authentication (Email & Password)  
   - Create Realtime Database  

5. Configure `src/firebase.js` with your Firebase credentials.

6. Import the provided `Database.json` into your Firebase Realtime Database.

7. Run the app locally  
   `npm start`

---

## Usage

- New users can sign up to create their accounts.  
- Logged-in users browse menu, add items to cart, and place orders.  
- Admin users have access to manage inventory and view sales reports.  
- Orders update inventory in real-time.  
- Download receipts upon checkout as PDFs.

---

## Contributing

Contributions are welcome!  
Feel free to open issues or submit pull requests for improvements and bug fixes.

---

## Developer

> Developed with ♥ by [Shelly Chaudhary](https://github.com/itzshaily)  
> GitHub: [https://github.com/itzshaily/Canteen-Management](https://github.com/itzshaily/Canteen-Management)

---

## Screenshots

<img width="1916" height="986" alt="image" src="https://github.com/user-attachments/assets/d2893785-33b7-4e6d-8ac3-28160b983d80" />
<img width="1898" height="979" alt="image" src="https://github.com/user-attachments/assets/b05c4f89-fd22-46e0-b496-b62bcccf6adb" />

<img width="1916" height="991" alt="image" src="https://github.com/user-attachments/assets/d5c619b4-5f0e-41c9-8a6a-dca2a539a95e" />
<img width="1918" height="982" alt="image" src="https://github.com/user-attachments/assets/ccacf75d-8250-4736-b10e-90b7e258094c" />
<img width="1911" height="975" alt="image" src="https://github.com/user-attachments/assets/89ca1f9b-0932-445e-bf49-f4878e074dc5" />
<img width="1919" height="978" alt="image" src="https://github.com/user-attachments/assets/4fc23250-8913-4810-be41-dc52ac5db85a" />

---







