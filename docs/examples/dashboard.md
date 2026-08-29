# Dashboard Example

Demonstrates how to compose a larger page out of smaller components and routes.

**src/pages/Dashboard.nuv**
```html
<script>
  import { Sidebar } from "../components/Sidebar.nuv"
  import { StatCard } from "../components/StatCard.nuv"
</script>

<div class="flex h-screen bg-slate-100">
  <Sidebar />
  
  <main class="flex-1 p-8">
    <h1 class="text-3xl font-bold mb-8">Dashboard</h1>
    
    <div class="grid grid-cols-3 gap-6">
      <StatCard title="Total Users" value="1,245" trend="+12%" />
      <StatCard title="Revenue" value="$45,200" trend="+8%" />
      <StatCard title="Active Sessions" value="43" trend="-2%" />
    </div>
  </main>
</div>
```

**src/components/StatCard.nuv**
```html
<script>
  title = "Metric"
  value = "0"
  trend = "0%"
</script>

<div class="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
  <h3 class="text-slate-500 text-sm font-medium">{title}</h3>
  <p class="text-3xl font-bold mt-2">{value}</p>
  <p class="text-sm text-green-500 mt-2">{trend} from last month</p>
</div>
```
