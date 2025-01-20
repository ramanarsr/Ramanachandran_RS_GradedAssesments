const { FetchAndDisplayUser } = require("../src/FetchAndDisplayUser");

describe("FetchAndDisplayUser", () => {
  let mockApiService;
  let element;

  beforeEach(() => {
    mockApiService = {
      getUser: jest.fn(),
    };
    element = { textContent: "" };
  });

  test("should display user name when data is valid", async () => {
    mockApiService.getUser.mockResolvedValue({ name: "John Doe" });

    await FetchAndDisplayUser(mockApiService, 1, element);

    expect(mockApiService.getUser).toHaveBeenCalledWith(1);
    expect(element.textContent).toBe("Hello, John Doe");
  });

  test("should display error message when user data is invalid", async () => {
    mockApiService.getUser.mockResolvedValue({});

    await FetchAndDisplayUser(mockApiService, 1, element);

    expect(mockApiService.getUser).toHaveBeenCalledWith(1);
    expect(element.textContent).toBe("Invalid user data");
  });

  test("should display error message when fetch fails", async () => {
    mockApiService.getUser.mockRejectedValue(new Error("User not found"));

    await FetchAndDisplayUser(mockApiService, 1, element);

    expect(mockApiService.getUser).toHaveBeenCalledWith(1);
    expect(element.textContent).toBe("User not found");
  });
});
