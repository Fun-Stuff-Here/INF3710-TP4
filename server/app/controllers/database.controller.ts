import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import { DatabaseService } from "../services/database.service";
import Types from "../types";
import { Jardin } from "../../../common/tables/Jardin";
import * as pg from "pg";

@injectable()
export class DatabaseController {
  public constructor(
    @inject(Types.DatabaseService) private databaseService: DatabaseService
  ) {}

  public get router(): Router {
    const router: Router = Router();
	router.get("/jardins", (req: Request, res: Response, _: NextFunction) => {
		this.databaseService.getJardins().then((result: pg.QueryResult) => {
			const jardins: Jardin[] = result.rows.map((jardin: Jardin) => ({
				name: jardin.name,
				id: jardin.id,
				area: jardin.area,
			}));
			res.json(jardins);
		})
		.catch((e: Error) => {
			console.error(e.stack);
		})
	});

    router.get("/plant/:name", (req: Request, res: Response, _: NextFunction) => 
      this.databaseService.getPlantsByName(req.params.name).then(plants => res.json(plants))
        .catch((e: Error) => console.error(e.stack))
    );
    return router;
  }
}
