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