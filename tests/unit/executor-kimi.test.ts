import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { KimiExecutor } from "../../open-sse/executors/kimi.ts";

describe("KimiExecutor", () => {
  it("injects empty reasoning_content for assistant tool call messages when thinking is enabled", () => {
    const executor = new KimiExecutor();

    const transformed = executor.transformRequest(
      "kimi-k2",
      {
        thinking: { type: "enabled" },
        messages: [
          { role: "user", content: "hi" },
          {
            role: "assistant",
            content: null,
            tool_calls: [
              {
                id: "call_1",
                type: "function",
                function: { name: "search", arguments: "{}" },
              },
            ],
            reasoning_content: null,
          },
        ],
      },
      false,
      { apiKey: "test" }
    ) as { messages?: Array<Record<string, unknown>> };

    assert.ok(Array.isArray(transformed.messages));
    assert.equal(transformed.messages?.[1]?.reasoning_content, "");
  });
});
