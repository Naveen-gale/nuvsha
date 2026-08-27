# Component Props

## What It Is

**Props** (short for *properties*) are custom attributes you pass to a component to configure it or provide data.

---

## Passing Props

You pass props to a component just like HTML attributes:

```html
<script>
  import UserBadge from "./components/UserBadge.nuv"

  currentRole = "Administrator"
</script>

<div>
  <!-- Static string prop -->
  <UserBadge name="Alice" role="Admin" />

  <!-- Dynamic expression prop -->
  <UserBadge name="Bob" role={currentRole} />

  <!-- Boolean prop -->
  <UserBadge name="Charlie" isOnline />
</div>
```

---

## Receiving Props

In the child component, any variable used in the template that is not declared locally in the `<script>` block is automatically available as a prop:

```html
<!-- src/components/UserBadge.nuv -->
<div class="flex items-center space-x-2">
  <span class="font-medium text-white">{name}</span>
  <span class="text-xs px-2 py-0.5 bg-blue-900 text-blue-300 rounded">
    {role}
  </span>
</div>
```

You can use props directly in `{expressions}`, conditional blocks `{if role === 'Admin'}`, or pass them further down to other components.

---

## Reactive Props

When a parent component passes a dynamic prop (like `role={currentRole}`), any updates in the parent automatically update the child component in the DOM.
