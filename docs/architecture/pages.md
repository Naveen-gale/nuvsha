# Pages

The `pages/` directory is intended for route-level components (screens).

When a user visits a specific URL, a single page component is usually rendered by the router.

## Example

```html
<!-- src/pages/Dashboard.nuv -->
<script>
  import { Header } from "../components/Header.nuv"
  import { StatCard } from "../components/StatCard.nuv"
</script>

<div class="dashboard-layout">
  <Header />
  
  <main class="grid grid-cols-3">
    <StatCard title="Users" value="1,200" />
    <StatCard title="Sales" value="$4,500" />
  </main>
</div>
```

Pages should focus on layout and composing smaller components. They usually don't contain heavily detailed HTML logic for individual buttons or inputs.
