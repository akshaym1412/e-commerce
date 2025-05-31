import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { trimText } from "../utils";
import { removeFromFavourites } from "../redux/favouritesSlice";

const Favourites = () => {
  const { favourites } = useSelector((state) => state.favourites);
  const dispatch = useDispatch();

  function productDisplay() {
    return favourites.map((prod) => (
      <div
        key={prod.id}
        className="flex flex-col items-center border-2 rounded-xl gap-3 p-3 "
      >
        <img src={prod.image} alt={prod.title} className="w-52 h-52"></img>
        <h1 className="font-semibold text-[16px] lg:text-lg">
          {trimText(prod.title)}
        </h1>
        <p className="font-bold text-lg">
          Price : <span className="text-green-600 ">${prod.price}</span>
        </p>

        <div className="text-md font-medium flex items-center gap-1">
          Ratings :{" "}
          <span className="text-yellow-500 ">
            {" "}
            ⭐ {prod.rating.rate} ({prod.rating.count})
          </span>
        </div>
        <div className="flex w-full gap-5 font-bold text-sm">
          <button className="bg-green-400 p-1 rounded-sm w-full cursor-pointer">
            Add to Cart
          </button>
          <button
            className="bg-red-400 p-1 rounded-sm w-full cursor-pointer"
            onClick={() => {
              dispatch(removeFromFavourites(prod));
            }}
          >
            Remove from Favourites
          </button>
        </div>
      </div>
    ));
  }

  return (
    <div>
      {favourites.length === 0 ? (
        <div className="w-full h-[30rem] text-lg lg:text-2xl font-semibold flex justify-center items-center">
          No products in Favourites
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-14">
          {productDisplay()}
        </div>
      )}
    </div>
  );
};

export default Favourites;
