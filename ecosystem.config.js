require('dotenv').config();

module.exports = {
  apps: [
    {
      name: 'expanse',
      script: './bin/www.js',
      instances: -3,
      exec_mode: 'cluster',
    },
  ],
};
