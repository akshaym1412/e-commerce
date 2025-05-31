import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToFavourite, removeFromFavourites } from "../redux/favouritesSlice";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const { favourites } = useSelector((state) => state.favourites);

  const enrichedProducts = products.map((prod) => ({
    ...prod,
    favourite: favourites.some((fav) => fav.id === prod.id),
  }));

  const product = enrichedProducts.find((p) => p.id === parseInt(id));

  if (!product) return <p>Product not found.</p>;

  return (
    <div className="p-4 flex flex-col lg:flex-row  ">
      <div className="lg:w-[50%] flex justify-center">
        <img
          src={product.image}
          alt={product.title}
          className="w-[20rem] h-[20rem]"
        />
      </div>
      <div className="lg:w-[50%] flex flex-col gap-4 pt-5">
        <h1 className="text-2xl font-bold">{product.title}</h1>
        <p className="text-lg">
          <span className="font-bold">Price:</span> ${product.price}
        </p>
        <p>
          <span className="font-bold">Rating:</span>⭐ {product.rating.rate} (
          {product.rating.count}){" "}
        </p>
        <div className="flex w-full gap-5 font-bold text-sm">
          <button className="bg-green-400 p-1 rounded-sm w-full cursor-pointer">
            Add to Cart
          </button>
          {product.favourite ? (
            <button
              className="bg-red-400 p-1 rounded-sm w-full cursor-pointer"
              onClick={() => dispatch(removeFromFavourites(product))}
            >
              Remove from Favourites
            </button>
          ) : (
            <button
              className="bg-red-400 p-1 rounded-sm w-full cursor-pointer"
              onClick={() => dispatch(addToFavourite(product))}
            >
              Add to Favourites
            </button>
          )}
        </div>
        <div className="text-sm">
          <p className="font-bold text-[16px]">Description :</p>
          <p className="text-[15px] mt-3">{product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
