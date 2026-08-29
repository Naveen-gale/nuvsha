# Props

Props allow you to pass data from a parent component down to a child component.

## Syntax

```html
<!-- Parent.nuv -->
<script>
  import { UserCard } from "./components/UserCard.nuv"
  
  username = "Alex"
  userAge = 25
</script>

<!-- Passing a static string and dynamic variables as props -->
<UserCard 
  role="Admin" 
  name={username} 
  age={userAge} 
/>
```

Inside the child component, you simply declare the variables in your script block to receive them. You can optionally provide default fallback values.

```html
<!-- components/UserCard.nuv -->
<script>
  // These variables automatically receive the props passed by the parent.
  // The values here act as fallbacks if the parent forgets to pass them.
  role = "Guest"
  name = "Unknown"
  age = 0
</script>

<div class="card">
  <h2>{name} ({role})</h2>
  <p>Age: {age}</p>
</div>
```

## What happens

When the parent's `username` variable changes, the child component receives the new prop and updates its UI reactively.
