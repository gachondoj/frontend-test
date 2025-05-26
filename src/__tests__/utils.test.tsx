import { isObjectInList } from "@/utils/isObjectInList";

test("isObjectInList works correcly", () => {
  const list = [1, 2, 3];

  expect(isObjectInList(1, list)).toBe(true);
  expect(isObjectInList(4, list)).toBe(false);
});
