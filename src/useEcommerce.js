import { useState, useEffect } from 'react';
import { RINGS_DATA } from './dataRings';
import { BRACELETS_DATA } from './dataBracelets';
import { EARRINGS_DATA } from './dataEarrings';
import {
    loadCart,
    saveCart,
    loadWishlist,
    saveWishlist,
    loadView,
    saveView,
    loadSelectedId,
    saveSelectedId,
    loadActiveImage,
    saveActiveImage
} from './storage';

const ALL_PRODUCTS = [...RINGS_DATA, ...BRACELETS_DATA, ...EARRINGS_DATA];

export function useEcommerce() {

    const [cart, setCart] = useState(() => loadCart());
    const [wishlist, setWishlist] = useState(() => loadWishlist());
    const [selectedProduct, setSelectedProduct] = useState(() => {
        const selId = loadSelectedId();
        return selId != null ? ALL_PRODUCTS.find(p => p.id === selId) : null;
    });
    const [activeImage, setActiveImage] = useState(() => loadActiveImage() || null);
    const [currentView, setCurrentView] = useState(() => loadView('home'));
    const addToCart = (product) => {
        const existingItem = cart.find(item => item.id === product.id);
        if (existingItem) {
            setCart(cart.map(item =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            ));
        } else {
            setCart([...cart, { ...product, quantity: 1 }]);
        }
    };

    const decreaseQuantity = (productId) => {
        const targetItem = cart.find(item => item.id === productId);
        if (targetItem.quantity > 1) {
            setCart(cart.map(item =>
                item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
            ));
        } else {
            setCart(cart.filter(item => item.id !== productId));
        }
    };
    const toggleWishlist = (product) => {
        if (wishlist.some(item => item.id === product.id)) {
            setWishlist(wishlist.filter(item => item.id !== product.id));
        } else {
            setWishlist([...wishlist, product]);
        }
    };

    const openDetails = (product) => {
        setSelectedProduct(product);
        setActiveImage(product.images[0]);
        setCurrentView('details');
    };

    useEffect(() => {
        saveSelectedId(selectedProduct ? selectedProduct.id : null);
    }, [selectedProduct]);

    useEffect(() => {
        saveActiveImage(activeImage);
    }, [activeImage]);

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
        selectedProduct,
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