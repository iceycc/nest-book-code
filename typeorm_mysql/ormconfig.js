module.exports = [
  {
    name: 'default',
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '123456',
    database: 'typeorm_mysql',
    synchronize: false,
    logging: false,
    dropSchema: false, // 每次连接都会删除数据库,注意别使用
    entities: [
      'src/entity/**/*.{ts,js}'
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
