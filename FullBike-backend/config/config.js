// // Used to configure the database connection
// require('dotenv').config();

// module.exports = {
//     development: {
//         url: process.env.DB_URI,
//         // username: process.env.DB_USER,
//         // database: process.env.DB_NAME,
//         // host: process.env.DB_HOST,
//         // port: process.env.DB_PORT || 5432,
//         dialect: 'postgres'
//     },
//     test: {
//         url: process.env.DB_URI,
//         // username: process.env.DB_USER,
//         // database: process.env.DB_NAME,
//         // host: process.env.DB_HOST,
//         // port: process.env.DB_PORT || 5432,
//         dialect: 'postgres'
//     },
//     production: {
//         url: process.env.DATABASE_URL,
//         // username: process.env.DB_USER,
//         // database: process.env.DB_NAME,
//         // host: process.env.DB_HOST,
//         // port: process.env.DB_PORT || 5432,
//         dialect: 'postgres',
//         dialectOptions: {
//             ssl: {
//                 require: true,
//                 rejectUnauthorized: false
//             }
//         }
//     }
// }

require('dotenv').config();

module.exports = {
    development: {
        use_env_variable: 'DB_URI',
        dialect: 'postgres'
    },
    test: {
        use_env_variable: 'DB_URI',
        dialect: 'postgres'
    },
    production: {
        use_env_variable: 'DATABASE_URL',
        dialect: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false // Prevents SSL connection issues
            }
        }
    }
};
