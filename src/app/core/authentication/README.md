# Authentication

1. Modify the token key at `token.service` to another name such as `TOKEN` or `your-app-token`. By default set to `ng-matero-token`.

2. Replace the APIs at `login.service` with your owns.

   - `/api/auth/token` Login
   - `/api/auth/refresh` Refresh
   - `/api/auth/logout` Logout
   - `/api/auth/myself` Get user information
   - `/api/auth/myself/menu` Get user menu

3. If you have modified the login url (defaults to `auth/login`), you should correct it in the following files.

   - `auth.guard.ts`
   - `error-interceptor.ts`
   - `token-interceptor.ts`