import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import { DatabaseService } from "../services/database.service";
import Types from "../types";

@injectable()
export class DatabaseController {
  public constructor(
    @inject(Types.DatabaseService) private databaseService: DatabaseService
  ) {}

  public get router(): Router {
    const router: Router = Router();

    router.get("/plant/:name", (req: Request, res: Response, _: NextFunction) => 
      this.databaseService.getPlantsByName(req.params.name).then(plants => res.json(plants))
        .catch((e: Error) => console.error(e.stack))
    );
    return router;
  }
}
