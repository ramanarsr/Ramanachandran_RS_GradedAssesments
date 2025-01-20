const { capitalize, reverseString } = require("../src/StringUtilities");

describe("String Utilities", () => {
  test("capitalize should capitalize the first letter", () => {
    expect(capitalize("hello")).toBe("Hello");
    expect(capitalize("")).toBe("");
    expect(capitalize("a")).toBe("A");
  });

  test("reverseString should reverse the string", () => {
    expect(reverseString("hello")).toBe("olleh");
    expect(reverseString("")).toBe("");
    expect(reverseString("madam")).toBe("madam");
  });
});
