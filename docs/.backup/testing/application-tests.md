# Application Tests

## What It Is

Application and runtime tests verify that Nuvsha components and the runtime work properly in a browser-like environment.

---

## Runtime & Router Testing

In `nuvsha/tests/router.test.js`, tests verify runtime behavior using standard DOM mocks:

- **Route Matching**: Verifies that root (`/`) and subpaths (`/about`) render their respective component fragments.
- **404 Fallback**: Verifies that unmatched paths render wildcard (`*`) fallback components.
- **`popstate` Navigation**: Verifies that browser Back and Forward events update the active page without full-page reloads.
- **Link Interception**: Verifies that clicks on local links call `preventDefault()` and `pushState()`, while external links are left untouched.
- **Programmatic Navigation**: Verifies that calling `navigate('/path')` updates the route and triggers re-rendering.
