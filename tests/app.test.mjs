import test from "node:test";
import assert from "node:assert/strict";
import { seedState, balanceOf, totalBalance } from "../dist/app.js";

test("saldo siswa dihitung hanya dari ledger posted", () => {
  const state = seedState();
  assert.equal(balanceOf(state, "S-24001"), 200000);
  state.ledger.push({ studentId: "S-24001", amount: 999999, status: "pending" });
  assert.equal(balanceOf(state, "S-24001"), 200000);
});

test("saldo total sama dengan jumlah seluruh saldo siswa", () => {
  const state = seedState();
  const expected = state.students.reduce((sum, item) => sum + balanceOf(state, item.id), 0);
  assert.equal(totalBalance(state), expected);
  assert.equal(totalBalance(state), 1330000);
});
