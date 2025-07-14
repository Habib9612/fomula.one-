# Formula.One - Full-Stack Deployment Guide

## Overview

This is a complete full-stack application with:
- **Frontend**: Next.js 15 with React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API routes with JWT authentication
- **Database**: Prisma ORM with SQLite (development) / PostgreSQL (production)
- **Testing**: Jest with API integration tests
- **UI**: Radix UI components with shadcn/ui

## Development Setup

### Prerequisites
- Node.js 18+
- npm or yarn
- Git

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd fomula.one-
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env.local
# Edit .env.local with your configuration
```

4. Set up the database
```bash
npm run db:push
npm run db:seed
```

5. Start the development server
```bash
npm run dev
```

## Production Deployment

### Option 1: Vercel Deployment (Recommended)

1. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository

2. **Set Environment Variables**
   ```
   JWT_SECRET=your-production-jwt-secret-key
   DATABASE_URL=your-production-database-url
   NEXT_PUBLIC_API_URL=https://your-domain.vercel.app/api
   ```

3. **Deploy**
   - Vercel will automatically build and deploy
   - Database migrations will run via `postinstall` script

### Option 2: Docker Deployment

1. **Create Dockerfile**
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

2. **Build and run**
```bash
docker build -t formula-one .
docker run -p 3000:3000 formula-one
```

### Option 3: Manual Server Deployment

1. **Prepare server** (Ubuntu/Debian)
```bash
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 for process management
sudo npm install -g pm2
```

2. **Deploy application**
```bash
# Clone and setup
git clone <repository-url>
cd fomula.one-
npm install
npm run build

# Set up environment
cp .env.example .env.local
# Edit .env.local with production values

# Start with PM2
pm2 start npm --name "formula-one" -- start
pm2 startup
pm2 save
```

## Database Setup

### SQLite (Development)
- Already configured in `.env.local`
- Database file: `./dev.db`

### PostgreSQL (Production)
1. **Set up PostgreSQL database**
2. **Update DATABASE_URL in environment**
   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/formula_one"
   ```
3. **Run migrations**
   ```bash
   npm run db:push
   npm run db:seed
   ```

## Environment Variables

### Required
- `JWT_SECRET`: Secret key for JWT tokens
- `DATABASE_URL`: Database connection string

### Optional
- `NEXT_PUBLIC_API_URL`: API base URL for frontend
- `NODE_ENV`: Environment (development/production)

## Testing

### Run tests
```bash
npm test                 # Run all tests
npm run test:watch      # Watch mode
npm run test:coverage   # Coverage report
```

### API Testing
- Uses `next-test-api-route-handler` for API route testing
- Includes authentication and database mocking

## Security Considerations

1. **JWT Secret**: Use a strong, random secret in production
2. **Database**: Use PostgreSQL with proper access controls
3. **Environment**: Never commit `.env.local` to version control
4. **HTTPS**: Always use HTTPS in production
5. **CORS**: Configure CORS headers appropriately

## Monitoring & Logging

### Production Monitoring
- Use Vercel Analytics for web vitals
- Set up error tracking (Sentry, LogRocket)
- Monitor API performance

### Logging
- API requests are logged to console
- Database queries via Prisma logging
- Error tracking in production

## Backup Strategy

### Database Backups
1. **SQLite**: Copy `dev.db` file
2. **PostgreSQL**: Use `pg_dump`
   ```bash
   pg_dump $DATABASE_URL > backup.sql
   ```

### Application Backups
- Version control (Git)
- Environment configuration backup
- Regular dependency updates

## Scaling Considerations

### Performance Optimization
- Next.js built-in optimizations
- Database query optimization
- CDN for static assets
- Image optimization

### Horizontal Scaling
- Multiple server instances
- Load balancer configuration
- Database connection pooling
- Session storage (Redis)

## Maintenance

### Regular Tasks
- Update dependencies
- Security patches
- Database maintenance
- Performance monitoring

### Database Maintenance
```bash
# View database
npm run db:studio

# Create migration
npm run db:migrate

# Reset database
npm run db:reset && npm run db:seed
```

## Troubleshooting

### Common Issues

1. **Database connection errors**
   - Check DATABASE_URL format
   - Verify database server is running
   - Check network connectivity

2. **JWT authentication errors**
   - Verify JWT_SECRET is set
   - Check token expiration
   - Validate token format

3. **Build failures**
   - Clear `.next` folder
   - Reinstall dependencies
   - Check TypeScript errors

### Debug Commands
```bash
# Check database status
npm run db:studio

# View logs
pm2 logs formula-one

# Check build output
npm run build
```

## Support

For issues and questions:
1. Check this deployment guide
2. Review application logs
3. Check database connectivity
4. Verify environment variables

---

## Quick Commands Reference

```bash
# Development
npm run dev              # Start development server
npm run db:studio       # Open database viewer

# Production
npm run build           # Build for production
npm start              # Start production server

# Database
npm run db:push        # Apply schema changes
npm run db:seed        # Seed database
npm run db:migrate     # Create migration

# Testing
npm test               # Run tests
npm run test:coverage  # Coverage report
```
