# User Auth

## Process
1. Hash password with virtual (in User model)
1. Create auth token with jwt (in User model)
1. Signup route (in auth routes)
1. Authorize method (in User model)
1. Login route (in auth routes)
1. findByToken method (in User model)
1. ensureAuth middleware (cookie-parser) (in ensure-auth middleware)
1. Verify route (in auth routes)