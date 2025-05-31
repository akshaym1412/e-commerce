import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import Products from "./Products";
import { addToFavourite } from "../redux/favouritesSlice";

// Create mock store
const mockStore = configureStore([]);

const mockProducts = [
  {
    id: 1,
    title: "Men's T-Shirt",
    price: 25,
    category: "men's clothing",
    image: "image-url",
    rating: { rate: 4.5, count: 10 },
  },
  {
    id: 2,
    title: "Laptop",
    price: 800,
    category: "electronics",
    image: "image-url",
    rating: { rate: 4.8, count: 20 },
  },
];

const renderWithStore = (store) => {
  return render(
    <Provider store={store}>
      <BrowserRouter>
        <Products />
      </BrowserRouter>
    </Provider>
  );
};

describe("Products Component", () => {
  test("renders product cards", () => {
    const store = mockStore({
      products: { products: mockProducts, loading: false },
      favourites: { favourites: [], search: "" },
    });

    renderWithStore(store);

    expect(screen.getByText(/Men's T-Shirt/i)).toBeInTheDocument();
    expect(screen.getByText(/Laptop/i)).toBeInTheDocument();
  });

  test("filters products by category", () => {
    const store = mockStore({
      products: { products: mockProducts, loading: false },
      favourites: { favourites: [], search: "" },
    });

    renderWithStore(store);

    const categorySelect = screen.getByLabelText(/Filter by/i);
    fireEvent.change(categorySelect, { target: { value: "electronics" } });

    expect(screen.queryByText(/Men's T-Shirt/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Laptop/i)).toBeInTheDocument();
  });

  test("sorts products by price low to high", () => {
    const store = mockStore({
      products: { products: mockProducts, loading: false },
      favourites: { favourites: [], search: "" },
    });

    renderWithStore(store);

    const priceSelect = screen.getByLabelText(/Sort by price/i);
    fireEvent.change(priceSelect, { target: { value: "lowToHigh" } });

    const headings = screen.getAllByRole("heading", { level: 1 });
    expect(headings[0]).toHaveTextContent(/Men's T-Shirt/i);
  });

  test("dispatches addToFavourite on button click", () => {
    const store = mockStore({
      products: { products: mockProducts, loading: false },
      favourites: { favourites: [], search: "" },
    });

    store.dispatch = jest.fn(); // Spy on dispatch

    renderWithStore(store);

    const addButton = screen.getAllByText(/Add to Favourites/i)[0];
    fireEvent.click(addButton);

    expect(store.dispatch).toHaveBeenCalledWith(
      addToFavourite({
        ...mockProducts[0],
        favourite: false,
      })
    );
  });

  test("shows loading message", () => {
    const store = mockStore({
      products: { products: [], loading: true },
      favourites: { favourites: [], search: "" },
    });

    renderWithStore(store);

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });
});
