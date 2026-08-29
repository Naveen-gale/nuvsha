# Project Structure

## What It Is

When you generate a Nuvsha project using `create-nuvsha`, the files and directories are organized in a clean, standard structure.

---

## Directory Overview

Here is what a typical Nuvsha project looks like:

```
my-app/
├── index.html              # HTML entry point loaded by the browser
├── vite.config.js          # Vite build and plugin configuration
├── package.json            # Project dependencies and npm scripts
│
└── src/
    ├── main.js             # JavaScript entry point (mounts the root component)
    ├── App.nuv             # Root Nuvsha application component
    │
    ├── assets/             # Global styles and static files
    │   └── main.css        # Global CSS (including Tailwind)
    │
    ├── components/         # Reusable UI components
    │   └── Navbar.nuv      # Navigation bar component
    │
    ├── pages/              # Route page components
    │   ├── Home.nuv        # Home page
    │   ├── About.nuv       # About page
    │   └── NotFound.nuv    # 404 page for unmatched URLs
    │
    └── router/             # Routing configuration
        └── routes.js       # Array of route path mappings
```

---

## Explanation of Key Files

### 1. `index.html`
This is the root HTML file that the browser loads first. It contains a container `<div>` (typically `<div id="app"></div>`) and loads `src/main.js`:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My Nuvsha App</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

### 2. `src/main.js`
This file imports the Nuvsha `mount` function, your global stylesheet, and your root component (`App.nuv`), then mounts the application to `#app`:

```javascript
import { mount } from 'nuvsha';
import './assets/main.css';
import App from './App.nuv';

const container = document.getElementById('app');
mount(App, container);
```

### 3. `src/App.nuv`
The root component of your application. It usually arranges the layout (like a Navbar) and includes the `<Router>`:

```html
<script>
  import { Router } from "nuvsha";
  import { routes } from "./router/routes.js";
  import Navbar from "./components/Navbar.nuv";
</script>

<div class="min-h-screen bg-slate-950 text-white">
  <Navbar />
  <main class="p-8">
    <Router routes={routes} />
  </main>
</div>
```

### 4. `src/router/routes.js`
Defines which component should be displayed for each URL path:

```javascript
import Home from "../pages/Home.nuv";
import About from "../pages/About.nuv";
import NotFound from "../pages/NotFound.nuv";

export const routes = [
  { path: "/", component: Home },
  { path: "/about", component: About },
  { path: "*", component: NotFound }
];
```

---

## Best Practices

- **Components vs. Pages**: Store reusable UI pieces (buttons, cards, headers) in `src/components/`, and full page views in `src/pages/`.
- **Naming Convention**: Use PascalCase for `.nuv` component files (e.g., `Card.nuv`, `UserProfile.nuv`).
