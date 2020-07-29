module.exports = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '123456',
  database: 'typeorm_mysql',
  synchronize: false,
  logging: true,
  dropSchema: false,
  entities: [
    'src/entity/**/*.ts'
  ]
}
