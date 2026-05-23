import axios from "axios";

export async function callLocalLLM(
  prompt: string,
  jsonMode = false
): Promise<string> {
  const response = await axios.post(
    "http://localhost:11434/api/generate",
    {
      model: "qwen2.5:3b",
      prompt,
      stream: false,
      format: jsonMode ? "json" : undefined,
      options: {
        temperature: 0
      }
    }
  );

  return response.data.response;
}