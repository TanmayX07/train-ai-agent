import "dotenv/config";
import express from "express";
import cors from "cors";

import { registerTrainRoutes } from "./controller";

const app = express();

app.use(cors());
app.use(express.json());

registerTrainRoutes(app);

const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, () => {
  console.log(
    `🚂 Train API running on port ${PORT}`
  );
});
