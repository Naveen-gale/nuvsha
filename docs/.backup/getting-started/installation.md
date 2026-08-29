# Installation

## What It Is

This guide walks you through setting up your computer to build applications with Nuvsha.

---

## Prerequisites

Before using Nuvsha, make sure you have **Node.js** installed on your computer.

- **Node.js**: Version 18 or higher is recommended.
- **npm** (Node Package Manager): Comes bundled automatically with Node.js.

You can check if Node.js is installed by opening your terminal and typing:

```bash
node -v
npm -v
```

If you see version numbers (e.g. `v20.x.x`), you are ready to proceed. If not, download and install Node.js from [nodejs.org](https://nodejs.org).

---

## How to Install

You do not need to install Nuvsha globally. The easiest and recommended way to start a new project is using our official project generator:

```bash
npx create-nuvsha my-app
```

> **What is `npx`?**  
> `npx` is a tool that comes with npm. It lets you run a package directly without permanently installing it on your system.

---

## Manual Installation in an Existing Project

If you already have a Vite project and want to add Nuvsha manually:

### 1. Install packages

```bash
npm install nuvsha
npm install -D vite
```

### 2. Configure Vite

Create or update your `vite.config.js` file:

```javascript
import { defineConfig } from 'vite';
import nuvshaPlugin from 'nuvsha/vite-plugin';

export default defineConfig({
  plugins: [
    nuvshaPlugin()
  ]
});
```

---

## Important Notes

- Nuvsha is fully integrated with **Vite**, an extremely fast build tool for modern web development.
- All `.nuv` files are automatically compiled to standard JavaScript during development and production builds.
