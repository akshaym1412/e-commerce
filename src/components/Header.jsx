import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { searchText } from "../redux/favouritesSlice";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";

const Header = () => {
  const dispatch = useDispatch();
  const [localSearch, setLocalSearch] = useState("");
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      dispatch(searchText(localSearch));
    }, 1000);

    return () => clearTimeout(handler);
  }, [localSearch, dispatch]);

  return (
    <div className="flex flex-col md:flex-row gap-3 justify-between p-2 lg:p-5 relative">
      <div className="font-bold flex items-center gap-5 text-lg lg:text-2xl">
        <button
          className="lg:hidden cursor-pointer"
          onClick={() => setMenu(true)}
        >
          <GiHamburgerMenu />
        </button>
        <NavLink to="/">E-Commerce</NavLink>
      </div>

      {/* Search Input */}
      <div>
        <input
          value={localSearch}
          type="text"
          placeholder="Search product..."
          onChange={(e) => setLocalSearch(e.target.value)}
          className="border p-1 rounded-md w-full md:w-[25rem]"
        />
      </div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex justify-between gap-8">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-red-500 font-bold" : "text-gray-700"
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/favourites"
            className={({ isActive }) =>
              isActive ? "text-red-500 font-bold" : "text-gray-700"
            }
          >
            Favourites
          </NavLink>
        </li>
      </ul>

      {/* Mobile Menu */}
      {menu && (
        <div className="absolute top-0 left-0 h-screen bg-white w-[60%] z-50 p-4 shadow-md md:hidden">
          <div className="flex justify-end items-center mb-4">
            <button onClick={() => setMenu(false)} className="cursor-pointer">
              <IoClose size={24} />
            </button>
          </div>
          <ul className="flex flex-col gap-4">
            <li>
              <NavLink
                to="/"
                onClick={() => setMenu(false)}
                className={({ isActive }) =>
                  isActive ? "text-red-500 font-bold" : "text-gray-700"
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/favourites"
                onClick={() => setMenu(false)}
                className={({ isActive }) =>
                  isActive ? "text-red-500 font-bold" : "text-gray-700"
                }
              >
                Favourites
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Header;
