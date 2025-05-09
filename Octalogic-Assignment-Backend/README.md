# 🚗 Vehicle Booking Backend

This is the backend service for the Vehicle Booking system, providing APIs for vehicle types, bookings, and availability checks.

## 📦 Tech Stack

- Node.js
- Express 
- TypeScript
- Sequelize ORM (MySQL)

---

## 🛠 Setup Instructions

### 1. Clone the Repository

git clone https://github.com/bharti-cmyk/OctalogicTech-Assessment
cd Octalogic-Assignment-Backend

2. Install Dependencies
npm install

3. Configure Environment Variables
Create a .env file:

PORT=4000
DB_HOST=localhost
DB_PORT=3307
DB_USER=admin
DB_PASSWORD=root
DB_NAME=Octalogic-Assessment

4. Run Database Migrations & Seeders
npx sequelize-cli db:migrate
npx ts-node .\src\scripts\run-seed.ts   

5. Start the Server
npm run dev

API Endpoints
Method	Endpoint	    Description
GET	    /vehicle-types	Get vehicle types by wheels
POST	/bookings	    Create a booking