# Deployment Guide

## Quick Start Options

### Option 1: Docker Compose (Recommended for Local Development)

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

**Access:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- MongoDB: localhost:27017

### Option 2: Kubernetes (Production)

```bash
# Apply all manifests
kubectl apply -f k8s/

# Check deployment status
kubectl get pods
kubectl get services

# View logs
kubectl logs -f deployment/backend
kubectl logs -f deployment/frontend
```

See `k8s/README.md` for detailed Kubernetes setup.

### Option 3: Local Development

**Backend:**
```bash
cd backend
npm install
npm run dev
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

## Environment Configuration

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/taskmanager
JWT_SECRET=your-super-secret-jwt-key-change-in-production
NODE_ENV=development
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000
```

## Building Docker Images

### Backend
```bash
cd backend
docker build -t task-manager-backend:latest .
docker run -p 5000:5000 task-manager-backend:latest
```

### Frontend
```bash
cd frontend
docker build -t task-manager-frontend:latest .
docker run -p 80:80 task-manager-frontend:latest
```

## Troubleshooting

### Docker Issues

**Issue: "Permission denied" errors**
```bash
# Linux/Mac: Add your user to docker group
sudo usermod -aG docker $USER
newgrp docker
```

**Issue: Port already in use**
```bash
# Find process using port
netstat -ano | findstr :5000   # Windows
lsof -i :5000                  # Mac/Linux

# Kill process or change port in docker-compose.yml
```

**Issue: Container keeps restarting**
```bash
# Check logs
docker logs <container-id>

# Check health
docker inspect <container-id> | grep Health
```

### Kubernetes Issues

**Issue: Pods stuck in "Pending"**
```bash
# Check events
kubectl describe pod <pod-name>

# Check resources
kubectl top nodes
```

**Issue: Can't connect to service**
```bash
# Check service endpoints
kubectl get endpoints

# Port forward for testing
kubectl port-forward service/backend-service 5000:5000
```

**Issue: MongoDB connection fails**
```bash
# Check MongoDB pod
kubectl logs -f statefulset/mongodb

# Verify service
kubectl get svc mongodb-service

# Test connection
kubectl exec -it <backend-pod> -- curl mongodb-service:27017
```

### Application Issues

**Issue: CORS errors in browser**
- Check `VITE_API_URL` in frontend .env
- Verify backend CORS configuration allows frontend origin

**Issue: 401 Unauthorized errors**
- Clear browser localStorage
- Check JWT token expiration
- Verify JWT_SECRET matches between instances

**Issue: MongoDB connection timeout**
- Verify MongoDB is running: `docker ps` or `kubectl get pods`
- Check MONGODB_URI environment variable
- Verify network connectivity

### GitHub Actions Issues

**Issue: Workflows not running**
- Check `.github/workflows/` files are committed
- Verify GITHUB_TOKEN has required permissions
- Check branch protection rules

**Issue: Push failures in automated commits**
- Workflows have retry logic (3 attempts)
- Check repository permissions
- Verify no branch protection blocking bots

## Performance Optimization

### Docker Build Speed
```bash
# Use buildkit for faster builds
DOCKER_BUILDKIT=1 docker build -t app:latest .

# Multi-platform builds
docker buildx build --platform linux/amd64,linux/arm64 -t app:latest .
```

### Kubernetes Resource Limits
```yaml
# In deployment.yaml
resources:
  requests:
    memory: "128Mi"
    cpu: "100m"
  limits:
    memory: "256Mi"
    cpu: "200m"
```

## Security Checklist

- [ ] Change default JWT_SECRET
- [ ] Enable MongoDB authentication
- [ ] Use HTTPS/TLS in production
- [ ] Set up firewall rules
- [ ] Enable rate limiting
- [ ] Configure security headers (helmet)
- [ ] Scan images for vulnerabilities
- [ ] Use secrets management (K8s secrets, AWS Secrets Manager)
- [ ] Enable audit logging
- [ ] Set up monitoring and alerts

## Monitoring

### Docker Compose
```bash
# Container stats
docker stats

# Container health
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
```

### Kubernetes
```bash
# Install metrics-server
kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml

# View metrics
kubectl top pods
kubectl top nodes
```

## Backup and Recovery

### MongoDB Backup
```bash
# Docker Compose
docker-compose exec mongodb mongodump --out /backup

# Kubernetes
kubectl exec mongodb-0 -- mongodump --out /backup
```

### Restore
```bash
# Docker Compose
docker-compose exec mongodb mongorestore /backup

# Kubernetes
kubectl exec mongodb-0 -- mongorestore /backup
```

## Scaling

### Docker Compose
```bash
# Scale backend service
docker-compose up -d --scale backend=3
```

### Kubernetes
```bash
# Manual scaling
kubectl scale deployment backend --replicas=5

# Auto-scaling
kubectl autoscale deployment backend --min=2 --max=10 --cpu-percent=80
```

## CI/CD Pipeline

The project includes GitHub Actions workflows:

1. **ci.yml** - Runs on pull requests
   - Tests backend and frontend
   - Lint checks
   - Build validation

2. **daily-commit.yml** - Automated maintenance
   - Runs daily at 10:00 AM UTC
   - Creates maintenance logs

3. **random-commits.yml** - Activity generation
   - Runs 3x daily (8am, 2pm, 8pm UTC)
   - Generates project activity

## Support

For issues, please check:
1. This deployment guide
2. `SECURITY.md` for security-related questions
3. `k8s/README.md` for Kubernetes-specific help
4. GitHub Issues in the repository

## License

MIT License - See LICENSE file for details
