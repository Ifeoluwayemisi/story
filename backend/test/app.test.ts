import assert from "node:assert/strict";
import { test } from "node:test";
import { createAppServer } from "../src/app.ts";

test("GET /health returns 200 with status ok", async (t) => {
  const server = createAppServer();
  server.listen(0);
  t.after(() => {
    server.closeAllConnections();
    server.close();
  });

  await new Promise<void>((resolve) => server.once("listening", resolve));

  const address = server.address();
  assert.ok(address !== null && typeof address !== "string");

  const response = await fetch(`http://127.0.0.1:${address.port}/health`);
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { status: "ok" });
});
