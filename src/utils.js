import { persistor } from "./redux/store";

export const trimText = (text) =>
  text.length > 30 ? text.substring(0, 30) + "...." : text;

export const handleLogout = () => {
  console.log("inside");
  persistor.purge();
};
