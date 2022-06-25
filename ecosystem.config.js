module.exports = {
  apps: [
    {
      script: "./public/server.app.js",
      instances: 2,
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],

  deploy: {
    production: {
      user: "root",
      host: "150.158.46.8",
      ref: "origin/master",
      repo: "git@github.com:mbaxszy7/music-motion-x.git",
      path: "/root/music-motion-x/production",
      "post-deploy":
        "git pull && sudo npm install && npm run build && pm2 reload ecosystem.config.js --env production",
    },
  },
}
