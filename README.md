# Anna Essentials 🌿

**A modern, elegant, and responsive product showcase website for Anna Essentials, a brand specializing in premium natural oils and aromatic products.**

🌐 **Live Website:** [annaessential.vercel.app](https://annaessential.vercel.app)

---

## 📖 About the Project

Anna Essentials is a product showcase website designed to present the brand's natural oils and aromatic products through a clean, premium, and user-friendly interface.

The website allows customers to explore available products, view product information, and discover the brand's offerings. It also includes an administrative interface that allows authorized administrators to manage the product catalog without editing the source code.

This project demonstrates the development of a modern business website with database integration, image management, and cloud deployment.

## ✨ Features

* **Modern UI/UX:** Clean, elegant design focused on product presentation and brand identity.
* **Responsive Design:** Optimized for desktop, tablet, and mobile devices.
* **Product Catalog:** Displays available products with images, names, prices, and descriptions.
* **Featured Products:** Highlights selected products on the homepage.
* **Dynamic Product Management:** Allows administrators to add, update, and manage products.
* **Image Uploads:** Supports uploading product images through the administrative interface.
* **Database Integration:** Uses Supabase to store and retrieve product information.
* **Secure Administration:** Uses authentication and role-based permissions to protect administrative operations.
* **Production Deployment:** Hosted on Vercel for public access.

## 🛍️ Product Collection

The website features products:

* Rosemary Oil
* Black Seed Oil
* Castor Oil
* Frankincense Oil
* Myrrh Oil
* and more

Each product is presented with a focus on clarity, visual appeal, and the brand's premium identity.

## 🛠️ Tech Stack

| Technology      | Purpose                                        |
| --------------- | ---------------------------------------------- |
| React           | Building reusable UI components                |
| TypeScript      | Type-safe application development              |
| Vite            | Frontend development and build tooling         |
| TanStack Router | Application routing                            |
| Supabase        | Database, authentication, and storage services |
| PostgreSQL      | Relational database                            |
| Vercel          | Hosting and production deployment              |
| Git & GitHub    | Version control and source code management     |

## ⚙️ Architecture

The application connects its frontend to Supabase-backed services to retrieve product information and support administrative operations.

**Application workflow:**

1. Customers visit the website and browse the product catalog.
2. The application retrieves product information from Supabase.
3. Product images and details are displayed through the website interface.
4. Authorized administrators manage products through the administrative interface.
5. Changes are stored in the backend and reflected in the catalog.

## 🚀 Getting Started

Follow these instructions to run the project locally.

### Prerequisites

Make sure you have installed:

* [Node.js](https://nodejs.org/)
* npm
* A Supabase project

### 1. Clone the Repository

```bash
git clone https://github.com/anwar101-coder/annaessential.git
```

### 2. Navigate to the Project Directory

```bash
cd annaessential
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the project root and configure the environment variables required by the application.

Typical variables include:

```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

**Security note:** The service-role key must remain server-side and must never be exposed in browser code or committed to GitHub. Configure it only in the appropriate server environment. Follow the project's existing environment-variable conventions when setting up local development.

### 5. Set Up the Database

Apply the SQL migrations included in the repository to your Supabase project.

These migrations establish the database structures and permissions required by the application.

Make sure the Supabase environment variables and database configuration match your deployment setup.

### 6. Start the Development Server

```bash
npm run dev
```

Open the local URL printed in your terminal to view the application.

> **Note:** Available scripts and environment-variable requirements may vary with the project configuration. Check `package.json` and the existing application code for the exact commands and setup requirements.

## 🔐 Security

The project uses Supabase to support secure data access and administrative operations.

Security considerations include:

* Keeping service-role credentials private.
* Protecting administrative functionality through authentication and role-based authorization.
* Applying appropriate database permissions and Row Level Security (RLS) policies.
* Validating and restricting administrative operations to authorized users.

Never commit real API secrets, passwords, or private environment variables to the repository.

## 🌍 Deployment

The production website is deployed using Vercel.

**Live URL:** https://annaessential.vercel.app

The deployment connects the application to Supabase for backend functionality and product data management.

## 🎯 Project Goals

The primary goals of this project are to:

* Establish a professional online presence for Anna Essentials.
* Present products in an attractive and accessible format.
* Simplify product catalog management for the business owner.
* Provide a responsive experience across devices.
* Integrate a modern frontend with a cloud-hosted backend.
* Deliver a maintainable application that can support future growth.

## 🔮 Future Improvements

Potential future enhancements include:

* Online ordering and checkout.
* Payment gateway integration.
* Product search and filtering.
* Customer reviews and ratings.
* Improved product discovery and promotional features.
* Analytics for understanding customer engagement.

## 👨‍💻 Developer

**Anwar Adem**

Computer Science Student | Web Developer

* **GitHub:** [@anwar101-coder](https://github.com/anwar101-coder)
* **Portfolio:** [Anwar Adem portfolio](https://anwar-adem.vercel.app/)

---

*Built with a focus on clean design, practical functionality, and a premium product experience.*
