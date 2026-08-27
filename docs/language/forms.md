# Form Binding

## What It Is

**Two-way data binding** automatically synchronizes the value of an HTML form input with a JavaScript state variable.

When the user types in an input, the variable is updated. When the variable changes in code, the input is updated.

---

## Syntax

In Nuvsha, use the `bind={variable}` attribute on form controls:

```html
<script>
  username = ""
</script>

<input type="text" bind={username} placeholder="Enter your username" />
<p>Hello, {username}!</p>
```

---

## Supported Form Elements

### 1. Text Inputs & Textareas
Synchronizes with a string variable:

```html
<script>
  email = ""
  bio = ""
</script>

<input type="email" bind={email} />
<textarea bind={bio}></textarea>
```

### 2. Checkboxes
Synchronizes with a boolean (`true`/`false`) variable:

```html
<script>
  agreeTerms = false
</script>

<label>
  <input type="checkbox" bind={agreeTerms} />
  I agree to the terms
</label>

<p>Agreed: {agreeTerms ? "Yes" : "No"}</p>
```

### 3. Select Dropdowns
Synchronizes with the selected option value:

```html
<script>
  favoriteColor = "blue"
</script>

<select bind={favoriteColor}>
  <option value="red">Red</option>
  <option value="blue">Blue</option>
  <option value="green">Green</option>
</select>

<p>Chosen color: {favoriteColor}</p>
```

---

## How It Works

Under the hood, the compiler creates:
1. Event listeners (`input` and `change`) on the DOM element that update the variable and trigger `$update()`.
2. A `$watch` expression that updates the DOM input's `.value` or `.checked` property whenever the variable changes programmatically.
