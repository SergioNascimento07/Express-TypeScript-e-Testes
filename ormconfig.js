module.exports = {
    type: "sqlite",
    database: "./src/database/sqlite",
    migrations: [
        "./src/database/migrations"
    ],
    cli: {
        migrationsDir: "./src/database/migrations"
    }
}