import { injectable } from "inversify";
import * as pg from "pg";
import "reflect-metadata";
import { DATABASE_CONFIG, SEARCH_PATH } from "../constants/database-config";
import {Plant} from '../../../common/tables/Plant';
import {Jardin} from '../../../common/tables/Jardin';
import {Parcelle} from '../../../common/tables/Parcelle';
import {VueRang} from '../../../common/tables/VueRang';
import { Variete } from '../../../common/tables/Variete';
import * as fs from 'fs';

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
          longueur:parcelle.longueur,
    }));
  }

  async getRangsAndVarietes(jardinID:string, xparcelle:Number, yparcelle:Number):Promise<VueRang[]> {
	 const result = await this.query(`SELECT * FROM VueRang LEFT OUTER JOIN (
		SELECT JardinId, XParcelle, YParcelle, NumeroRang, VarieteId 
		FROM PlanteRang GROUP BY JardinId, XParcelle, YParcelle, NumeroRang, VarieteId)
		as ab USING(JardinId, XParcelle, YParcelle, NumeroRang)
		WHERE VueRang.JardinId like '%${jardinID}%' AND VueRang.XParcelle=${xparcelle} AND VueRang.YParcelle=${yparcelle};`
		);
     return result[1].rows.map((rang:VueRang) => ({
          jardinid:rang.jardinid,
          xparcelle:rang.xparcelle,
          yparcelle:rang.yparcelle,
		  numerorang: rang.numerorang,
          xrang: rang.xrang,
		  yrang: rang.yrang,
		  debutjachere: rang.debutjachere,
		  varieteid: rang.varieteid,
		  nomVariete: null
    })); 
  }


  async getVarietes(): Promise<Variete[]> {
    const result = await this.query(`SELECT * FROM Variete;`);
    return result[1].rows.map((variete: Variete) => ({
      varieteid: variete.varieteid,
      nomvariete: variete.nomvariete,
      anneemiseenmarche: variete.anneemiseenmarche,
      descriptionplantation: variete.descriptionplantation,
      descriptionentretien: variete.descriptionentretien,
      descriptionsemis: variete.descriptionsemis,
      descriptionrecolte: variete.descriptionrecolte,
      periodemiseplace: variete.periodemiseplace,
      perioderecolte: variete.perioderecolte,
      commentaire: variete.commentaire,
      solsbiensadaptes: variete.solsbiensadaptes,
    }));
  }

  async deleteVariete(id: number): Promise<Variete[]> {
	  const result = await this.query(`DELETE FROM Variete WHERE VarieteId=${id};`);
    return result[1].rows.map((variete: Variete) => ({
      varieteid: variete.varieteid,
      nomvariete: variete.nomvariete,
      anneemiseenmarche: variete.anneemiseenmarche,
      descriptionplantation: variete.descriptionplantation,
      descriptionentretien: variete.descriptionentretien,
      descriptionsemis: variete.descriptionsemis,
      descriptionrecolte: variete.descriptionrecolte,
      periodemiseplace: variete.periodemiseplace,
      perioderecolte: variete.perioderecolte,
      commentaire: variete.commentaire,
      solsbiensadaptes: variete.solsbiensadaptes,
    }));
  }

  async getVariete(id: number): Promise<Variete> {
	  const result = await this.query(`SELECT * FROM Variete WHERE VarieteId=${id};`);
    return result[1].rows.map((variete: Variete) => ({
      varieteid: variete.varieteid,
      nomvariete: variete.nomvariete,
      anneemiseenmarche: variete.anneemiseenmarche,
      descriptionplantation: variete.descriptionplantation,
      descriptionentretien: variete.descriptionentretien,
      descriptionsemis: variete.descriptionsemis,
      descriptionrecolte: variete.descriptionrecolte,
      periodemiseplace: variete.periodemiseplace,
      perioderecolte: variete.perioderecolte,
      commentaire: variete.commentaire,
      solsbiensadaptes: variete.solsbiensadaptes,
    }))[0];
  }

  async updateVariete(id: number, newVariete: Variete): Promise<Variete> {
	  const result = await this.query(`UPDATE Variete SET 
      NomVariete = '${newVariete.nomvariete}',
      AnneeMiseEnMarche = ${newVariete.anneemiseenmarche},
      DescriptionPlantation = '${newVariete.descriptionplantation}',
      DescriptionEntretien = '${newVariete.descriptionentretien}',
      DescriptionSemis = '${newVariete.descriptionsemis}',
      DescriptionRecolte = '${newVariete.descriptionrecolte}',
      PeriodeMisePlace = '${newVariete.periodemiseplace}',
      PeriodeRecolte = '${newVariete.perioderecolte}',
      Commentaire = '${newVariete.commentaire}',
      SolsBiensAdaptes = '${newVariete.solsbiensadaptes}'
      WHERE VarieteId=${id};`);
    return result[1].rows.map((variete: Variete) => ({
      varieteid: variete.varieteid,
      nomvariete: variete.nomvariete,
      anneemiseenmarche: variete.anneemiseenmarche,
      descriptionplantation: variete.descriptionplantation,
      descriptionentretien: variete.descriptionentretien,
      descriptionsemis: variete.descriptionsemis,
      descriptionrecolte: variete.descriptionrecolte,
      periodemiseplace: variete.periodemiseplace,
      perioderecolte: variete.perioderecolte,
      commentaire: variete.commentaire,
      solsbiensadaptes: variete.solsbiensadaptes,
    }))[0];
  }
  
  async query(query: string): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    const queryText = `${SEARCH_PATH}${query}`;
    const res = await client.query(queryText);
    client.release();
    return res;
  }

  async reset(): Promise<void>{
    const bdSchema = fs.readFileSync('../database/bdschema.sql').toString();
    await this.query(bdSchema);
    const data = fs.readFileSync('../database/data.sql').toString();
    await this.query(data);
  }

}
