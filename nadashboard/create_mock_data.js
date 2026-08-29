import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataDir = path.join(__dirname, 'src', 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// 1. users.js
const usersContent = `
export const initialUsers = [
  { id: 1, name: 'Alice Smith', email: 'alice@example.com', role: 'Admin', status: 'Active', joined: '2023-01-15' },
  { id: 2, name: 'Bob Jones', email: 'bob@example.com', role: 'Editor', status: 'Active', joined: '2023-03-22' },
  { id: 3, name: 'Charlie Davis', email: 'charlie@example.com', role: 'Viewer', status: 'Inactive', joined: '2023-05-10' },
  { id: 4, name: 'Diana Evans', email: 'diana@example.com', role: 'Editor', status: 'Active', joined: '2023-08-01' },
];
`;
fs.writeFileSync(path.join(dataDir, 'users.js'), usersContent.trim() + '\\n');

// 2. projects.js
const projectsContent = `
export const initialProjects = [
  { id: 1, name: 'Nuvsha Website', status: 'Active', progress: 72, owner: 'Alice Smith', date: 'Oct 12, 2023' },
  { id: 2, name: 'NAdashboard', status: 'In Progress', progress: 48, owner: 'Bob Jones', date: 'Nov 05, 2023' },
  { id: 3, name: 'Mobile App', status: 'Completed', progress: 100, owner: 'Diana Evans', date: 'Dec 01, 2023' },
  { id: 4, name: 'Marketing Campaign', status: 'Active', progress: 25, owner: 'Charlie Davis', date: 'Jan 15, 2024' },
];
`;
fs.writeFileSync(path.join(dataDir, 'projects.js'), projectsContent.trim() + '\\n');

// 3. tasks.js
const tasksContent = `
export const initialTasks = [
  { id: 1, title: 'Design sidebar navigation', status: 'Completed' },
  { id: 2, title: 'Implement user modal', status: 'In Progress' },
  { id: 3, title: 'Fix routing bug on mobile', status: 'Todo' },
  { id: 4, title: 'Setup CI/CD pipeline', status: 'Todo' },
];
`;
fs.writeFileSync(path.join(dataDir, 'tasks.js'), tasksContent.trim() + '\\n');

// 4. dashboard.js
const dashboardContent = `
export const dashboardData = {
  stats: {
    totalUsers: '12,480',
    revenue: '$48,290',
    projects: '126',
    tasksCompleted: '1,284',
    trends: {
      totalUsers: '+12.5%',
      revenue: '+8.2%',
      projects: '+4.7%',
      tasksCompleted: '+15.3%'
    }
  },
  recentActivity: [
    { id: 1, message: 'Alex created a new project', time: '2 minutes ago' },
    { id: 2, message: 'Sarah completed a task', time: '12 minutes ago' },
    { id: 3, message: 'John joined the team', time: '1 hour ago' },
    { id: 4, message: 'Nuvsha project deployed', time: '3 hours ago' },
  ],
  notifications: [
    { id: 1, message: 'System update available', read: false },
    { id: 2, message: 'New message from Alice', read: false },
    { id: 3, message: 'Project deadline tomorrow', read: true },
  ]
};
`;
fs.writeFileSync(path.join(dataDir, 'dashboard.js'), dashboardContent.trim() + '\\n');

console.log('Mock data generated successfully.');
