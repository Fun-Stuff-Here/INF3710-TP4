import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import { DatabaseService } from "../services/database.service";
import Types from "../types";
import { Variete } from "../../../common/tables/Variete";
import * as pg from "pg";

@injectable()
export class DatabaseController {
  public constructor(
    @inject(Types.DatabaseService) private databaseService: DatabaseService
  ) {}
	
  public get router(): Router {
    const router: Router = Router();
	router.get("/jardins", (req: Request, res: Response, _: NextFunction) => 
      this.databaseService.getJardins().then(jardins => {res.json(jardins)})
        .catch((e: Error) => console.error(e.stack))
    );

	router.get("/parcelles/:jardinID", (req: Request, res: Response, _: NextFunction) => 
      this.databaseService.getParcelles(req.params.jardinID).then(parcelles => {res.json(parcelles)})
        .catch((e: Error) => console.error(e.stack))
    );

	router.get("/rangs", (req: Request, res: Response, _: NextFunction) => 
      this.databaseService.getRangs(req.params.jardinID, req.params.xparcelle,req.params.yparcelle).then(rangs => {res.json(rangs)})
        .catch((e: Error) => console.error(e.stack))
    );

	router.get("/varietes", (req: Request, res: Response, _: NextFunction) => {
		this.databaseService.getVarietes().then((result: pg.QueryResult) => {
			const varietes: Variete[] = result.rows.map((variete: Variete) => ({
				id: variete.id,
				name: variete.name,
				yearMarket: variete.yearMarket,
    			plantingDescription: variete.plantingDescription,
    			maintenanceDescription: variete.maintenanceDescription,
    			seedingDescription: variete.seedingDescription,
    			harvestDescription: variete.harvestDescription,
    			plantingPeriod: variete.plantingPeriod,
    			harvestPeriod: variete.harvestPeriod,
    			comment: variete.comment,
    			goodSoils: variete.goodSoils,
			}));
			res.json(varietes);
		})
		.catch((e: Error) => {
			console.error(e.stack);
		})
	});

	router.delete("/varietes/:id", (req: Request, res: Response, _: NextFunction) => {
		this.databaseService.deleteVariete(req.params.id).then().catch((e: Error) => {
			console.error(e.stack);
		})
	});

    router.get("/plant/:name", (req: Request, res: Response, _: NextFunction) => 
      this.databaseService.getPlantsByName(req.params.name).then(plants => {res.json(plants)})
        .catch((e: Error) => console.error(e.stack))
    );
    return router;
  }
}
