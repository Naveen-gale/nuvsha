# Creating Components

## What It Is

Creating a component in Nuvsha simply means creating a `.nuv` file in your project.

---

## Step 1: Create the Component File

Create a file named `src/components/Card.nuv`:

```html
<!-- src/components/Card.nuv -->
<div class="border border-slate-800 bg-slate-900 rounded-xl p-6 shadow-md">
  <h3 class="text-xl font-bold text-white mb-2">{title}</h3>
  <p class="text-slate-400">{description}</p>
</div>
```

---

## Step 2: Import and Use the Component

In any parent component (such as `src/App.nuv` or a page):

```html
<!-- src/App.nuv -->
<script>
  import Card from "./components/Card.nuv"
</script>

<div class="p-8 space-y-4">
  <Card 
    title="Speed" 
    description="Nuvsha compiles directly to lightweight DOM operations." 
  />
  <Card 
    title="Simplicity" 
    description="No complex hooks or virtual DOM overhead." 
  />
</div>
```

---

## Slots (`<slot />`)

If you want a component to accept arbitrary child elements, use the `<slot />` tag:

```html
<!-- src/components/Modal.nuv -->
<div class="modal-overlay">
  <div class="modal-box">
    <!-- Child content passed from parent renders here -->
    <slot />
  </div>
</div>
```

Usage in parent:

```html
<script>
  import Modal from "./components/Modal.nuv"
</script>

<Modal>
  <h2>Custom Title</h2>
  <p>This paragraph is projected into the slot inside Modal!</p>
</Modal>
```
