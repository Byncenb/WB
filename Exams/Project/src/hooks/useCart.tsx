import { useState, useEffect } from 'react';
import { SnippetInfo } from '../types/types';

export const useCart = () => {

    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    // Синхронизация состояния корзины с localStorage
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product: SnippetInfo) => {
        const existingItem = cartItems.find((item: SnippetInfo) => item.id === product.id);
        if (existingItem) {
            setCartItems((prevCart: SnippetInfo[]) =>
                prevCart.map((item: SnippetInfo) =>
                    item.id === product.id
                        ? { ...item, quantity: (item?.quantity || 0) + 1 }
                        : item
                )
            );
        } else {
            setCartItems((prevCart: SnippetInfo[]) => [...prevCart, { ...product, quantity: 1 }]);
        }
    };

    // Функция для удаления товара из корзины
    const removeFromCart = (productId: number) => {
        setCartItems((prevCart: SnippetInfo[]) =>
            prevCart.filter((item) => item.id !== productId)
        );
    };

    return {
        cartItems,
        addToCart,
        removeFromCart,
    };
};