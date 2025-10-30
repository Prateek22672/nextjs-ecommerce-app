Next.js E-Commerce Web Application

Student Information

Name: Prateek Koratala
Date: October 30, 2025
Framework: Next.js (App Router)
Deployed Link: https://nextjs-ecommerce-app-iota.vercel.app

GitHub Repository: https://github.com/Prateek22672/nextjs-ecommerce-app
______________________________________________________________________________

Project Description

This project is a simple and minimal e-commerce style web application built using Next.js.
It allows users to browse products, filter by price, view product details, and mark items as favorites.
Administrators can manage product inventory through a separate admin panel.

The goal of this project is to demonstrate different rendering methods in Next.js (SSG, SSR, ISR, and CSR) along with API routes and frontend integration using mock JSON data instead of a real database.

______________________________________________________________________________


Tech Stack

Frontend: Next.js (App Router), React, TypeScript, Tailwind CSS

Backend: Next.js API Routes (mock JSON data)

Deployment: Vercel

______________________________________________________________________________


Rendering Methods Used
Page	             Rendering Method	     Description
/	Static              Site Generation (SSG)    	The home page is statically generated for performance.
/products/[slug]    Incremental Static Regeneration (ISR)    	Product pages are updated periodically.
/dashboard    	Server-Side Rendering (SSR)	    Inventory data is fetched at request time.
/admin    	Client-Side Rendering (CSR)	       Uses client-side fetching for product management.

______________________________________________________________________________


Features

Search and filter products by name and price

Product details page with image and description

Favorites section for quick access

Admin dashboard with add, edit, and delete options

Inventory dashboard with live product statistics

Minimal and clean black-and-white user interface

______________________________________________________________________________


Environment Variables

Add the following in a .env.local file (already used in deployment):

ADMIN_SECRET=admin123
NEXT_PUBLIC_ADMIN_KEY=admin123

______________________________________________________________________________


How to Run Locally
git clone https://github.com/Prateek22672/nextjs-ecommerce-app.git
cd nextjs-ecommerce-app
npm install
npm run dev


Then open http://localhost:3000
 in your browser.


 ______________________________________________________________________________



Project Structure
app/
 ├── page.tsx                   # Home Page (SSG)
 ├── products/[slug]/page.tsx   # Product Details (ISR)
 ├── dashboard/page.tsx         # Dashboard (SSR)
 ├── admin/page.tsx             # Admin Panel (CSR)
 ├── api/products/              # API Routes for CRUD
 ├── components/                # Header, Footer, Hooks
 └── data/products.json         # Mock Product Data

Conclusion

This project demonstrates a complete understanding of the Next.js App Router system, including hybrid rendering methods, dynamic API integration, and deployment workflow.
The system uses mock data but can easily be extended with a real database such as MongoDB in the future.
