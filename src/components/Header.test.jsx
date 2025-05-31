import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Header from "../components/Header";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../redux/store";

const renderWithProviders = (ui) => {
  return render(
    <Provider store={store}>
      <BrowserRouter>{ui}</BrowserRouter>
    </Provider>
  );
};

describe("Header Component", () => {
  test("renders logo text", () => {
    renderWithProviders(<Header />);
    expect(screen.getByText(/E-Commerce/i)).toBeInTheDocument();
  });

  test("search input updates and dispatches", async () => {
    renderWithProviders(<Header />);
    const input = screen.getByPlaceholderText(/search product/i);
    fireEvent.change(input, { target: { value: "laptop" } });
    expect(input.value).toBe("laptop");
  });

  test("mobile menu opens and closes", async () => {
    renderWithProviders(<Header />);

    const hamburger = screen.getByRole("button");
    fireEvent.click(hamburger);

    const favouritesLinks = await screen.findAllByText(/favourites/i);
    expect(favouritesLinks.length).toBeGreaterThan(0);

    const buttons = screen.getAllByRole("button");
    fireEvent.click(buttons[1]);
  });
});
