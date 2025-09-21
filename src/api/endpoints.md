# Backend API Endpoints

## Product Management

### GET /api/products
Fetch products with filtering and pagination
- Query params: `page`, `limit`, `search`, `assured`, `category`, `sort`
- Response: `{ products: Product[], total: number, hasMore: boolean }`

### GET /api/products/:id
Get single product details
- Response: `Product`

### POST /api/products/:id/wishlist
Add/remove product from user wishlist
- Body: `{ action: 'add' | 'remove' }`

### GET /api/products/:id/reviews
Get product reviews and ratings
- Query params: `page`, `limit`
- Response: `{ reviews: Review[], avgRating: number, total: number }`

## Seller Management

### GET /api/seller/profile
Get seller profile and current tier status
- Response: `{ sellerId, name, tier, qualityScore, metrics, benefits }`

### PUT /api/seller/profile
Update seller profile information
- Body: `{ name, description, contact }`

### GET /api/seller/products
Get seller's product listings
- Query params: `page`, `limit`, `status`, `assured`
- Response: `{ products: Product[], total: number }`

### POST /api/seller/products
Create new product listing
- Body: `Product`

### PUT /api/seller/products/:id
Update product listing
- Body: `Partial<Product>`

### DELETE /api/seller/products/:id
Remove product listing

### GET /api/seller/analytics
Get seller performance analytics
- Query params: `period` (7d, 30d, 90d, 1y)
- Response: `{ metrics, trends, charts }`

### POST /api/seller/metrics
Update seller performance metrics (automated)
- Body: `{ returnRate, avgRating, rtoRate, onTimeDispatch }`

### PUT /api/seller/tier
Update seller tier based on quality score (automated)
- Body: `{ qualityScore, tier }`

## Authentication

### POST /api/auth/register
Register new user/seller
- Body: `{ email, password, type: 'user' | 'seller' }`

### POST /api/auth/login
User/seller login
- Body: `{ email, password }`

### POST /api/auth/logout
Logout current session

### GET /api/auth/me
Get current user/seller profile

## Support & Notifications

### POST /api/support/ticket
Create support ticket
- Body: `{ subject, message, priority }`

### GET /api/notifications
Get user/seller notifications
- Query params: `page`, `limit`, `unread`

### PUT /api/notifications/:id/read
Mark notification as read

## Quality Assurance

### GET /api/assured/criteria
Get Meesho Assured criteria and thresholds

### POST /api/assured/evaluate/:productId
Evaluate product for Assured status
- Response: `{ eligible: boolean, score: number, reasons: string[] }`

### GET /api/assured/products
Get all Assured products
- Query params: `page`, `limit`, `category`

## Data Types

```typescript
interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  isAssured: boolean;
  isFastDispatch?: boolean;
  discount?: number;
  sellerId: string;
  category: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Seller {
  id: string;
  name: string;
  email: string;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
  qualityScore: number;
  metrics: {
    returnRate: number;
    avgRating: number;
    rtoRate: number;
    onTimeDispatch: number;
  };
  joinedAt: Date;
}

interface Review {
  id: string;
  productId: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: Date;
}
```