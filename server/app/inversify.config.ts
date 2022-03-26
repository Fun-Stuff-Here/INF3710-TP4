import { Container } from "inversify";
import { Application } from "./app";
import { Server } from "./server";
import { DatabaseService } from "./services/database.service";
import Types from "./types";

const container: Container = new Container();

container.bind(Types.Server).to(Server);
container.bind(Types.Application).to(Application);

container.bind(Types.DatabaseService).to(DatabaseService).inSingletonScope();


export { container };
