import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

let client: Client;

export async function initializeMcpClient() {
  const transport = new StdioClientTransport({
    command: "node",
    args: ["dist/mcp/index.js"]
  });

  client = new Client({
    name: "train-agent",
    version: "1.0.0"
  });

  await client.connect(transport);

  console.log("✅ MCP Client connected");
}

export async function listTools() {
  const response = await client.listTools();
  return response.tools;
}

export async function executeTool(
  toolName: string,
  args: Record<string, unknown>
) {
  return client.callTool({
    name: toolName,
    arguments: args
  });
}