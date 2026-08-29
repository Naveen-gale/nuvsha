# Recommended Structure

Here is a recap of how a production-ready Nuvsha application should look:

```text
src/
├── main.js             # Initializes the app
├── App.nuv             # The shell (Navbar, Sidebar, Router)
│
├── pages/              # Screens
│   ├── Home.nuv
│   └── Settings.nuv
│
├── components/         # Reusable UI
│   ├── Button.nuv
│   ├── Modal.nuv
│   └── UserCard.nuv
│
├── data/               # Logic and APIs
│   ├── api.js
│   └── formatters.js
│
├── router/             # URL definitions
│   └── routes.js
│
└── assets/             # Global CSS and images
    └── main.css
```

## Rule of Thumb

1. **UI file (`.nuv`)** → Displays the interface and handles user interaction.
2. **Logic file (`.js`)** → Fetches data, formats numbers, handles complex business rules.
