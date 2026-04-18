import React, { createContext, useContext, useReducer, useCallback } from 'react';

const CartContext = createContext(null);

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find(
        (i) => i.id === action.item.id && i.restaurantId === action.item.restaurantId
      );
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.id === action.item.id && i.restaurantId === action.item.restaurantId
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        };
      }
      return {
        ...state,
        restaurantId: action.item.restaurantId,
        restaurantName: action.item.restaurantName,
        items: [...state.items, { ...action.item, quantity: 1 }],
      };
    }
    case 'REMOVE_ITEM': {
      const existing = state.items.find(
        (i) => i.id === action.id && i.restaurantId === action.restaurantId
      );
      if (!existing) return state;
      if (existing.quantity === 1) {
        const newItems = state.items.filter(
          (i) => !(i.id === action.id && i.restaurantId === action.restaurantId)
        );
        return {
          ...state,
          items: newItems,
          restaurantId: newItems.length === 0 ? null : state.restaurantId,
          restaurantName: newItems.length === 0 ? null : state.restaurantName,
        };
      }
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === action.id && i.restaurantId === action.restaurantId
            ? { ...i, quantity: i.quantity - 1 }
            : i
        ),
      };
    }
    case 'CLEAR_CART':
      return { items: [], restaurantId: null, restaurantName: null };
    default:
      return state;
  }
};

const initialState = {
  items: [],
  restaurantId: null,
  restaurantName: null,
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addItem = useCallback((item) => {
    dispatch({ type: 'ADD_ITEM', item });
  }, []);

  const removeItem = useCallback((id, restaurantId) => {
    dispatch({ type: 'REMOVE_ITEM', id, restaurantId });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' });
  }, []);

  const getItemQuantity = useCallback(
    (id, restaurantId) => {
      const item = state.items.find(
        (i) => i.id === id && i.restaurantId === restaurantId
      );
      return item ? item.quantity : 0;
    },
    [state.items]
  );

  const totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = state.items.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        ...state,
        addItem,
        removeItem,
        clearCart,
        getItemQuantity,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};
