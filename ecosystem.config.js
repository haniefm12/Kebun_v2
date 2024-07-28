module.exports = {
  apps: [
    {
      name: "backend",
      script: "backend/server.js",
      watch: ["backend"],
      ignore_watch: ["backend/node_modules", "backend/logs", "backend/uploads"],
      env: {
        PORT: 3000,
      },
    },
    {
      name: "frontend",
      script: "frontend/src/index.js",
      watch: ["frontend"],
      ignore_watch: ["frontend/node_modules"],
      env: {
        PORT: 80,
      },
    },
  ],
};
