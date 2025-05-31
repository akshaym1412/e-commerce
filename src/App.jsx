import { useDispatch } from "react-redux";
import "./App.css";
import Products from "./components/Products";
import { useEffect } from "react";
import { fetchProducts } from "./redux/productSlice";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Favourites from "./components/Favourites";
import ProductDetails from "./components/ProductDetails";

function App() {
  const disptch = useDispatch();

  useEffect(() => {
    disptch(fetchProducts());
  }, [disptch]);

  return (
    <Routes>
      <Route path="/" element={<Products />}></Route>
      <Route path="/favourites" element={<Favourites />}></Route>
      <Route path="/product/:id" element={<ProductDetails />}></Route>
    </Routes>
  );
}

export default App;
