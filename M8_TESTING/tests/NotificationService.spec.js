const { SendNotification } = require("../src/NotificationService");

describe("Notification Service", () => {
  const mockNotificationService = {
    send: jest.fn(),
  };

  test("should return 'Notification Sent' for successful notification", () => {
    mockNotificationService.send.mockReturnValue(true);
    expect(SendNotification(mockNotificationService, "Test message")).toBe("Notification Sent");
  });

  test("should return 'Failed to Send' for failed notification", () => {
    mockNotificationService.send.mockReturnValue(false);
    expect(SendNotification(mockNotificationService, "Test message")).toBe("Failed to Send");
  });
});
