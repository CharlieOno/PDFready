import { Request, Response } from "express";

export class AboutController {

  public index(req: Request, res: Response) {
    res.json({
      name: "PDFready",
      version: "1.0.0",
      description: "Micro-service to convert HTML into PDF"
    });
  }

}