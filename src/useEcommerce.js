import { useState, useEffect } from 'react';
import { loadCart, saveCart, loadWishlist, saveWishlist, loadView, saveView } from './storage';

export function useEcommerce() {
    const [cart, setCart] = useState(() => loadCart());
    const [wishlist, setWishlist] = useState(() => loadWishlist());
    const [selectedRing, setSelectedRing] = useState(null);
    const [activeImage, setActiveImage] = useState(null);
    const [currentView, setCurrentView] = useState(() => loadView('shop'));

    const addToCart = (ring) => {
        const existingItem = cart.find(item => item.id === ring.id);
        if (existingItem) {
            setCart(cart.map(item =>
                item.id === ring.id ? { ...item, quantity: item.quantity + 1 } : item
            ));
        } else {
            setCart([...cart, { ...ring, quantity: 1 }]);
        }
    };

    const decreaseQuantity = (ringId) => {
        const targetItem = cart.find(item => item.id === ringId);
        if (targetItem.quantity > 1) {
            setCart(cart.map(item =>
                item.id === ringId ? { ...item, quantity: item.quantity - 1 } : item
            ));
        } else {
            setCart(cart.filter(item => item.id !== ringId));
        }
    };

    const toggleWishlist = (ring) => {
        if (wishlist.some(item => item.id === ring.id)) {
            setWishlist(wishlist.filter(item => item.id !== ring.id));
        } else {
            setWishlist([...wishlist, ring]);
        }
    };

    const openDetails = (ring) => {
        setSelectedRing(ring);
        setActiveImage(ring.images[0]);
        setCurrentView('details');
    };

    useEffect(() => {
        saveCart(cart);
    }, [cart]);

    useEffect(() => {
        saveWishlist(wishlist);
    }, [wishlist]);

    useEffect(() => {
        saveView(currentView);
    }, [currentView]);

    const totalItemsInCart = cart.reduce((total, item) => total + item.quantity, 0);
    const totalPriceInCart = cart.reduce((total, item) => total + (item.cost * item.quantity), 0);

    return {
        cart, setCart,
        wishlist,
        selectedRing,
        activeImage, setActiveImage,
        currentView, setCurrentView,
        addToCart,
        decreaseQuantity,
        toggleWishlist,
        openDetails,
        totalItemsInCart,
        totalPriceInCart
    };
}