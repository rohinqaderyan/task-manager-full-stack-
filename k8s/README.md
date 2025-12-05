# Kubernetes Deployment Guide for Task Manager

## Prerequisites

1. **Install Docker Desktop** (includes Kubernetes)
   - Download from: https://www.docker.com/products/docker-desktop
   - Enable Kubernetes in Docker Desktop settings

2. **Install kubectl** (if not included with Docker Desktop)
   ```powershell
   choco install kubernetes-cli
   ```

3. **Verify installations**
   ```powershell
   docker --version
   kubectl version --client
   ```

## Quick Start

### 1. Build Docker Images

```powershell
# Navigate to project root
cd "c:\Users\qadera01\full stack github project"

# Build backend image
cd backend
docker build -t task-manager-backend:latest .

# Build frontend image
cd ../frontend
docker build -t task-manager-frontend:latest .

# Go back to root
cd ..
```

### 2. Deploy to Kubernetes

```powershell
# Apply all Kubernetes configurations
kubectl apply -f k8s/secrets.yaml
kubectl apply -f k8s/configmap.yaml
kubectl apply -f k8s/mongodb-statefulset.yaml
kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/frontend-deployment.yaml
kubectl apply -f k8s/ingress.yaml
```

### 3. Check Deployment Status

```powershell
# View all pods
kubectl get pods

# View all services
kubectl get services

# View deployments
kubectl get deployments

# Check logs for backend
kubectl logs -l app=task-manager,tier=backend

# Check logs for frontend
kubectl logs -l app=task-manager,tier=frontend
```

### 4. Access the Application

```powershell
# Get the frontend service URL
kubectl get service frontend-service

# If using LoadBalancer (minikube)
minikube service frontend-service --url

# Or port-forward for local access
kubectl port-forward service/frontend-service 3000:80
```

Then open: http://localhost:3000

## Important Configuration

### Update Secrets (REQUIRED for production)

Edit `k8s/secrets.yaml` and change:
- `mongodb-uri`: Your MongoDB connection string
- `jwt-secret`: A strong random secret key

```powershell
# Apply updated secrets
kubectl apply -f k8s/secrets.yaml

# Restart pods to use new secrets
kubectl rollout restart deployment task-manager-backend
```

### Update Ingress Domain

Edit `k8s/ingress.yaml` and replace:
- `taskmanager.yourdomain.com` with your actual domain

## Useful Commands

### Scaling

```powershell
# Scale backend replicas
kubectl scale deployment task-manager-backend --replicas=3

# Scale frontend replicas
kubectl scale deployment task-manager-frontend --replicas=3
```

### Updates

```powershell
# Rebuild and update backend
cd backend
docker build -t task-manager-backend:latest .
kubectl rollout restart deployment task-manager-backend

# Rebuild and update frontend
cd frontend
docker build -t task-manager-frontend:latest .
kubectl rollout restart deployment task-manager-frontend
```

### Monitoring

```powershell
# Watch pods in real-time
kubectl get pods -w

# Get detailed pod info
kubectl describe pod <pod-name>

# View logs with follow
kubectl logs -f <pod-name>

# Execute commands in a pod
kubectl exec -it <pod-name> -- /bin/sh
```

### Troubleshooting

```powershell
# Check pod status and events
kubectl describe pod <pod-name>

# View recent events
kubectl get events --sort-by=.metadata.creationTimestamp

# Check resource usage
kubectl top pods
kubectl top nodes

# Restart a deployment
kubectl rollout restart deployment <deployment-name>

# Delete and recreate everything
kubectl delete -f k8s/
kubectl apply -f k8s/
```

### Cleanup

```powershell
# Delete all resources
kubectl delete -f k8s/

# Or delete by label
kubectl delete all -l app=task-manager

# Delete persistent volume claims
kubectl delete pvc -l app=mongodb
```

## Production Considerations

1. **Use a Secret Manager**: Don't commit secrets to git
2. **Set Resource Limits**: Already configured in deployments
3. **Enable Auto-scaling**: Use HorizontalPodAutoscaler
4. **Add Monitoring**: Integrate Prometheus/Grafana
5. **Setup CI/CD**: Use GitHub Actions to auto-deploy
6. **Use SSL/TLS**: Configure cert-manager for HTTPS
7. **Database Backups**: Setup MongoDB backup strategy
8. **Health Checks**: Already configured in deployments

## Docker Compose Alternative (for local development)

If you prefer Docker Compose over Kubernetes for local dev, see `docker-compose.yml` (to be created).

## Support

For issues, check:
- Pod logs: `kubectl logs <pod-name>`
- Events: `kubectl get events`
- Pod status: `kubectl describe pod <pod-name>`
