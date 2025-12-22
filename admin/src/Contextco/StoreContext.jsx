// StoreContext.js
import { createContext, useState } from "react";
import axios from "axios";
import { food_list, menu_list, pet_food_list } from "../assetsco/assets";
import { toast } from "react-toastify";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [ordersData, setOrdersData] = useState({});
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const url = "http://localhost:3000"; // backend URL
  const currency = "AED"; // or "$" depending on your setup
  const deliveryCharge = 30; // example value

  // NEW: token state (keeps token in sync with localStorage)
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  // --- Helpers (keep lists separate, but lookup when needed) ---
  const normalizeId = (v) => (v === undefined || v === null ? "" : String(v));

  // try food_list first, then pet_food_list
  const findItemById = (id) => {
    const nid = normalizeId(id);
    // search food_list (_id)
    const food = food_list.find((p) => normalizeId(p._id) === nid);
    if (food) return { source: "food", item: food };
    // search pet_food_list (id)
    const pet = pet_food_list.find((p) => normalizeId(p.id) === nid);
    if (pet) return { source: "pet", item: pet };
    return null;
  };

  const getPriceFrom = (item) => Number(item?.price ?? item?.food_price ?? 0);

  // --- Auth/login/register ---
  const loginUser = async (currState, data) => {
    try {
      const url =
        currState === "Login"
          ? "http://localhost:4000/api/user/login"
          : "http://localhost:4000/api/user/register";

      console.log("🔁 [StoreContext] sending to:", url, "payload:", data);

      const res = await axios.post(url, data, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true, // allow cookies/auth if backend uses them
      });

      console.log(
        "🔁 [StoreContext] axios res.status:",
        res.status,
        "data:",
        res.data
      );

      // Accept both token-in-body or cookie-based auth (token may be absent if HttpOnly cookie used)
      const responseData = res.data || {};
      const success = responseData.success === true || res.status === 200;

      if (success) {
        // If backend returned a token explicitly, store it
        if (responseData.token) {
          localStorage.setItem("token", responseData.token);
          setToken(responseData.token);
        } else {
          // no token in response — backend might be using HttpOnly cookie
          console.log(
            "🔁 [StoreContext] no token returned in body — assuming cookie-based auth (HttpOnly cookie)."
          );
        }

        // If backend returned user info, store it
        if (responseData.user) {
          localStorage.setItem("user", JSON.stringify(responseData.user));
          setUser(responseData.user);
          return { success: true, user: responseData.user };
        }

        // If no user in response but success, still return success
        return { success: true, message: "Logged in (no user returned)" };
      } else {
        console.log("🔁 [StoreContext] backend returned failure:", responseData);
        return {
          success: false,
          message: responseData?.message || "Unknown backend error",
        };
      }
    } catch (err) {
      console.error("🔴 [StoreContext] axios error:", err.response || err);
      const message =
        err.response?.data?.message || err.message || "Network/Server error";
      return { success: false, message };
    }
  };

  // --- Logout ---
  const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken(null);
    toast.info("Logged out");
  };

  // --- Cart functions ---
  const addToCart = (itemId) => {
    const id = normalizeId(itemId);
    setCartItems((prev) => ({
      ...prev,
      [id]: prev[id] ? prev[id] + 1 : 1,
    }));
  };

  const removeFromCart = (itemId) => {
    const id = normalizeId(itemId);
    setCartItems((prev) => {
      if (!prev[id]) return prev;
      if (prev[id] > 1) {
        return { ...prev, [id]: prev[id] - 1 };
      } else {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      }
    });
  };

  // remove whole item (helper for "remove all" / quick delete)
  const removeAllFromCart = (itemId) => {
    const id = normalizeId(itemId);
    setCartItems((prev) => {
      if (!prev[id]) return prev;
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
  };

  // optionally set quantity directly
  const setCartQuantity = (itemId, qty) => {
    const id = normalizeId(itemId);
    const q = Number(qty) || 0;
    setCartItems((prev) => {
      const copy = { ...prev };
      if (q <= 0) {
        delete copy[id];
      } else {
        copy[id] = q;
      }
      return copy;
    });
  };

  // compute total by looking up each cart key in the two lists (no combining)
  const getTotalCartAmount = () => {
    let totalAmount = 0;

    for (const [key, qty] of Object.entries(cartItems)) {
      if (!qty || qty <= 0) continue;
      const found = findItemById(key);
      if (!found) continue;
      const price = getPriceFrom(found.item);
      totalAmount += price * qty;
    }

    return totalAmount;
  };

  const placeOrder = (deliveryData) => {
    console.log("Order Data:", deliveryData);
    setOrdersData(deliveryData);
  };

  // context export (now includes token and setToken)
  const contextValue = {
    food_list,
    pet_food_list,
    menu_list,
    cartItems,
    addToCart,
    removeFromCart,
    removeAllFromCart,
    setCartQuantity,
    getTotalCartAmount,
    placeOrder,
    setCartItems,
    ordersData,
    loginUser,
    logoutUser,
    user,
    token,
    setToken,
    url,
    currency,
    deliveryCharge,
    // If you use url/currency/deliveryCharge in other places, keep them here too
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
