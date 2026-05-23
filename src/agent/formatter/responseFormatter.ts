import { callLocalLLM } from "../llm/ollama";

export async function formatResponse(
  userQuestion: string,
  toolName: string,
  toolResult: unknown
) {

  const prompt = `
You are an Indian railway assistant.

Rules:

- Use ONLY information present in Tool Result.
- Never hallucinate.
- Never invent trains.
- Never invent schedules.
- Never invent delays.
- If data is missing, say so.

User Question:

${userQuestion}

Tool Used:

${toolName}

Tool Result:

${JSON.stringify(toolResult, null, 2)}

Provide a concise helpful answer.
`;

  console.log(
  "Tool Result:",
  JSON.stringify(toolResult, null, 2)
  );

  return callLocalLLM(prompt);
}