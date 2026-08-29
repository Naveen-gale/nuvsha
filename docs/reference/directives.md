# Directives Reference

Unlike Vue or Angular, Nuvsha avoids attribute-based structural directives (like `v-if` or `*ngFor`). Instead, Nuvsha uses structural blocks.

**Do NOT write:**
```html
<!-- WRONG -->
<div if={show}>Hello</div>
<li for={item of items}>{item}</li>
```

**Write this instead:**
```html
<!-- CORRECT -->
{if show}
  <div>Hello</div>
{/if}

{for item of items}
  <li>{item}</li>
{/for}
```

The only framework-specific attribute directives are for data binding:
- `bind={variable}` (used on `<input>`, `<select>`, `<textarea>`)
