import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { server } from "./server";
import "./tools";

async function main() {
  const transport = new StdioServerTransport();

  await server.connect(transport);

  console.error("🚂 Indian Train MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in MCP server:", error);
  process.exit(1);
});