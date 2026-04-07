import { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

const initialProducts = [
  { id: 1, name: 'Fresh Tomatoes', price: 12, quantity: 50, category: 'Vegetables', farmerId: 'farmer_1', farmerName: 'Ramesh Farm', image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
  { id: 2, name: 'Organic Wheat', price: 40, quantity: 100, category: 'Grains', farmerId: 'farmer_2', farmerName: 'Suresh Naturals', image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
  { id: 3, name: 'Sweet Mangoes', price: 80, quantity: 20, category: 'Fruits', farmerId: 'farmer_1', farmerName: 'Ramesh Farm', image: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' }
];

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null); // null, { role: 'farmer', id: 'farmer_1', name: 'Ramesh Farm' }, { role: 'buyer', id: 'buyer_1', name: 'John Doe' }
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('farm2city_products');
    return saved ? JSON.parse(saved) : initialProducts;
  });
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('farm2city_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('farm2city_orders');
    return saved ? JSON.parse(saved) : [];
  });

  // Persist store to localStorage
  useEffect(() => {
    localStorage.setItem('farm2city_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('farm2city_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('farm2city_orders', JSON.stringify(orders));
  }, [orders]);

  const login = (role, name) => {
    setUser({
      role,
      id: `${role}_${Date.now()}`,
      name
    });
  };

  const logout = () => {
    setUser(null);
  };

  const addProduct = (productData) => {
    const newProduct = {
      ...productData,
      id: Date.now(),
      farmerId: user.id,
      farmerName: user.name
    };
    setProducts([...products, newProduct]);
  };

  const updateProduct = (id, updatedData) => {
    setProducts(products.map(p => p.id === id ? { ...p, ...updatedData } : p));
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item => item.id === product.id ? { ...item, cartQuantity: item.cartQuantity + 1 } : item));
    } else {
      setCart([...cart, { ...product, cartQuantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const placeOrder = () => {
    setOrders([...orders, { id: Date.now(), userId: user.id, items: [...cart], date: new Date().toISOString() }]);
    setCart([]);
  };

  return (
    <AppContext.Provider value={{
      user, login, logout,
      products, addProduct, updateProduct, deleteProduct,
      cart, addToCart, removeFromCart, placeOrder,
      orders
    }}>
      {children}
    </AppContext.Provider>
  );
};
