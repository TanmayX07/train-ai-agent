import { executeTool } from "../mcp/mcpClient";

export async function runTool(
  toolName: string,
  args: Record<string, unknown>
) {

  console.log(
  "Executing Tool:",
  toolName
);

console.log(
  "Arguments:",
  args
);

  return executeTool(toolName, args);
}