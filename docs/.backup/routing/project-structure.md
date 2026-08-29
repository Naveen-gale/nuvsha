# Routing Project Structure

## What It Is

How to organize pages, routes, and components in a multi-page Nuvsha project.

---

## Recommended Structure

```
src/
├── main.js
├── App.nuv
│
├── components/           # Reusable UI widgets
│   ├── Navbar.nuv        # Top navigation with <a href="..."> links
│   └── Footer.nuv
│
├── pages/                # Page components (one per route)
│   ├── Home.nuv          # Rendered for "/"
│   ├── About.nuv         # Rendered for "/about"
│   ├── Contact.nuv       # Rendered for "/contact"
│   └── NotFound.nuv      # Rendered for "*" (404)
│
└── router/
    └── routes.js         # Exported routes array
```

---

## Step-by-Step Walkthrough

1. **Create Page Components in `src/pages/`**:
   Write each page as a normal `.nuv` component.
2. **Register the Pages in `src/router/routes.js`**:
   Import each page and add `{ path, component }` to the `routes` array.
3. **Mount the `<Router>` in `src/App.nuv`**:
   Import `routes` and `<Router>` in `App.nuv` and place `<Router routes={routes} />` where the page content should render.
4. **Add Navigation Links in `src/components/Navbar.nuv`**:
   Use standard `<a href="...">` tags to link between pages.
