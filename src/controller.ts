import { Application, Request, Response } from "express";
import * as trainService from "./service";

export const registerTrainRoutes = (app: Application) => {

  app.get("/api/getTrains", async (req: Request, res: Response) => {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({
        message: "query is required"
      });
    }

    try {
      const trains = await trainService.searchTrains(query as string);
      res.json(trains);
    } catch (error) {
      res.status(502).json({
        message: "Unable to fetch trains",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  app.get(
    "/api/runningStatus/:trainNo",
    async (req: Request, res: Response) => {
      const trainNo = req.params.trainNo as string;
      const { startDay } = req.query;
      const normalizedStartDay =
        typeof startDay === "string" ? startDay : "1";

      try {
        const status =
          await trainService.getRunningStatus(
            trainNo,
            normalizedStartDay
          );

        res.json(status);
      } catch (error) {
        res.status(502).json({
          message: "Unable to fetch running status",
          error: error instanceof Error ? error.message : "Unknown error"
        });
      }
    }
  );
};
