# Project Architecture & Conventions

Nuvsha's philosophy is "Make frontend development easier without making the language strange." As such, Nuvsha does **not** enforce a rigid folder structure at the compiler level. You are free to organize your files however you like.

However, to help teams collaborate, we recommend a set of simple, scalable folder conventions.

## Small Projects

The smallest possible Nuvsha project requires only two files inside your `src/` directory:

```text
my-app/
├── src/
│   ├── App.nuv    # Your root component
│   └── main.js    # Mounts App.nuv to the DOM
├── index.html
├── package.json
└── vite.config.js
```

In fact, this is exactly what `npx create-nuvsha` generates! We believe in keeping things as simple as possible until you actually need more structure.

## Medium Projects

As your application grows, you'll naturally want to split your code into multiple components and pages.

```text
src/
├── App.nuv
├── main.js
├── components/    # Reusable UI pieces
├── pages/         # High-level views used by the Router
└── data/          # Reusable API calls or mock data
```

## Large Projects

For large, enterprise-scale applications, we recommend the full Nuvsha convention:

```text
src/
├── App.nuv
├── main.js
├── components/    # Reusable UI (Button.nuv, Card.nuv)
├── pages/         # Routable views (Home.nuv, About.nuv)
├── layouts/       # Page wrappers (DashboardLayout.nuv)
├── hooks/         # Reusable reactive logic (useUser.js)
├── data/          # Data definitions or static arrays (products.js)
├── services/      # External integrations (api.js, auth.js)
├── utils/         # Small, pure helper functions (formatPrice.js)
└── assets/        # CSS, fonts, and images
```

## Folder Purposes

### `components/`
Reusable `.nuv` files that represent small parts of your UI, like `<Button />`, `<Navbar />`, or `<Modal />`. These shouldn't usually fetch their own data; instead, they accept `props`.

### `pages/`
Large `.nuv` components that represent an entire screen or route (e.g., `Home.nuv`, `Settings.nuv`). These are usually imported into your `routes.js` file and rendered by the `<Router />`.

### `layouts/`
Components designed to wrap around other content using `<slot />`. For example, a `DashboardLayout.nuv` might contain a sidebar and a top navigation bar, projecting the page content into the middle.

### `hooks/`
Reusable JavaScript logic. If you find yourself writing the same complex reactive logic in multiple components, extract it into a standard `.js` file here.

### `data/`
Files related to the shape of your data. This could be mock JSON data, static arrays, or API endpoint definitions.

### `services/`
Complex integrations with external systems, such as an authentication service (`auth.js`) or a configured API client (`api.js`).

### `utils/`
Small, pure JavaScript functions that format data, calculate values, or parse strings. For example, `formatDate.js`.

### `assets/`
Static files that need to be processed by Vite, such as global CSS files (`main.css`), fonts, or SVG icons.

### `public/` (Outside `src/`)
Static files that should be served directly by the web server without being processed by Vite. This includes `favicon.ico` or `robots.txt`.

## Important Compiler Rule

**Nuvsha does NOT enforce these folder names.** 

The Nuvsha compiler treats a `.nuv` file in `components/` exactly the same as a `.nuv` file in `pages/` or `features/` or `screens/`. 

All imports are resolved by Vite using standard ES module resolution. This means you can freely mix and match `.js` and `.nuv` imports anywhere in your application:

```html
<script>
  // Importing a component
  import Navbar from "../components/Navbar.nuv";
  
  // Importing standard JavaScript logic
  import { formatPrice } from "../utils/formatPrice.js";
  import { products } from "../data/products.js";
</script>

<div>
  <Navbar />
  {for product of products}
    <p>{formatPrice(product.price)}</p>
  {/for}
</div>
```

If your team prefers a feature-based architecture (e.g., `src/features/auth/`), Nuvsha will fully support it without any configuration changes!
