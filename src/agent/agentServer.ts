import express from "express";

import { processQuery }
  from "./orchestrator/agentOrchestrator";

import {
  initializeMcpClient
} from "./mcp/mcpClient";

const app = express();

app.use(express.json());

app.post("/chat", async (req, res) => {

  try {

    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        error: "message required"
      });
    }

    const response =
      await processQuery(message);

    res.json({
      response
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "agent failed"
    });
  }
});

async function bootstrap() {

  await initializeMcpClient();

  app.listen(
    4000,
    () => {
      console.log(
        "🚂 Train Agent running on port 4000"
      );
    }
  );
}

bootstrap();