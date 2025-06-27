# ts-r_next-booking

## Nodejs
[NodeJs v20.17.0](https://nodejs.org/en/download)

## .env
```
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/booking_db"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET=your-secret-key-here
```

## dependencies
```
npm install
```

## Prisma 
```
npx prisma generate
npx prisma db push
```

## dev
```
npx next dev --turbopack
```