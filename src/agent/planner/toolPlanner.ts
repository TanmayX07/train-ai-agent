import { callLocalLLM } from "../llm/ollama";
import { listTools } from "../mcp/mcpClient";

export async function planToolCall(query: string) {

  const tools = await listTools();

  const toolDescriptions = tools.map(tool => ({
    name: tool.name,
    description: tool.description,
    inputSchema: tool.inputSchema
  }));

  const prompt = `
You are an MCP tool planner.

Your job:
1. Understand the user request.
2. Select the best matching MCP tool.
3. Extract arguments.
4. Return JSON only.

Available Tools:

${JSON.stringify(toolDescriptions, null, 2)}

Rules:
- NEVER answer the user.
- NEVER explain your reasoning.
- NEVER hallucinate data.
- Return ONLY JSON.

Response Format:

{
  "tool": "tool_name",
  "arguments": {}
}

User Request:

${query}
`;

  const response = await callLocalLLM(prompt, true);

  console.log(
    "Available Tools:",
    JSON.stringify(tools, null, 2)
  );

  console.log(
    "Planner Output:",
    response
  );

  return JSON.parse(response);
}
