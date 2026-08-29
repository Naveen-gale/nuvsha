import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pagesDir = path.join(__dirname, 'src', 'pages');

if (!fs.existsSync(pagesDir)) {
  fs.mkdirSync(pagesDir, { recursive: true });
}

const write = (name, content) => {
  fs.writeFileSync(path.join(pagesDir, name), content.trim() + '\\n');
};

write('Dashboard.nuv', `
<script>
  import { dashboardData } from "../data/dashboard.js"
  import { StatCard } from "../components/StatCard.nuv"
  import { ActivityItem } from "../components/ActivityItem.nuv"
  
  // Simulate an async load to demonstrate {async} loading state
  loadDashboard = async () => {
    await new Promise(r => setTimeout(r, 800))
    return dashboardData
  }
</script>

<div class="space-y-6">
  <header>
    <h1 class="text-2xl font-bold text-white tracking-tight">Good evening, Admin</h1>
    <p class="text-slate-400 mt-1">Here is your NAdashboard overview.</p>
  </header>
  
  {async data = loadDashboard()}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard title="Total Users" value={data.stats.totalUsers} trend={data.stats.trends.totalUsers} />
      <StatCard title="Revenue" value={data.stats.revenue} trend={data.stats.trends.revenue} />
      <StatCard title="Projects" value={data.stats.projects} trend={data.stats.trends.projects} />
      <StatCard title="Tasks Completed" value={data.stats.tasksCompleted} trend={data.stats.trends.tasksCompleted} />
    </div>
    
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
      <div class="lg:col-span-2 bg-slate-900/50 border border-slate-800/60 rounded-xl p-6 h-80 flex flex-col">
        <h3 class="text-lg font-medium text-white mb-4">Revenue Analytics</h3>
        <div class="flex-1 flex items-end justify-between gap-2 opacity-80 pt-8 border-b border-l border-slate-800 pb-2 pl-2">
          <div class="w-full bg-sky-500/80 rounded-t" style="height: 40%;"></div>
          <div class="w-full bg-sky-500/80 rounded-t" style="height: 60%;"></div>
          <div class="w-full bg-sky-500/80 rounded-t" style="height: 35%;"></div>
          <div class="w-full bg-sky-500/80 rounded-t" style="height: 80%;"></div>
          <div class="w-full bg-sky-500/80 rounded-t" style="height: 90%;"></div>
          <div class="w-full bg-sky-500/80 rounded-t" style="height: 70%;"></div>
          <div class="w-full bg-sky-500/80 rounded-t" style="height: 100%;"></div>
        </div>
        <div class="flex justify-between text-xs text-slate-500 mt-2">
          <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
        </div>
      </div>
      
      <div class="bg-slate-900/50 border border-slate-800/60 rounded-xl flex flex-col">
        <div class="p-6 border-b border-slate-800/60">
          <h3 class="text-lg font-medium text-white">Recent Activity</h3>
        </div>
        <div class="flex-1 overflow-y-auto">
          {for activity of data.recentActivity}
            <ActivityItem message={activity.message} time={activity.time} />
          {/for}
        </div>
      </div>
    </div>
    
  {loading}
    <div class="flex justify-center items-center h-64">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-500"></div>
    </div>
    
  {error}
    <div class="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl">
      Failed to load dashboard data. Please try again.
    </div>
  {/async}
</div>
`);

write('Analytics.nuv', `
<script>
  import { dashboardData } from "../data/dashboard.js"
</script>

<div class="space-y-6">
  <header>
    <h1 class="text-2xl font-bold text-white tracking-tight">Analytics</h1>
    <p class="text-slate-400 mt-1">Detailed performance metrics.</p>
  </header>
  
  <div class="bg-slate-900/50 border border-slate-800/60 rounded-xl p-8 text-center min-h-[400px] flex flex-col items-center justify-center">
    <div class="w-48 h-48 rounded-full border-8 border-slate-800 border-t-sky-500 border-r-indigo-500 animate-[spin_10s_linear_infinite] mb-8"></div>
    <h3 class="text-xl font-bold text-white mb-2">Growth is accelerating</h3>
    <p class="text-slate-400 max-w-md mx-auto">
      User growth is up {dashboardData.stats.trends.totalUsers} this month. 
      Conversion rates are holding steady at 4.2%.
    </p>
  </div>
</div>
`);

write('Users.nuv', `
<script>
  import { initialUsers } from "../data/users.js"
  import { Button } from "../components/Button.nuv"
  import { Badge } from "../components/Badge.nuv"
  import { Modal } from "../components/Modal.nuv"
  import { EmptyState } from "../components/EmptyState.nuv"
  
  users = initialUsers
  searchQuery = ""
  showModal = false
  
  // Form state
  newUser = { name: "", email: "", role: "Viewer" }
  
  getFilteredUsers = () => {
    if (!searchQuery) return users
    const q = searchQuery.toLowerCase()
    return users.filter(u => 
      u.name.toLowerCase().includes(q) || 
      u.email.toLowerCase().includes(q) ||
      u.role.toLowerCase().includes(q)
    )
  }
  
  handleAddUser = () => {
    if (!newUser.name || !newUser.email) return
    
    users.push({
      id: Date.now(),
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      status: "Active",
      joined: new Date().toISOString().split('T')[0]
    })
    
    // Reset and close
    newUser.name = ""
    newUser.email = ""
    newUser.role = "Viewer"
    showModal = false
  }
</script>

<div class="space-y-6">
  <header class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
    <div>
      <h1 class="text-2xl font-bold text-white tracking-tight">Users</h1>
      <p class="text-slate-400 mt-1">Manage team members and roles.</p>
    </div>
    <button onclick="showModal = true" class="bg-sky-600 hover:bg-sky-500 text-white px-4 py-2 rounded-md font-medium text-sm transition-colors">
      + Add User
    </button>
  </header>
  
  <div class="bg-slate-900/50 border border-slate-800/60 rounded-xl overflow-hidden">
    <div class="p-4 border-b border-slate-800/60 flex gap-4">
      <input 
        type="text" 
        bind={searchQuery}
        placeholder="Filter users..." 
        class="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-sky-500"
      />
    </div>
    
    <div class="overflow-x-auto">
      <table class="w-full text-left text-sm text-slate-400">
        <thead class="text-xs uppercase bg-slate-950 text-slate-500">
          <tr>
            <th class="px-6 py-3 font-medium">Name</th>
            <th class="px-6 py-3 font-medium">Role</th>
            <th class="px-6 py-3 font-medium">Status</th>
            <th class="px-6 py-3 font-medium">Joined</th>
            <th class="px-6 py-3 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {for u of getFilteredUsers()}
            <tr class="border-b border-slate-800/50 hover:bg-slate-800/20 transition-colors">
              <td class="px-6 py-4">
                <div class="font-medium text-white">{u.name}</div>
                <div class="text-xs">{u.email}</div>
              </td>
              <td class="px-6 py-4">{u.role}</td>
              <td class="px-6 py-4">
                <Badge status={u.status}>{u.status}</Badge>
              </td>
              <td class="px-6 py-4">{u.joined}</td>
              <td class="px-6 py-4 text-right">
                <button class="text-sky-400 hover:text-sky-300 font-medium">Edit</button>
              </td>
            </tr>
          {/for}
        </tbody>
      </table>
      
      {if getFilteredUsers().length === 0}
        <EmptyState message="No users found matching your search." />
      {/if}
    </div>
  </div>
</div>

<Modal isOpen={showModal} title="Add New User" onclose="showModal = false">
  <div class="space-y-4">
    <div>
      <label class="block text-sm font-medium text-slate-400 mb-1">Name</label>
      <input type="text" bind={newUser.name} class="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-sky-500" />
    </div>
    <div>
      <label class="block text-sm font-medium text-slate-400 mb-1">Email</label>
      <input type="email" bind={newUser.email} class="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-sky-500" />
    </div>
    <div>
      <label class="block text-sm font-medium text-slate-400 mb-1">Role</label>
      <select bind={newUser.role} class="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-sky-500">
        <option value="Admin">Admin</option>
        <option value="Editor">Editor</option>
        <option value="Viewer">Viewer</option>
      </select>
    </div>
    <div class="pt-4 flex justify-end gap-3">
      <button onclick="showModal = false" class="px-4 py-2 rounded-md font-medium text-sm transition-colors bg-transparent hover:bg-slate-800 text-slate-300">Cancel</button>
      <button onclick="handleAddUser()" class="px-4 py-2 rounded-md font-medium text-sm transition-colors bg-sky-600 hover:bg-sky-500 text-white">Save User</button>
    </div>
  </div>
</Modal>
`);

write('Projects.nuv', `
<script>
  import { initialProjects } from "../data/projects.js"
  import { Badge } from "../components/Badge.nuv"
</script>

<div class="space-y-6">
  <header>
    <h1 class="text-2xl font-bold text-white tracking-tight">Projects</h1>
    <p class="text-slate-400 mt-1">Track ongoing development.</p>
  </header>
  
  <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
    {for p of initialProjects}
      <div class="bg-slate-900/50 border border-slate-800/60 rounded-xl p-5 hover:border-slate-700 transition-colors">
        <div class="flex justify-between items-start mb-4">
          <h3 class="font-bold text-white text-lg">{p.name}</h3>
          <Badge status={p.status}>{p.status}</Badge>
        </div>
        
        <p class="text-sm text-slate-400 mb-6">Owned by {p.owner} • Created {p.date}</p>
        
        <div class="space-y-2">
          <div class="flex justify-between text-sm">
            <span class="text-slate-300">Progress</span>
            <span class="text-white font-medium">{p.progress}%</span>
          </div>
          <div class="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
            <div class={"h-2 rounded-full " + (p.progress === 100 ? "bg-emerald-500" : "bg-sky-500")} style={"width: " + p.progress + "%"}></div>
          </div>
        </div>
      </div>
    {/for}
  </div>
</div>
`);

write('Tasks.nuv', `
<script>
  import { initialTasks } from "../data/tasks.js"
  import { EmptyState } from "../components/EmptyState.nuv"
  
  tasks = initialTasks
  newTaskTitle = ""
  
  addTask = () => {
    if (!newTaskTitle.trim()) return
    tasks.push({
      id: Date.now(),
      title: newTaskTitle.trim(),
      status: "Todo"
    })
    newTaskTitle = ""
  }
  
  removeTask = (id) => {
    const idx = tasks.findIndex(t => t.id === id)
    if (idx !== -1) tasks.splice(idx, 1)
  }
  
  toggleTask = (id) => {
    const task = tasks.find(t => t.id === id)
    if (task) {
      task.status = task.status === "Completed" ? "Todo" : "Completed"
    }
  }
</script>

<div class="space-y-6">
  <header>
    <h1 class="text-2xl font-bold text-white tracking-tight">Tasks</h1>
    <p class="text-slate-400 mt-1">Manage your personal todo list.</p>
  </header>
  
  <div class="max-w-3xl">
    <div class="flex gap-3 mb-6">
      <input 
        type="text" 
        bind={newTaskTitle} 
        placeholder="What needs to be done?" 
        class="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-sky-500"
      />
      <button onclick="addTask()" class="bg-sky-600 hover:bg-sky-500 text-white px-6 py-2 rounded-lg font-medium transition-colors">
        Add
      </button>
    </div>
    
    <div class="bg-slate-900/50 border border-slate-800/60 rounded-xl overflow-hidden">
      {for task of tasks}
        <div class="flex items-center justify-between p-4 border-b border-slate-800/50 last:border-0 hover:bg-slate-800/20 transition-colors">
          <div class="flex items-center gap-4">
            <button onclick="toggleTask(task.id)" class={"w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors " + (task.status === "Completed" ? "bg-emerald-500 border-emerald-500" : "border-slate-600 hover:border-sky-500")}>
              {if task.status === "Completed"}
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="text-white"><polyline points="20 6 9 17 4 12"/></svg>
              {/if}
            </button>
            <span class={"text-sm font-medium transition-colors " + (task.status === "Completed" ? "text-slate-500 line-through" : "text-slate-200")}>
              {task.title}
            </span>
          </div>
          <button onclick="removeTask(task.id)" class="text-slate-500 hover:text-red-400 p-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
          </button>
        </div>
      {/for}
      
      {if tasks.length === 0}
        <EmptyState message="All caught up! No tasks left." />
      {/if}
    </div>
  </div>
</div>
`);

write('Settings.nuv', `
<script>
  import { Button } from "../components/Button.nuv"
  
  settings = {
    name: "Admin User",
    email: "admin@example.com",
    theme: "dark",
    notifications: true,
    weeklyReport: false
  }
  
  saveStatus = ""
  
  saveSettings = () => {
    saveStatus = "Saving..."
    setTimeout(() => {
      saveStatus = "Settings saved successfully!"
      setTimeout(() => { saveStatus = "" }, 3000)
    }, 800)
  }
</script>

<div class="space-y-6 max-w-4xl">
  <header>
    <h1 class="text-2xl font-bold text-white tracking-tight">Settings</h1>
    <p class="text-slate-400 mt-1">Manage your account preferences.</p>
  </header>
  
  <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
    <div class="md:col-span-1">
      <h3 class="text-lg font-medium text-white">Profile</h3>
      <p class="text-sm text-slate-400 mt-1">Update your personal information.</p>
    </div>
    <div class="md:col-span-2 bg-slate-900/50 border border-slate-800/60 rounded-xl p-6 space-y-4">
      <div>
        <label class="block text-sm font-medium text-slate-400 mb-1">Display Name</label>
        <input type="text" bind={settings.name} class="w-full max-w-md bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-sky-500" />
      </div>
      <div>
        <label class="block text-sm font-medium text-slate-400 mb-1">Email Address</label>
        <input type="email" bind={settings.email} class="w-full max-w-md bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-sky-500" />
      </div>
    </div>
  </div>
  
  <hr class="border-slate-800/80" />
  
  <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
    <div class="md:col-span-1">
      <h3 class="text-lg font-medium text-white">Preferences</h3>
      <p class="text-sm text-slate-400 mt-1">Customize your experience.</p>
    </div>
    <div class="md:col-span-2 bg-slate-900/50 border border-slate-800/60 rounded-xl p-6 space-y-6">
      <div>
        <label class="block text-sm font-medium text-slate-400 mb-2">Theme</label>
        <select bind={settings.theme} class="w-full max-w-md bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-sky-500">
          <option value="light">Light</option>
          <option value="dark">Dark (Default)</option>
          <option value="system">System</option>
        </select>
      </div>
      
      <div class="space-y-3">
        <h4 class="text-sm font-medium text-slate-400">Notifications</h4>
        
        <label class="flex items-center gap-3 cursor-pointer">
          <input type="checkbox" bind={settings.notifications} class="w-4 h-4 rounded bg-slate-950 border-slate-800 text-sky-500 focus:ring-sky-500/20" />
          <span class="text-slate-300 text-sm">Receive push notifications</span>
        </label>
        
        <label class="flex items-center gap-3 cursor-pointer">
          <input type="checkbox" bind={settings.weeklyReport} class="w-4 h-4 rounded bg-slate-950 border-slate-800 text-sky-500 focus:ring-sky-500/20" />
          <span class="text-slate-300 text-sm">Weekly email reports</span>
        </label>
      </div>
    </div>
  </div>
  
  <div class="flex items-center justify-end gap-4 pt-4">
    {if saveStatus}
      <span class="text-sm text-emerald-400 font-medium">{saveStatus}</span>
    {/if}
    <button onclick="saveSettings()" class="bg-sky-600 hover:bg-sky-500 text-white px-6 py-2.5 rounded-lg font-medium transition-colors shadow-lg shadow-sky-900/20">
      Save Changes
    </button>
  </div>
</div>
`);

write('NotFound.nuv', `
<script>
  import { navigate } from "nuvsha"
</script>

<div class="flex flex-col items-center justify-center min-h-[60vh] text-center">
  <h1 class="text-9xl font-bold text-slate-800">404</h1>
  <h2 class="text-2xl font-semibold text-white mt-4">Page not found</h2>
  <p class="text-slate-400 mt-2 max-w-md mb-8">
    Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
  </p>
  <button onclick="navigate('/')" class="bg-sky-600 hover:bg-sky-500 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-lg shadow-sky-900/20">
    Back to Dashboard
  </button>
</div>
`);

console.log('Pages created successfully.');
