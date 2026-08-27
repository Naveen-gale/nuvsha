# Component Structure

## What It Is

Best practices for structuring components in real-world Nuvsha applications.

---

## Recommended Folder Layout

```
src/
├── components/           # Reusable UI widgets
│   ├── Button.nuv
│   ├── Card.nuv
│   ├── Modal.nuv
│   └── Navbar.nuv
│
├── pages/                # Route views / full pages
│   ├── Home.nuv
│   ├── About.nuv
│   ├── Dashboard.nuv
│   └── NotFound.nuv
│
├── layouts/              # Optional page shell layouts
│   └── MainLayout.nuv
│
└── router/
    └── routes.js
```

---

## Best Practice Rules

1. **PascalCase Naming**: Always name `.nuv` component files with PascalCase (e.g. `UserProfile.nuv`, not `userProfile.nuv`).
2. **Single Responsibility**: Keep components focused on one specific job.
3. **Separate Pages from Components**: Place full route views in `pages/` and reusable widgets in `components/`.
4. **Clean Scripts**: Keep `<script>` blocks concise, extracting heavy utility functions into `.js` helper files when appropriate.
