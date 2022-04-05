import { injectable } from "inversify";
import * as pg from "pg";
import "reflect-metadata";
import { DATABASE_CONFIG, SEARCH_PATH } from "../constants/database-config";
import {Plant} from '../../../common/tables/Plant';
import {Jardin} from '../../../common/tables/Jardin';

@injectable()
export class DatabaseService {
  pool: pg.Pool = new pg.Pool(DATABASE_CONFIG);

  async getPlantsByName(name: string):Promise<Plant[]> {
    const result = await this.query(`SELECT * FROM Plante WHERE NomLatin like '%${name}%';`);
    return result[1].rows.map((plante:Plant) => ({
          nameLatin:plante.nomlatin,
          category:plante.categorie,
          type:plante.type,
          subType:plante.soustype,
          varietyId:plante.varieteid,
    }));
  }

  async getJardins(): Promise<Jardin[]> {
    const result = await this.query("SELECT * FROM Jardin;");
    return result[1].rows.map((jardin:Jardin) => ({
        id:jardin.id,
        area:jardin.area,
        maxHeight:jardin.maxHeight,
        name:jardin.name,
        ornement:jardin.ornement,
        potager:jardin.potager,
        typeSol:jardin.typeSol,
        verger:jardin.verger
    }));
	  
  }



  async getVarietes(): Promise<pg.QueryResult> {
    return this.query("SELECT * FROM Variete;");
  }

  async deleteVariete(id: number): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
	  let queryText = `DELETE FROM Variete WHERE VarieteId='${id}';`;
	  const res = await client.query(queryText);
	  client.release()
	  return res;
  }
  
  async query(query: string): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    const queryText = `${SEARCH_PATH}${query}`;
    const res = await client.query(queryText);
    client.release();
    return res;
  }

}
