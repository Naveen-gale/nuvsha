# Creating a Project

## What It Is

`create-nuvsha` is the official command-line tool used to quickly scaffold (generate) a new Nuvsha project with all necessary configurations already set up.

---

## Why It Exists

Starting a new project from scratch often involves creating configuration files, setting up build tools like Vite, configuring Tailwind CSS, and structuring folders. 

`create-nuvsha` does all this for you in one step so you can focus immediately on writing code.

---

## Basic Example

Open your terminal and run:

```bash
npx create-nuvsha my-first-app
```

Then follow the on-screen instructions:

```bash
cd my-first-app
npm install
npm run dev
```

Your browser will open a local development server (typically at `http://localhost:5173`) showing your running Nuvsha application!

---

## What the Scaffolded Project Includes

When you generate a project with `create-nuvsha`, you get:

1. **Vite Development Server**: Instant hot module reloading (updates your app immediately when you save a file) and automatically opens the browser.
2. **Nuvsha Vite Plugin**: Compiles `.nuv` files on the fly.
3. **Tailwind CSS v4**: Pre-configured utility-first styling.
4. **Starter UI**: A polished `App.nuv` demonstrating Nuvsha syntax (expressions, state, and events).
5. **Nuvsha Branding**: Default favicon (`nuvsha.svg`) and branding.

---

## Available Scripts

Inside your project folder, you can run:

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the local development server with fast live reloading. |
| `npm run build` | Builds your application for production in the `dist/` directory. |
| `npm run preview` | Previews your production build locally. |

---

## Next Steps

Check out the [Project Structure](./project-structure.md) guide to understand what each file inside your new project does.
