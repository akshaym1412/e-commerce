import { configureStore } from "@reduxjs/toolkit";
import reducer, { fetchProducts } from "./productSlice";
import axios from "axios";
import thunk from "redux-thunk";
import { applyMiddleware } from "redux";

jest.mock("axios");

describe("productSlice", () => {
  const initialState = {
    products: [],
    loading: false,
    error: null,
  };

  test("should return the initial state", () => {
    expect(reducer(undefined, { type: undefined })).toEqual(initialState);
  });

  test("should handle fetchProducts.pending", () => {
    const action = { type: fetchProducts.pending.type };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: true,
    });
  });

  test("should handle fetchProducts.fulfilled", () => {
    const mockProducts = [{ id: 1, title: "Product 1" }];
    const action = {
      type: fetchProducts.fulfilled.type,
      payload: mockProducts,
    };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      products: mockProducts,
      loading: false,
    });
  });

  test("should handle fetchProducts.rejected", () => {
    const action = {
      type: fetchProducts.rejected.type,
      payload: "Something went wrong",
    };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: false,
      error: "Something went wrong",
    });
  });

  test("should fetch products successfully from API", async () => {
    const mockProducts = [{ id: 1, title: "Product 1" }];
    axios.get.mockResolvedValueOnce({ data: mockProducts });

    const store = configureStore({
      reducer: {
        products: reducer,
      },
      middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    });

    await store.dispatch(fetchProducts());
    const state = store.getState().products;
    expect(state.products).toEqual(mockProducts);
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
  });

  test("should handle API failure", async () => {
    axios.get.mockRejectedValueOnce(new Error("Network Error"));

    const store = configureStore({
      reducer: {
        products: reducer,
      },
      middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    });

    await store.dispatch(fetchProducts());
    const state = store.getState().products;
    expect(state.error).toBe("Network Error");
    expect(state.loading).toBe(false);
  });
});
