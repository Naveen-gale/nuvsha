# API Page Example

Demonstrates using the `data()` primitive to fetch external information on page load.

```html
<script>
  fetchPosts = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5")
    return res.json()
  }

  // Executes immediately when the component mounts
  postsStore = data(fetchPosts)
</script>

<div class="p-8">
  <h1 class="text-2xl font-bold mb-4">Latest Posts</h1>
  
  {if postsStore.loading}
    <div class="animate-pulse flex flex-col gap-4">
      <div class="h-10 bg-slate-200 rounded w-full"></div>
      <div class="h-10 bg-slate-200 rounded w-full"></div>
    </div>
    
  {else if postsStore.error}
    <p class="text-red-500">Failed to load posts.</p>
    <button onclick="postsStore.reload()">Try Again</button>
    
  {else if postsStore.data}
    <div class="flex flex-col gap-4">
      {for post of postsStore.data}
        <div class="border p-4 rounded shadow-sm">
          <h2 class="font-bold">{post.title}</h2>
          <p class="text-slate-600 mt-2">{post.body}</p>
        </div>
      {/for}
    </div>
  {/if}
</div>
```
