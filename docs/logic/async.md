# Async Blocks

Modern apps fetch a lot of remote data. Normally, managing pending, success, and error states requires a lot of boilerplate. Nuvsha's `{async}` block handles promises directly in the template.

## Syntax

```html
<script>
  fetchProfile = async () => {
    const res = await fetch('/api/profile')
    if (!res.ok) throw new Error("Not found")
    return res.json()
  }
</script>

<div>
  {async profile = fetchProfile()}
    <!-- This renders when the promise resolves successfully -->
    <h1>Welcome {profile.name}</h1>
    
  {loading}
    <!-- This renders while the promise is pending -->
    <p>Loading profile...</p>
    
  {error}
    <!-- This renders if the promise throws an error -->
    <p>Failed to load profile.</p>
    
  {/async}
</div>
```

## What happens

1. When the component loads, the `fetchProfile()` function is called.
2. The `{loading}` block is immediately rendered.
3. If the promise resolves, the `{loading}` block is removed, the result is assigned to the `profile` variable, and the success block renders.
4. If the promise rejects, the `{error}` block renders.
