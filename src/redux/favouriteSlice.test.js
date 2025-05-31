import favouriteReducer, {
  addToFavourite,
  removeFromFavourites,
  searchText,
} from "./favouritesSlice";

describe("favouriteSlice reducer", () => {
  const initialState = {
    favourites: [],
    search: "",
  };

  const product = {
    id: 1,
    title: "Product 1",
    price: 100,
  };

  it("should return the initial state", () => {
    expect(favouriteReducer(undefined, { type: "@@INIT" })).toEqual(
      initialState
    );
  });

  it("should add a product to favourites", () => {
    const nextState = favouriteReducer(initialState, addToFavourite(product));
    expect(nextState.favourites).toHaveLength(1);
    expect(nextState.favourites[0]).toEqual(product);
  });

  it("should not add the same product twice", () => {
    const stateWithProduct = {
      favourites: [product],
      search: "",
    };
    const nextState = favouriteReducer(
      stateWithProduct,
      addToFavourite(product)
    );
    expect(nextState.favourites).toHaveLength(1);
  });

  it("should remove a product from favourites", () => {
    const stateWithProduct = {
      favourites: [product],
      search: "",
    };
    const nextState = favouriteReducer(
      stateWithProduct,
      removeFromFavourites(product)
    );
    expect(nextState.favourites).toHaveLength(0);
  });

  it("should update the search text", () => {
    const nextState = favouriteReducer(initialState, searchText("test"));
    expect(nextState.search).toBe("test");
  });
});
