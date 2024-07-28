module.exports = {
  apps: [
    {
      name: "backend",
      script: "npm run build",
      cwd: "./backend",
      watch: true,
      ignore_watch: ["backend/node_modules", "backend/logs", "backend/uploads"],
    },
    {
      name: "frontend",
      exec: "npm run build && serve -s build",
      cwd: "./frontend",
      watch: true,
      ignore_watch: ["frontend/node_modules"],
    },
  ],
};
