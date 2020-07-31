module.exports = [
  {
    name: 'default',
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '123456',
    database: 'typeorm_mysql',
    logging: false,
    entities: [
      'src/entity/**/*.entity.{ts,js}',
      'src/modules/**/*.entity.{ts,js}',
      'dist/**/*.entity{ .ts,.js}'
    ],
    migrations: [
      'src/migration/*.ts'
    ],
    subscribers: [
      'src/subscriber/**/*.ts'
    ],
    cli: {
      'entitiesDir': 'src/entity',
      'migrationsDir': 'src/migration',
      'subscribersDir': 'src/subscriber'
    }
  }
]
