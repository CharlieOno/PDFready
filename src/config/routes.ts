import { AboutController } from "../controllers/about.controller";
import { DocumentController } from "../controllers/document.controller";
import { check, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import * as cors from "cors";

export function validateParameters(req: Request, res: Response) {
  const errors = validationResult(req);
  
  if (!errors.isEmpty())
    return res.status(422).json({ errors: errors.array() });
}

export class Routes {
  public aboutController: AboutController = new AboutController();
  public documentController: DocumentController = new DocumentController();

  public middlewares(router): void {
    const options:cors.CorsOptions = {
      credentials: true,
      methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
      origin: "*",
      preflightContinue: false
    };
    router.use(cors(options));
    router.options("*", cors(options));
  }

  public routes(app): void {
    app.get("/", this.aboutController.index);

    app.post("/pdfready/pagehtml/to/pdf", [
      check('content').isString()
    ], this.documentController.convertPageHTMLtoPDF);

    app.post("/pdfready/rawhtml/to/pdf", [
      check('content').isString()
    ], this.documentController.convertRawHTMLtoPDF);

    app.post("/pdfready/template/to/pdf", [
      check('content').isString()
    ], this.documentController.convertTemplateToPDF);

    app.get('/pdfready/template', [
      check('content').isString(),
      check('data').isJSON()
    ], this.documentController.renderTemplate);
  }
  
}