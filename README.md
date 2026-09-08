# 1Fi SDE Intern Assignment — 1Fi Marketplace

A "1Fi Marketplace" section built inside the Shop page, per the assignment brief. The Shop page has
three tabs: **Top Brands** (blank, as specified), **Nearby Stores** (blank, as specified), and
**1Fi Marketplace** (fully implemented) — showing smartphones with variant-based pricing and EMI
plans backed by mutual funds, styled to match 1Fi's brand (violet accent, clean card-based layout).

## Tech Stack
- Frontend: React (Vite), Tailwind CSS, React Router, Axios
- Backend: Node.js, Express
- Database: MongoDB (Mongoose)

## Setup

### Backend
```
cd backend
npm install
cp .env.example .env   # add your MongoDB URI
npm run seed            # seeds 3 products with variants + EMI plans
npm run dev              # starts server on http://localhost:5000
```

### Frontend
```
cd frontend
npm install
cp .env.example .env   # set VITE_API_URL if backend isn't on localhost:5000
npm run dev              # starts app on http://localhost:5173
```

## API Endpoints

### GET /api/products
Returns a lightweight list of all products.
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "id": "...",
      "slug": "iphone-17-pro",
      "name": "iPhone 17 Pro",
      "brand": "Apple",
      "startingPrice": 127400,
      "image": "...",
      "variantCount": 3
    }
  ]
}
```

### GET /api/products/:slug
Returns full product detail with all variants and EMI plans.
```json
{
  "success": true,
  "data": {
    "slug": "iphone-17-pro",
    "name": "iPhone 17 Pro",
    "brand": "Apple",
    "variants": [
      {
        "variantId": "256gb-orange",
        "label": "256GB - Deep Orange",
        "mrp": 134900,
        "price": 127400,
        "image": "...",
        "emiPlans": [
          { "tenureMonths": 3, "monthlyAmount": 42467, "interestRate": 0, "cashback": 7500 }
        ]
      }
    ]
  }
}
```

## Schema

**Product**
- slug (unique, used for URL routing)
- name, brand, category
- variants: array of
  - variantId, label, color, storage
  - mrp, price, image
  - emiPlans: array of { tenureMonths, monthlyAmount, interestRate, cashback }

EMI plans are embedded per variant since monthly amount depends on that variant's price.

## Routes
- `/` — Shop / product listing page
- `/products/:slug` — Product detail page (e.g. `/products/iphone-17-pro`)
