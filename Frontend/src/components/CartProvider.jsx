import { createContext, useContext, useReducer } from "react";

// Create Contexts
const cartContext = createContext(null);
const dispatchContext = createContext(null);

// Reducer function
const reducer = (state, action) => {
    switch (action.type) {
        case "ADD_TO_CART": {
            const isExist = state.find((item) => item.id === action.payload.id);
            if (isExist) {
                return state.map((item) => {
                    if (item.id === action.payload.id) {
                        return { ...item, ...action.payload };
                    }
                    return item;
                });
            } else {
                return [...state, action.payload];
            }
        }

        case "REMOVE_FROM_CART":
            return state.filter((item) => item.id !== action.payload);

        case "INCREASE_QTY":
            return state.map((item) => {
                if (item.id === action.payload) {
                    return { ...item, qty: item.qty + 1, total: item.total + item.price };
                }
                return item;
            });

        case "DECREASE_QTY":
            return state.map((item) => {
                if (item.id === action.payload) {
                    if (item.qty > 1) {
                        return { ...item, qty: item.qty - 1, total: item.total - item.price };
                    }
                    return item;
                }
                return item;
            });

        default:
            return state;
    }
};

// Provider component
export const CartProvider = ({ children }) => {
    const [cart, dispatch] = useReducer(reducer, []);
    return (
        <cartContext.Provider value={cart}>
            <dispatchContext.Provider value={dispatch}>
                {children}
            </dispatchContext.Provider>
        </cartContext.Provider>
    );
};

// Custom hooks
export const useCart = () => useContext(cartContext);
export const useDispatch = () => useContext(dispatchContext);
