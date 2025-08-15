# Full Stack Microservices Architecture

A production-ready microservices application demonstrating clean DDD boundaries, solid API design, and maintainable architecture.

## Architecture Overview

### Services
- **Product Service** (NestJS): CRUD operations for products with gRPC server
- **Order Service** (NestJS): Order management with product validation via gRPC
- **Admin Web** (Next.js): Minimal admin UI with shadcn/ui components
- **API Gateway** (Nginx): Single entrypoint with routing and CORS

### Communication Pattern
- **Edge**: REST APIs with OpenAPI documentation
- **Internal**: gRPC for Order→Product communication
- **Data**: SQLite per service with snapshot pattern for orders

### Key Features
- Domain-Driven Design with clean boundaries
- Contract-first API design (OpenAPI + Protobuf)
- Request ID propagation for observability
- Health endpoints for liveness/readiness
- Docker Compose for local development
- Kubernetes manifests for production deployment

## Quick Start

### Prerequisites
- Docker and Docker Compose
- Node.js 20+ (for local development)

### Local Development
```bash
# Start all services
docker-compose up -d

# Access the application
# Admin UI: http://localhost:8080
# Product API: http://localhost:8080/api/products
# Order API: http://localhost:8080/api/orders
# Product Docs: http://localhost:8080/docs/products
# Order Docs: http://localhost:8080/docs/orders
```

### Manual Testing
1. Create a product via Swagger UI or admin interface
2. Create an order referencing the product ID
3. Verify order shows product snapshot data
4. Restart services and confirm data persistence

## Project Structure

```
├── product-service/          # Product bounded context
│   ├── src/
│   │   ├── domain/          # Entities, value objects, domain services
│   │   ├── application/     # Use cases, DTOs, application services
│   │   └── infrastructure/  # Controllers, repositories, external services
├── order-service/           # Order bounded context
│   ├── src/
│   │   ├── domain/          # Entities, value objects, domain services
│   │   ├── application/     # Use cases, DTOs, application services
│   │   └── infrastructure/  # Controllers, repositories, gRPC client
├── admin-web/              # Next.js admin interface
│   ├── src/
│   │   ├── app/            # Pages and layouts
│   │   ├── components/     # shadcn/ui components
│   │   ├── domains/        # Feature-based organization
│   │   └── lib/            # Utilities and API client
├── contracts/              # API contracts and generated types
│   ├── openapi/           # OpenAPI specifications
│   ├── proto/             # Protobuf definitions
│   └── shared/            # Shared TypeScript types
├── infra/                 # Infrastructure as code
│   ├── k8s/              # Kubernetes manifests
│   └── Makefile          # Deployment automation
├── docker-compose.yml    # Local development stack
└── nginx.conf           # API Gateway configuration
```

## API Documentation

### Product Service
- **REST API**: Full CRUD operations at `/api/v1/products`
- **gRPC Server**: Internal service for product reads
- **Documentation**: Swagger UI at `/docs`

### Order Service
- **REST API**: Create, list, read operations at `/api/v1/orders`
- **gRPC Client**: Validates products during order creation
- **Documentation**: Swagger UI at `/docs`

### Error Handling
All services return consistent error envelopes:
```json
{
  "code": "VALIDATION_ERROR",
  "message": "Invalid product ID",
  "details": [
    {
      "field": "productId",
      "message": "Product not found"
    }
  ]
}
```

## Data Model

### Product Entity
```typescript
{
  id: string;           // UUID
  name: string;         // Max 120 chars
  description?: string; // Optional
  price: number;        // Non-negative decimal
  createdAt: Date;
  updatedAt: Date;
}
```

### Order Entity
```typescript
{
  id: string;           // UUID
  productId: string;    // References product
  quantity: number;     // Minimum 1
  status: OrderStatus;  // created, processing, etc.
  productName: string;  // Snapshot field
  productPrice: number; // Snapshot field
  createdAt: Date;
  updatedAt: Date;
}
```

## Development

### Environment Variables
Each service has its own environment configuration:
- `product-service/env.example`
- `order-service/env.example`
- `admin-web/env.example`

### Testing
```bash
# Unit tests
cd product-service && npm test
cd order-service && npm test

# E2E tests
cd product-service && npm run test:e2e
cd order-service && npm run test:e2e
```

### Code Quality
- ESLint configuration for consistent code style
- Prettier for code formatting
- TypeScript strict mode enabled

## Production Deployment

### Kubernetes
```bash
# Deploy to Kubernetes
cd infra && make up

# Access the application
kubectl -n microservices port-forward svc/api-gateway 8080:80
```

### Health Checks
All services expose health endpoints:
- Product Service: `GET /health`
- Order Service: `GET /health`
- Admin Web: `GET /` (serves Next.js app)

## Observability

### Logging
- Structured JSON logs with request ID correlation
- Service identification in log entries
- Error tracking with stack traces

### Metrics
- Request duration tracking
- Error rate monitoring
- Health check status

### Tracing
- Request ID propagation across services
- gRPC metadata for internal calls
- HTTP headers for external requests

## Security

### API Gateway
- CORS configuration for admin web
- Rate limiting (10 req/s with burst)
- Request logging and monitoring

### Service Communication
- gRPC for internal service calls
- Request validation and sanitization
- Error handling without information leakage

## Future Enhancements

### Planned Improvements
- JWT authentication at gateway level
- Database migrations with TypeORM
- Circuit breakers for gRPC calls
- OpenTelemetry integration
- Automated testing pipeline

### Scalability Considerations
- Replace SQLite with PostgreSQL
- Add Redis for caching
- Implement event sourcing
- Add message queues for async processing

## Troubleshooting

### Common Issues
1. **Port conflicts**: Ensure ports 3001, 3002, 3000, 8080 are available
2. **Database issues**: Check SQLite file permissions and paths
3. **gRPC connection**: Verify PRODUCT_GRPC_ADDR environment variable
4. **CORS errors**: Ensure admin web is accessed via gateway

### Debug Mode
```bash
# Enable debug logging
export NODE_ENV=development
docker-compose up
```

## Contributing

1. Follow DDD principles and maintain clean boundaries
2. Update contracts before implementing changes
3. Add tests for new functionality
4. Update documentation for API changes
5. Run linting and formatting before commits

## License

This project is licensed under the MIT License.
