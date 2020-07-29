module.exports = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '123456',
  database: 'typeorm_mysql',
  synchronize: true,
  logging: true,
  dropSchema: true,
  entities: [
    'src/entity/**/*.ts'
  ]
}
