# Project Structure

When you create a project with `create-nuvsha`, you get a scalable folder structure out of the box. 

Here is what the files and folders do:

```text
my-app/
├── package.json         # Lists your project dependencies and scripts
├── index.html           # The main HTML file where your app is injected
├── vite.config.js       # Configuration for the Vite bundler and Tailwind
└── src/
    ├── main.js          # The entry point that mounts your App.nuv to the DOM
    ├── App.nuv          # The root component of your application
    │
    ├── components/      # (Folder) Put reusable UI elements here (e.g., Button.nuv)
    ├── pages/           # (Folder) Put route-level screens here (e.g., Home.nuv)
    ├── data/            # (Folder) Put standard .js files for APIs and logic here
    ├── router/          # (Folder) Put your route definitions here
    └── assets/          # (Folder) Put images, global CSS, or fonts here
```

For small apps, you can write everything in `App.nuv`. As your application grows, you'll split your code into reusable components in the `components/` folder and separate screens in the `pages/` folder.
