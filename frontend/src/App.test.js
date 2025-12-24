import { render, screen } from "@testing-library/react";
import App from "./App";

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve([
          {
            timestamp: "2025-01-10T10:01:00Z",
            level: "INFO",
            message: "Service started",
          },
          {
            timestamp: "2025-01-10T10:05:12Z",
            level: "ERROR",
            message: "Database connection failed",
          },
        ]),
    })
  );
});

afterEach(() => {
  jest.resetAllMocks();
});

test("renders log table with fetched data", async () => {
  render(<App />);

  expect(await screen.findByText("Timestamp")).toBeInTheDocument();
  expect(await screen.findByText("Level")).toBeInTheDocument();
  expect(await screen.findByText("Message")).toBeInTheDocument();

  expect(await screen.findByText("Service started")).toBeInTheDocument();
  expect(await screen.findByText("Database connection failed")).toBeInTheDocument();
});

import { fireEvent } from "@testing-library/react";

test("filters logs by selected level", async () => {
  render(<App />);

  // Wait for initial data load
  await screen.findByText("Service started");

  const dropdown = screen.getByRole("combobox");

  // Use fireEvent (wrapped in act automatically)
  fireEvent.change(dropdown, { target: { value: "ERROR" } });

  // Assert on unique content, not ambiguous labels
  expect(
    await screen.findByText("Database connection failed")
  ).toBeInTheDocument();

  // INFO message should be filtered out
  expect(
    screen.queryByText("Service started")
  ).not.toBeInTheDocument();
});
