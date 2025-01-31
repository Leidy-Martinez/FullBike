// Used to configure the database connection
require('dotenv').config();

module.exports = {
    development: {
        url: process.env.DB_URI,
        // username: process.env.DB_USER,
        // database: process.env.DB_NAME,
        // host: process.env.DB_HOST,
        // port: process.env.DB_PORT || 5432,
        dialect: 'postgres'
    },
    test: {
        url: process.env.DB_URI,
        // username: process.env.DB_USER,
        // database: process.env.DB_NAME,
        // host: process.env.DB_HOST,
        // port: process.env.DB_PORT || 5432,
        dialect: 'postgres'
    },
    production: {
        url: process.env.DB_URI,
        // username: process.env.DB_USER,
        // database: process.env.DB_NAME,
        // host: process.env.DB_HOST,
        // port: process.env.DB_PORT || 5432,
        dialect: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    }
}
