import {ConnectionConfig} from "pg";
export const DATABASE_CONFIG :ConnectionConfig = {
    user: "postgres",
    database: "hoteldb",
    password: "admin",
    port: 5432,
    host: "127.0.0.1",
    keepAlive: true
  };
