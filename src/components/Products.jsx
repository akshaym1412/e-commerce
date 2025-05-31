import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { trimText } from "../utils";
import { addToFavourite, removeFromFavourites } from "../redux/favouritesSlice";
import { Link } from "react-router-dom";

const Products = () => {
  const { products, loading } = useSelector((state) => state.products);
  const { favourites, search } = useSelector((state) => state.favourites);
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const handleChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const enrichedProducts = products
    .filter((prod) => {
      if (!selectedCategory) return true;
      return prod.category === selectedCategory;
    })
    .map((prod) => ({
      ...prod,
      favourite: favourites.some((fav) => fav.id === prod.id),
    }));

  const sortedProducts = [...enrichedProducts].sort((a, b) => {
    if (sortOrder === "lowToHigh") return a.price - b.price;
    if (sortOrder === "highToLow") return b.price - a.price;
    return 0;
  });

  const searchProducts = sortedProducts.filter((prod) =>
    prod.title.toLowerCase().includes(search.toLowerCase())
  );

  function productDisplay() {
    return searchProducts.map((prod) => (
      <div
        key={prod.id}
        className="flex flex-col items-center border-2 rounded-xl gap-3 p-3"
      >
        <Link
          to={`/product/${prod.id}`}
          className="w-full flex flex-col items-center gap-2 hover:opacity-90"
        >
          <img src={prod.image} alt={prod.title} className="w-52 h-52" />
          <h1 className="font-semibold text-[16px] lg:text-lg">
            {trimText(prod.title)}
          </h1>
          <p className="font-bold text-lg">
            Price : <span className="text-green-600 ">${prod.price}</span>
          </p>
          <div className="text-md font-medium flex items-center gap-1">
            Ratings :{" "}
            <span className="text-yellow-500">
              ⭐ {prod.rating.rate} ({prod.rating.count})
            </span>
          </div>
        </Link>

        <div className="flex w-full gap-5 font-bold text-sm">
          <button className="bg-green-400 p-1 rounded-sm w-full cursor-pointer">
            Add to Cart
          </button>
          {prod.favourite ? (
            <button
              className="bg-red-400 p-1 rounded-sm w-full cursor-pointer"
              onClick={() => dispatch(removeFromFavourites(prod))}
            >
              Remove from Favourites
            </button>
          ) : (
            <button
              className="bg-red-400 p-1 rounded-sm w-full cursor-pointer"
              onClick={() => dispatch(addToFavourite(prod))}
            >
              Add to Favourites
            </button>
          )}
        </div>
      </div>
    ));
  }

  return (
    <div className="p-5">
      {loading ? (
        <div className="w-full h-full flex justify-center items-center">
          Loading....
        </div>
      ) : (
        <>
          <div className="flex justify-evenly lg:gap-10 ">
            <div className="mb-5">
              <label className="font-semibold lg:text-lg" htmlFor="filter">
                Filter by :
              </label>
              <select
                value={selectedCategory}
                id="filter"
                onChange={handleChange}
                className="ml-4"
              >
                <option value="">Select Category</option>
                <option value="men's clothing">Men's Clothing</option>
                <option value="women's clothing">Women's Clothing</option>
                <option value="jewelery">Jewelery</option>
                <option value="electronics">Electronics</option>
              </select>
            </div>
            <div className="ml-20">
              <label className="font-semibold lg:text-[17px]" htmlFor="price">
                Sort by price :
              </label>
              <select
                value={sortOrder}
                id="price"
                onChange={(e) => {
                  setSortOrder(e.target.value);
                }}
                className="ml-4"
              >
                <option value="">Select Price</option>
                <option value="lowToHigh">Low to High</option>
                <option value="highToLow">High to Low</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {productDisplay()}
          </div>
        </>
      )}
    </div>
  );
};

export default Products;
