import { ConnectionOptions, DataSource } from "typeorm";

const config: ConnectionOptions = {
    type: "postgres",
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      synchronize: false,
      logging: false,
      entities: [`${__dirname}/db/entity/*.entity.{ts,js}`],
      migrations: [`${__dirname}/db/migrations/*.{ts,js}`],
  };
  
  const PostgresDataSource = new DataSource({
    ...config,
  });
  
  PostgresDataSource.initialize()
    .then(() => {
      console.log('Data Source has been initialized!');
    })
    .catch((err) => {
      console.error('Error during Data Source initialization', err);
    });
  

  export default config;
  