import { injectable } from "inversify";
import * as pg from "pg";
import "reflect-metadata";
import { DATABASE_CONFIG, SEARCH_PATH } from "../constants/database-config";
import {Plant} from '../../../common/tables/Plant';
import {Jardin} from '../../../common/tables/Jardin';
import {Parcelle} from '../../../common/tables/Parcelle';
import {Rang} from '../../../common/tables/Rang';

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

  async getJardins():Promise<Jardin[]> {
    const result = await this.query(`SELECT * FROM Jardin;`);
    return result[1].rows.map((jardin:Jardin) => ({
		jardinid: jardin.jardinid,
		nom: jardin.nom,
		surfacejardin: jardin.surfacejardin,
		potagerflag: jardin.potagerflag,
		typeSol: jardin.typeSol,
		vergerflag: jardin.vergerflag,
		hauteurmaximal: jardin.hauteurmaximal,
		ornementflag: jardin.ornementflag,
    }));
  }

  async getParcelles(jardinID: string):Promise<Parcelle[]> {
    const result = await this.query(`SELECT * FROM Parcelle WHERE JardinId like '%${jardinID}%';`);
    return result[1].rows.map((parcelle:Parcelle) => ({
          jardinid:parcelle.jardinid,
          xparcelle:parcelle.xparcelle,
          yparcelle:parcelle.yparcelle,
          largeur:parcelle.largeur,
          longeur:parcelle.longeur,
    }));
  }

  // pas fini ici!
  async getRangs(jardinID:string, xparcelle:number, yparcelle:number):Promise<Rang[]> {
    const result = await this.query(``);
    /* return result[1].rows.map((rang:Rang) => ({
          jardinid:rang.jardinid,
          xparcelle:rang.xparcelle,
          yparcelle:rang.yparcelle,
		  numerorang: rang.numerorang,
          xrang: rang.xrang,
		  yrang: rang.yrang
    })); */
	return result[1];
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
