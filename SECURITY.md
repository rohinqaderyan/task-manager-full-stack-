# Security Policy

## Supported Versions

Currently supported versions with security updates:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability, please follow these steps:

1. **DO NOT** open a public issue
2. Email the details to the repository owner
3. Include:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

We take security seriously and will respond within 48 hours.

## Security Best Practices

When using this application:

### Backend
- Always use environment variables for sensitive data
- Change the default JWT_SECRET in production
- Use HTTPS in production
- Keep dependencies updated
- Enable rate limiting for production
- Use MongoDB authentication in production

### Frontend
- Never store sensitive data in localStorage
- Always validate user input
- Use HTTPS in production
- Keep dependencies updated

### Database
- Use strong passwords
- Enable authentication
- Use IP whitelisting when possible
- Regular backups
- Update MongoDB regularly

## Known Security Considerations

- JWT tokens are stored in localStorage (consider httpOnly cookies for production)
- Passwords are hashed with bcrypt (10 salt rounds)
- CORS is enabled for all origins in development (restrict in production)
- No rate limiting by default (implement for production)

## Updates

We regularly update dependencies to patch security vulnerabilities. Run:

```bash
npm audit
npm audit fix
```

To check and fix known vulnerabilities.
