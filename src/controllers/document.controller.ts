import { Request, Response } from "express";
import * as puppeteer from "puppeteer";
import { validateParameters } from '../config/routes';
import axios from 'axios';
import * as fs from "fs";

export class DocumentController {

    public async renderTemplate(req: Request, res: Response) {
        res.render(req.body.content, req.body.data);
    }

    public async convertTemplateToPDF(req: Request, res: Response) {
        validateParameters(req, res);
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        axios.get('http://localhost:3000/pdfready/template', {
            data: {
                content: req.body.content,
                data: req.body.data
            }
        }).then(async (html) => {
            await page.setContent(html.data);
            const pdf = await page.pdf({
                format: "A4",
                printBackground: true,
                margin: {
                    left: "0px",
                    top: "0px",
                    right: "0px",
                    bottom: "0px"
                }
            });
            await page.close();
            await browser.close();
            res.set({ 'Content-Type': 'application/pdf', 'Content-Length': pdf.length });
            res.send(pdf);
        });
    }

    public async convertPageHTMLtoPDF(req: Request, res: Response) {
        validateParameters(req, res);
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.goto(req.body.content);
        const pdf = await page.pdf({
            format: "A4",
            printBackground: true,
            margin: {
                left: "0px",
                top: "0px",
                right: "0px",
                bottom: "0px"
            }
        });
        await browser.close();
        res.set({ 'Content-Type': 'application/pdf', 'Content-Length': pdf.length });
        res.send(pdf);
    }

    public async convertRawHTMLtoPDF(req: Request, res: Response) {
        validateParameters(req, res);
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.setContent(req.body.content);
        const pdf = await page.pdf({
            format: "A4",
            printBackground: true,
            margin: {
                left: "0px",
                top: "0px",
                right: "0px",
                bottom: "0px"
            }
        });
        await browser.close();
        res.set({ 'Content-Type': 'application/pdf', 'Content-Length': pdf.length });
        res.send(pdf);
    }

}