## Lightspeed — Recently Added Products Widget for Ecwid

## Project Description

Lightspeed is a modern, handy widget for Ecwid stores that displays, on the cart and checkout pages, a list of your catalog’s most recently added products. The widget allows the store admin to:

- Display fresh products in a convenient block to increase customer engagement during cart/checkout.
- Enable or disable the widget for shoppers through an intuitive UI.
- Export product data to CSV/XLSX formats (bulk export supported).
- Built with fast technologies — Vue3 + Vite — and easy to deploy on Vercel.

The widget is fully integrated with the Ecwid API, fetching up-to-date product information and updating seamlessly in the UI.

## Project Goal

Lightspeed's goal is to improve sales and usability for online stores on the Ecwid platform by:

- Visually highlighting new products for customers right during checkout,
- Integrating natively with the real Ecwid production API,
- Providing easy setup for both owners and developers,
- Maintaining transparent, extendable architecture for future upgrades and support.

This project is designed for real-world stores (B2C/B2B) and also serves as an educational template for a modern unified frontend+backend SPA integration.

## Main Features

- Displays a widget with the latest products on cart/checkout pages.
- Product export directly from the UI — supports CSV/XLSX format.
- Settings panel for visibility and widget operation right in the app.
- Full Ecwid API support with secure authorization via environment variables.
- Mock mode for development/testing (when the real API is unavailable).

Unique styling, responsive layout, supports click actions and mobile devices.

## Tech Stack

- Vue 3
- Vite
- Vercel Serverless Functions
- Ecwid REST API
- CSV & XLSX Export
- TypeScript, GitHub Actions for CI/CD (optional)

## How to run

docker-compose up --build

Clone the repository:

- git clone https://github.com/Yuriy2437/lightspeed.git
- cd lightspeed/frontend
- yarn install
- yarn build

## Set up environment variables (for Vercel or locally):

- ECWID_STORE_ID=your_store_id
- ECWID_TOKEN=your_public_token

## Deploy to Vercel:

- Import the project from GitHub.
- Configure build/output and environment variables in the Vercel dashboard.

## Main page:

- https://lightspeed-kappa.vercel.app/
- Test access available (login — "Lukas") or as a guest.
- Lukas is the name of the imaginary shop owner for input into Widget Settings.

## For Developers

- Live serverless function (mock/production) supports both test and production data.
- Source code is component-based and modular.
- Supports local development and instant cloud deployment.
- Ready for scaling — easily add more API integrations, filters, analytics, and features.

## Author

- Author/concept: https://github.com/Yuriy2437/
- Technical references: Ecwid API, Vercel Cloud
