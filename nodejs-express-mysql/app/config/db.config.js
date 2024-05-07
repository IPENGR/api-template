module.exports = {
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "default_user",
    password: process.env.DB_PASSWORD || "default_password",
    database: process.env.DB_NAME || "default_database"
  };
