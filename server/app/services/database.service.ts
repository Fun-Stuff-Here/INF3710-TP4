import { injectable } from "inversify";
import * as pg from "pg";
import "reflect-metadata";
import { DATABASE_CONFIG, SEARCH_PATH } from "../constants/database-config";
import {Plant} from '../../../common/tables/Plant';
import {Jardin} from '../../../common/tables/Jardin';

@injectable()
export class DatabaseService {
  pool: pg.Pool = new pg.Pool(DATABASE_CONFIG);

  async getPlantsByName(name: string):Promise<Plant[][]> {
    return this.makeSelect<Plant>(`SELECT * FROM Plante WHERE NomLatin like '%${name}%';`);
  }

  async getJardins(): Promise<Jardin[][]> {
	  return this.makeSelect<Jardin>("SELECT * FROM Jardin;");
  }

  async getVarietes(): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
	  let queryText = "SELECT * FROM Variete;";
	  const res = await client.query(queryText);
	  client.release()
	  return res;
  }

  async deleteVariete(id: number): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
	  let queryText = `DELETE FROM Variete WHERE VarieteId='${id}';`;
	  const res = await client.query(queryText);
	  client.release()
	  return res;
  }
  
  async query(query: string): Promise<void | pg.QueryArrayResult> {
    const idQuery: pg.QueryArrayConfig = {
      text: `${SEARCH_PATH}${query}`,
      rowMode: "array",
    };
    return Promise.resolve(this.pool.query(idQuery)).catch(err => console.log(err));
  }

  async makeSelect<T>(query: string): Promise<T[][]> {
    const result = await this.query(query);
    return result[1].rows;
  }
}
