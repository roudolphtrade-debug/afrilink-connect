import { test } from "node:test";
import { strict as assert } from "node:assert";
import { PLANNED_FOLLOW_UP } from "./planned-follow-up.ts";

test("the planned reminder is at 24 hours", () => {
  assert.equal(PLANNED_FOLLOW_UP.reminderAfterHours, 24);
});
test("the planned closure is at 48 hours", () => {
  assert.equal(PLANNED_FOLLOW_UP.closeAfterHours, 48);
});
test("the planned closure uses an earlier slot start", () => {
  assert.equal(PLANNED_FOLLOW_UP.closeAtSlotStartIfEarlier, true);
});
