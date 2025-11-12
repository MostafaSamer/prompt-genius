import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import SharedDropdown from "./SharedDropdown";

describe("SharedDropdown Component", () => {
  const mockOnSelect = vi.fn();

  const mockOptions = [
    { label: "Profile", value: "profile" },
    { label: "Settings", value: "settings" },
    { label: "Logout", value: "logout" },
  ];

  it("renders the dropdown trigger button with the correct label", () => {
    render(<SharedDropdown label="Menu" options={mockOptions} onSelect={mockOnSelect} />);
    expect(screen.getByRole("button", { name: /menu/i })).toBeInTheDocument();
  });

  it("displays the dropdown items when the button is clicked", async () => {
    render(<SharedDropdown label="Menu" options={mockOptions} onSelect={mockOnSelect} />);
    const triggerButton = screen.getByRole("button", { name: /menu/i });

    fireEvent.click(triggerButton);

    expect(await screen.findByText("Profile")).toBeInTheDocument();
    expect(screen.getByText("Settings")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

  it("calls onSelect with the correct value when an option is clicked", async () => {
    render(<SharedDropdown label="Menu" options={mockOptions} onSelect={mockOnSelect} />);
    fireEvent.click(screen.getByRole("button", { name: /menu/i }));

    const settingsOption = await screen.findByText("Settings");
    fireEvent.click(settingsOption);

    expect(mockOnSelect).toHaveBeenCalledWith("settings");
    expect(mockOnSelect).toHaveBeenCalledTimes(1);
  });
});
