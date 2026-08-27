# Templates

## What It Is

A **template** is the HTML markup in your `.nuv` file that describes what should appear on the screen.

---

## Basic Example

```html
<div class="card">
  <h2>My Card Title</h2>
  <p>This is standard HTML markup inside a .nuv file.</p>
</div>
```

---

## Features

### 1. Multiple Root Elements
Unlike some frameworks that force you to wrap everything in a single `<div>`, Nuvsha natively supports multiple root elements in a component:

```html
<h1>Header</h1>
<p>Paragraph one</p>
<p>Paragraph two</p>
```

Under the hood, Nuvsha wraps multiple root nodes in a standard browser `DocumentFragment`.

### 2. Standard HTML Attributes
You can use all standard HTML attributes (`class`, `id`, `src`, `href`, `disabled`, `type`, etc.):

```html
<button class="btn" id="submit-btn" disabled>
  Cannot Click
</button>
```

### 3. Dynamic Attribute Values
You can set attribute values dynamically using `{expression}`:

```html
<img src={user.avatarUrl} alt={user.name} />
<button disabled={isLoading}>Submit</button>
```

### 4. HTML Comments
Standard HTML comments (`<!-- comment -->`) are recognized and ignored by the Nuvsha compiler:

```html
<!-- This comment will not break parsing -->
<p>Visible content</p>
```

### 5. Self-Closing and Void Tags
Nuvsha recognizes standard HTML void elements (such as `<input>`, `<img>`, `<br>`, `<hr>`) as self-closing automatically without requiring explicit closing tags.

---

## Limitations

- Dynamic inline class interpolation like `class="card {isActive ? 'active' : ''}"` is not yet supported. Use dynamic `{if}` blocks or expression attributes `class={isActive ? 'card active' : 'card'}` instead.
