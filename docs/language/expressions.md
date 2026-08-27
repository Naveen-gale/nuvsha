# Expressions

## What It Is

An **expression** is dynamic JavaScript written inside curly braces `{...}` within your template.

Expressions allow you to display variable values, calculate numbers, concatenate strings, or access object properties directly in your HTML.

---

## Basic Example

```html
<script>
  firstName = "Ada"
  lastName = "Lovelace"
  score = 42
</script>

<div>
  <!-- Display variable -->
  <p>Score: {score}</p>

  <!-- Math calculation -->
  <p>Double score: {score * 2}</p>

  <!-- String concatenation -->
  <p>Full Name: {firstName + " " + lastName}</p>
</div>
```

---

## Supported Expression Types

Nuvsha supports any valid JavaScript expression inside `{...}`:

### 1. Variables and Literals
```html
<span>{count}</span>
<span>{"Hello " + user}</span>
```

### 2. Math and Logic
```html
<p>Total: {price * quantity}</p>
<p>Discounted: {isSale ? price * 0.8 : price}</p>
```

### 3. Object & Array Access
```html
<p>City: {user.address.city}</p>
<p>First item: {items[0]}</p>
```

### 4. Expressions in Attributes
```html
<a href={"/profile/" + user.id}>View Profile</a>
<input value={score} />
```

---

## How It Works

1. During compilation, `{score}` is converted into a DOM `TextNode`.
2. The runtime registers a watcher (`$watch`) for that expression.
3. When state changes, only expressions that produce a different value update their corresponding DOM nodes.
