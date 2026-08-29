import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compsDir = path.join(__dirname, 'src', 'components');

if (!fs.existsSync(compsDir)) {
  fs.mkdirSync(compsDir, { recursive: true });
}

const write = (name, content) => {
  fs.writeFileSync(path.join(compsDir, name), content.trim() + '\\n');
};

write('Button.nuv', `
<script>
  type = "button"
  disabled = false
  variant = "primary"
  
  getVariantClass = () => {
    if (variant === 'primary') return "bg-sky-600 hover:bg-sky-500 text-white"
    if (variant === 'danger') return "bg-red-600 hover:bg-red-500 text-white"
    if (variant === 'ghost') return "bg-transparent hover:bg-slate-800 text-slate-300 hover:text-white"
    return "bg-slate-800 hover:bg-slate-700 text-white"
  }
</script>

<button 
  type={type} 
  disabled={disabled}
  class={"px-4 py-2 rounded-md font-medium text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed " + getVariantClass()}
>
  {children}
</button>
`);

write('Badge.nuv', `
<script>
  status = "default"
  
  getStyle = () => {
    if (status === 'Active' || status === 'Completed') return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
    if (status === 'In Progress') return "bg-amber-500/10 text-amber-400 border-amber-500/20"
    if (status === 'Inactive' || status === 'Todo') return "bg-slate-500/10 text-slate-400 border-slate-500/20"
    return "bg-sky-500/10 text-sky-400 border-sky-500/20"
  }
</script>

<span class={"inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border " + getStyle()}>
  {children}
</span>
`);

write('Modal.nuv', `
<script>
  isOpen = false
  title = "Modal Title"
</script>

{if isOpen}
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
    <div class="bg-slate-900 border border-slate-800 rounded-xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col">
      <div class="flex items-center justify-between p-4 border-b border-slate-800">
        <h3 class="text-lg font-semibold text-white">{title}</h3>
        <button onclick="$event('close')" class="text-slate-400 hover:text-white transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
      </div>
      <div class="p-4 flex-1 overflow-y-auto">
        {children}
      </div>
    </div>
  </div>
{/if}
`);

write('StatCard.nuv', `
<script>
  title = "Metric"
  value = "0"
  trend = "0%"
  
  isPositive = () => trend.startsWith('+')
</script>

<div class="bg-slate-900/50 border border-slate-800/60 p-6 rounded-xl shadow-sm hover:border-slate-700 transition-colors">
  <div class="flex justify-between items-start">
    <p class="text-slate-400 text-sm font-medium">{title}</p>
    <div class={"px-2 py-1 rounded text-xs font-medium " + (isPositive() ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400")}>
      {trend}
    </div>
  </div>
  <p class="text-3xl font-bold text-white mt-4">{value}</p>
</div>
`);

write('ActivityItem.nuv', `
<script>
  message = ""
  time = ""
</script>

<div class="flex gap-4 p-4 border-b border-slate-800/50 last:border-0 hover:bg-slate-800/20 transition-colors">
  <div class="mt-1 h-2 w-2 rounded-full bg-sky-500 ring-4 ring-sky-500/20 flex-shrink-0"></div>
  <div>
    <p class="text-sm text-slate-200">{message}</p>
    <p class="text-xs text-slate-500 mt-1">{time}</p>
  </div>
</div>
`);

write('EmptyState.nuv', `
<script>
  message = "No data found."
  icon = "inbox" // Add more icons if needed
</script>

<div class="flex flex-col items-center justify-center p-12 text-center border border-dashed border-slate-800 rounded-xl bg-slate-900/20">
  <div class="w-12 h-12 rounded-full bg-slate-800/50 flex items-center justify-center mb-4 text-slate-400">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>
  </div>
  <h3 class="text-lg font-medium text-slate-300">{message}</h3>
  <div class="mt-4">{children}</div>
</div>
`);

write('Search.nuv', `
<script>
  placeholder = "Search..."
</script>

<div class="relative w-full">
  <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-500">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
  </div>
  <input 
    type="text" 
    placeholder={placeholder}
    oninput="$event('input', event.target.value)"
    class="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
  />
</div>
`);

write('Navbar.nuv', `
<script>
  import { Search } from "./Search.nuv"
  import { dashboardData } from "../data/dashboard.js"
  
  notifications = dashboardData.notifications
  showNotifications = false
  
  unreadCount = () => notifications.filter(n => !n.read).length
  
  markAsRead = (id) => {
    const n = notifications.find(n => n.id === id)
    if (n) n.read = true
  }
</script>

<header class="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 h-16 flex items-center justify-between px-6">
  <div class="flex items-center gap-4">
    <div class="text-xl font-bold tracking-tight text-white flex items-center gap-2">
      <div class="w-8 h-8 rounded-md bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center text-white">NA</div>
      <span class="hidden md:inline-block">NAdashboard</span>
    </div>
  </div>
  
  <div class="flex-1 max-w-md mx-6 hidden md:block">
    <Search placeholder="Search dashboard..." oninput="console.log('Search:', event.detail)" />
  </div>
  
  <div class="flex items-center gap-4 relative">
    <button onclick="showNotifications = !showNotifications" class="relative p-2 text-slate-400 hover:text-white transition-colors rounded-full hover:bg-slate-800">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
      {if unreadCount() > 0}
        <span class="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-slate-950"></span>
      {/if}
    </button>
    
    <div class="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 overflow-hidden cursor-pointer">
      <img src="https://ui-avatars.com/api/?name=Admin+User&background=0D8ABC&color=fff" alt="User" class="w-full h-full object-cover" />
    </div>
    
    {if showNotifications}
      <div class="absolute top-full right-0 mt-2 w-80 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl overflow-hidden flex flex-col z-50">
        <div class="p-3 border-b border-slate-800 flex justify-between items-center">
          <h4 class="font-medium text-sm text-white">Notifications</h4>
          <span class="text-xs text-slate-500">{unreadCount()} unread</span>
        </div>
        <div class="max-h-80 overflow-y-auto">
          {for n of notifications}
            <div class={"p-3 border-b border-slate-800/50 last:border-0 hover:bg-slate-800/30 transition-colors " + (n.read ? "opacity-50" : "")}>
              <p class="text-sm text-slate-200">{n.message}</p>
              {if !n.read}
                <button onclick="markAsRead(n.id)" class="text-xs text-sky-400 mt-1 hover:text-sky-300">Mark as read</button>
              {/if}
            </div>
          {/for}
        </div>
      </div>
    {/if}
  </div>
</header>
`);

write('Sidebar.nuv', `
<script>
  import { navigate } from "nuvsha"
  
  // A simple hack to get current path since router might not expose it directly
  currentPath = window.location.pathname
  
  navItems = [
    { name: 'Dashboard', path: '/', icon: '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>' },
    { name: 'Analytics', path: '/analytics', icon: '<path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/>' },
    { name: 'Users', path: '/users', icon: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>' },
    { name: 'Projects', path: '/projects', icon: '<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>' },
    { name: 'Tasks', path: '/tasks', icon: '<path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/>' },
    { name: 'Settings', path: '/settings', icon: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>' },
  ]
</script>

<aside class="w-64 border-r border-slate-800 bg-slate-950 flex-shrink-0 hidden md:block">
  <div class="py-6 px-4">
    <p class="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-2">Main Menu</p>
    <nav class="space-y-1">
      {for item of navItems}
        <a 
          href={item.path} 
          class={"flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors " + (currentPath === item.path ? "bg-sky-500/10 text-sky-400" : "text-slate-400 hover:text-white hover:bg-slate-900")}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <g innerHTML={item.icon}></g>
          </svg>
          {item.name}
        </a>
      {/for}
    </nav>
  </div>
</aside>
`);

console.log('Components created successfully.');
