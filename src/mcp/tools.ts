import { z } from "zod";
import { server } from "./server";


// SEARCH TRAINS TOOL
server.registerTool(
  "search_trains",
  {
    title: "Search Trains",
    description:
      "Search Indian trains by train name or train number",

    inputSchema: {
      query: z.string()
    }
  },
  async ({ query }) => {

    const response = await fetch(
      `http://localhost:3000/api/getTrains?query=${encodeURIComponent(
        query
      )}`
    );

    const data = await response.json();

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(data, null, 2)
        }
      ]
    };
  }
);


// RUNNING STATUS TOOL
server.registerTool(
  "get_running_status",
  {
    title: "Running Status",

    description:
      "Get live running status for a train",

    inputSchema: {
      trainNo: z.string(),
      startDay: z.string().optional()
    }
  },
  async ({ trainNo, startDay }) => {

    const response = await fetch(
      `http://localhost:3000/api/runningStatus/${trainNo}?startDay=${startDay ?? "1"}`
    );

    const data = await response.json();

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(data, null, 2)
        }
      ]
    };
  }
);