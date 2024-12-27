# Authentication

1. Modify the token key at `token.service` to another name such as `TOKEN` or `your-app-token`. By default set to `ng-matero-token`.

2. Replace the APIs at `login.service` with your owns.

   - `/api/v1/auth/token` Login
   - `/api/v1/auth/refresh` Refresh
   - `/api/v1/auth/logout` Logout
   - `/api/v1/user/me` Get user information
   - `/api/v1/user/menu` Get user menu

3. If you have modified the login url (defaults to `auth/login`), you should correct it in the following files.

   - `auth.guard.ts`
   - `error-interceptor.ts`
   - `token-interceptor.ts`
