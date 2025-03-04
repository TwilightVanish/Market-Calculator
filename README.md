# Buyback Calculator

A [Next.js](https://nextjs.org) application providing streamlined buyback calculations for **EVE Online**.

---

## Requirements

### Environment Variables

Configure the following:

```
DATABASE_URL        // PostgreSQL connection string
EVE_CLIENT_ID       // Obtain from https://developers.eveonline.com/applications
EVE_CLIENT_SECRET   // Obtain from https://developers.eveonline.com/applications
```

> **Note:**  
> For local development, set the EVE Online callback URL to:  
> `http://localhost:3000/api/auth/callback/eveonline`

---

## Development

Start the development server:

```bash
next dev
```

Access the app at [http://localhost:3000](http://localhost:3000).

---

## Production

### Additional Environment Variables

```
AUTH_SECRET   // Pre-shared secret for next-auth (required in production)
NEXTAUTH_URL // Base URL of the deployment (required in production)
```

### Build and Run

#### Option 1: Docker

```bash
docker build -t marketcalculator .
docker run -p 3000:3000 marketcalculator
```

#### Option 2: Manual Deployment

```bash
next build
next start
```

