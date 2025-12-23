
import { createContext, useState } from "react";
import axios from "axios";
import { food_list, menu_list, pet_food_list } from "../assets/assets";
import { toast } from "react-toastify";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [ordersData, setOrdersData] = useState({});
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const url = "http://localhost:3000"; //backend URL
  const currency = "AED"; 
  const deliveryCharge = 30; 

  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const normalizeId = (v) => (v === undefined || v === null ? "" : String(v));

  const findItemById = (id) => {
    const nid = normalizeId(id);
    const food = food_list.find((p) => normalizeId(p._id) === nid);
    if (food) return { source: "food", item: food };
    const pet = pet_food_list.find((p) => normalizeId(p.id) === nid);
    if (pet) return { source: "pet", item: pet };
    return null;
  };

  const getPriceFrom = (item) => Number(item?.price ?? item?.food_price ?? 0);

  const loginUser = async (currState, data) => {
    try {

      const endpoint =
        currState === "Login"
          ? `${url}/api/user/login`
          : `${url}/api/user/register`;

      console.log("🔁 [StoreContext] sending to:", endpoint, "payload:", data);

      const res = await axios.post(endpoint, data, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true, 
      });

      console.log(
        "🔁 [StoreContext] axios res.status:",
        res.status,
        "data:",
        res.data
      );

      const responseData = res.data || {};
      const success = responseData.success === true || res.status === 200;

      if (success) {
        if (responseData.token) {
          localStorage.setItem("token", responseData.token);
          setToken(responseData.token);
        }

        if (responseData.user) {
          localStorage.setItem("user", JSON.stringify(responseData.user));
          setUser(responseData.user);
          return { success: true, user: responseData.user };
        }

        return { success: true, message: "Logged in" };
      } else {
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

  const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken(null);
    toast.info("Logged out");
  };

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

  const removeAllFromCart = (itemId) => {
    const id = normalizeId(itemId);
    setCartItems((prev) => {
      if (!prev[id]) return prev;
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
  };

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
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
