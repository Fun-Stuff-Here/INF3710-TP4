import {ConnectionConfig} from "pg";
export const DATABASE_CONFIG :ConnectionConfig = {
    user: "postgres",
    database: "TP4",
    password: "inf3710",
    port: 5432,
    host: "127.0.0.1",
    keepAlive: true
  };
