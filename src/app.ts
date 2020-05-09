import * as express from "express";
import * as bodyParser from "body-parser";
import { Routes } from "./config/routes";
import * as mustacheExpress from "mustache-express";

class App {
  public app: express.Application;
  public router: express.Router;
  public routeService: Routes = new Routes();

  constructor() {
    this.app = express();
    this.router = express.Router();
    this.config();
    this.routeService.middlewares(this.router);
    this.routeService.routes(this.app);
  }

  private config(): void {
    this.app.use('/', this.router);
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.engine('mst', mustacheExpress());
    this.app.set('view engine', 'mst');
    this.app.set('views', __dirname + '/views');
  }
}

export default new App().app;