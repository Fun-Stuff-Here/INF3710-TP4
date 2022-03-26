import { injectable } from "inversify";
import * as pg from "pg";
import "reflect-metadata";
import { DATABASE_CONFIG } from "../constants/database-config";

@injectable()
export class DatabaseService {

  public connectionConfig = DATABASE_CONFIG;
  public pool: pg.Pool = new pg.Pool(this.connectionConfig);

 
}
