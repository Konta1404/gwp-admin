# GWP admin prototype

Next.js/React/TypeScript dashboard based on TailAdmin. Charts and tables contain sample data; they are not analytics from real users. The implemented workflow is sign-in against `gwp-api` and viewing the authenticated profile.

## Local setup

Run the accompanying API on port 4000 with a disposable development database. Set `API_URL=http://localhost:4000/api` in `.env.local`, then run `npm ci` and `npm run dev`. Open `/login`; the API needs an account created through its registration endpoint.

Login is handled by a Server Action. The token is stored in a HttpOnly, same-site cookie and sent to the API from the server-side profile page. The API validates the token and account on each profile request. This replaces the template login flow that expected a different token response format.

## Verification

Run `npm run lint`, `npm run typecheck`, and `npm run build`. These checks validate the frontend structure; they are not an end-to-end test against PostgreSQL. CI runs the same checks.

## Scope and attribution

TailAdmin-derived layouts/charts remain as template demonstrations. The dashboard is public sample UI; it must not contain private data. Only the profile route is authenticated. Event administration, authorization for future resource mutations, real data tables, and full browser tests remain work to do. The older localStorage helpers are retained for compatibility but are unused by the repaired login flow; do not use them as authorization enforcement.
