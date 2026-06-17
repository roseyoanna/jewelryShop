const CART_KEY = 'ecommerce_cart';
const WISHLIST_KEY = 'ecommerce_wishlist';
const VIEW_KEY = 'ecommerce_view';
const SELECTED_KEY = 'ecommerce_selected';
const ACTIVE_IMAGE_KEY = 'ecommerce_active_image';

const safeJSONParse = (value, fallback) => {
  try {
    return value ? JSON.parse(value) : fallback;
  } catch (error) {
    console.warn('storage parse failed', error);
    return fallback;
  }
};

export const loadCart = () => {
  if (typeof window === 'undefined') return [];
  return safeJSONParse(localStorage.getItem(CART_KEY), []);
};

export const saveCart = (cart) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch (error) {
    console.warn('storage saveCart failed', error);
  }
};

export const loadWishlist = () => {
  if (typeof window === 'undefined') return [];
  return safeJSONParse(localStorage.getItem(WISHLIST_KEY), []);
};

export const saveWishlist = (wishlist) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
  } catch (error) {
    console.warn('storage saveWishlist failed', error);
  }
};

export const clearStorage = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(CART_KEY);
  localStorage.removeItem(WISHLIST_KEY);
};

export const loadView = (fallback = 'shop') => {
  if (typeof window === 'undefined') return fallback;
  return safeJSONParse(localStorage.getItem(VIEW_KEY), fallback);
};

export const saveView = (view) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(VIEW_KEY, JSON.stringify(view));
  } catch (error) {
    console.warn('storage saveView failed', error);
  }
};

export const loadSelectedId = () => {
  if (typeof window === 'undefined') return null;
  return safeJSONParse(localStorage.getItem(SELECTED_KEY), null);
};

export const saveSelectedId = (id) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(SELECTED_KEY, JSON.stringify(id));
  } catch (error) {
    console.warn('storage saveSelectedId failed', error);
  }
};

export const loadActiveImage = () => {
  if (typeof window === 'undefined') return null;
  return safeJSONParse(localStorage.getItem(ACTIVE_IMAGE_KEY), null);
};

export const saveActiveImage = (imgUrl) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(ACTIVE_IMAGE_KEY, JSON.stringify(imgUrl));
  } catch (error) {
    console.warn('storage saveActiveImage failed', error);
  }
};
