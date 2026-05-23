import { planToolCall } from "../planner/toolPlanner";
import { runTool } from "../executor/toolExecutor";
import { formatResponse } from "../formatter/responseFormatter";

export async function processQuery(
  query: string
) {

  const plan = await planToolCall(query);

  console.log(
    "Generated Plan:",
    JSON.stringify(plan, null, 2)
  );

  const toolResult =
    await runTool(
      plan.tool,
      plan.arguments
    );

  return formatResponse(
    query,
    plan.tool,
    toolResult
  );
}