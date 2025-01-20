const { getElement } = require("../src/ArrayIndex");

describe("Array Index", () => {
  const arr = [1, 2, 3, 4, 5];

  test("should return element for valid index", () => {
    expect(getElement(arr, 0)).toBe(1);
    expect(getElement(arr, 4)).toBe(5);
  });

  test("should throw error for invalid index", () => {
    expect(() => getElement(arr, -1)).toThrow("Index out of bounds");
    expect(() => getElement(arr, 5)).toThrow("Index out of bounds");
  });
});
