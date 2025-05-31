import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Favourites from "./Favourites";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { MemoryRouter } from "react-router-dom";
import { within } from "@testing-library/react";
import { removeFromFavourites } from "../redux/favouritesSlice";

jest.mock("../utils", () => ({
  trimText: (text) => text, // Mock trimText to return plain text
}));

const mockStore = configureStore([]);

describe("Favourites Component", () => {
  let store;

  beforeEach(() => {
    // default empty favourites for tests that need it
    store = mockStore({
      favourites: {
        favourites: [],
      },
    });
    store.dispatch = jest.fn();
  });

  test("renders message when no favourites", () => {
    render(
      <Provider store={store}>
        <Favourites />
      </Provider>
    );

    expect(screen.getByText("No products in Favourites")).toBeInTheDocument();
  });

  test("renders favourite products", () => {
    const mockProducts = [
      {
        id: 1,
        title: "Product 1",
        image: "image-url",
        price: 100,
        rating: { rate: 4.5, count: 10 },
      },
    ];

    store = mockStore({
      favourites: {
        favourites: mockProducts,
      },
    });

    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Favourites />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText("Product 1")).toBeInTheDocument();

    const priceElement = screen.getByText("Price :");
    expect(within(priceElement).getByText("$100")).toBeInTheDocument();

    const ratingElement = screen.getByText(/Ratings/i);
    expect(
      within(ratingElement).getByText(/⭐\s*4.5\s*\(10\)/)
    ).toBeInTheDocument();
  });

  test("dispatches removeFromFavourites on button click", () => {
    const mockProducts = [
      {
        id: 1,
        title: "Product 1",
        image: "image-url",
        price: 100,
        rating: { rate: 4.5, count: 10 },
      },
    ];

    store = mockStore({
      favourites: {
        favourites: mockProducts,
      },
    });
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Favourites />
        </MemoryRouter>
      </Provider>
    );

    const removeButton = screen.getByText("Remove from Favourites");
    fireEvent.click(removeButton);

    expect(store.dispatch).toHaveBeenCalledWith(
      removeFromFavourites(mockProducts[0])
    );
  });
});
