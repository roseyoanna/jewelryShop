import { useEcommerce } from './useEcommerce';
import { RINGS_DATA } from './dataRings';
import './Ecommerce.css';

function Ecommerce() {
  const {
    cart, setCart, wishlist, selectedRing, activeImage, setActiveImage,
    currentView, setCurrentView, addToCart, decreaseQuantity, toggleWishlist,
    openDetails, totalItemsInCart, totalPriceInCart
  } = useEcommerce();

  return (
    <div className="store-container">

      <header className="store-header">
        <div className="logo" onClick={() => setCurrentView('shop')} style={{ cursor: 'pointer' }}>
          Luxury Jewels 💍
        </div>
        <div className="header-status">
          <span className="status-item" onClick={() => setCurrentView('wishlist')} style={{ cursor: 'pointer' }}>
            ❤️ Wishlist: <strong>{wishlist.length}</strong>
          </span>
          <span className="status-item" onClick={() => setCurrentView('cart')} style={{ cursor: 'pointer' }}>
            🛒 Cart: <strong>{totalItemsInCart} pr.</strong> ({totalPriceInCart} RON)
          </span>
        </div>
      </header>

      {currentView === 'details' && selectedRing && (
        <div className="product-details-page">
          <div className="details-content">
            <div className="details-images">
              <img src={activeImage} alt={selectedRing.name} className="detail-img-large" />
              <div className="detail-thumbnails">
                {selectedRing.images.map((imgUrl, index) => (
                  <img
                    key={index}
                    src={imgUrl}
                    alt="thumbnail"
                    className={`detail-img-small ${activeImage === imgUrl ? 'active-thumb' : ''}`}
                    onClick={() => setActiveImage(imgUrl)}
                  />
                ))}
              </div>
            </div>

            <div className="details-info">
              <h2>{selectedRing.name}</h2>
              <p className="details-long-description">{selectedRing.longDescription}</p>
              <span className="detail-price">{selectedRing.cost} RON</span>

              <div className="details-actions">
                <button className="btn-buy-now" onClick={() => addToCart(selectedRing)}>
                  Add to Cart 🛒
                </button>
                <button className="btn-wishlist-detail" onClick={() => toggleWishlist(selectedRing)}>
                  {wishlist.some(item => item.id === selectedRing.id) ? "❤️ In Wishlist" : "🤍 Add to Wishlist"}
                </button>
              </div>

              <div className="back-button-container">
                <button className="btn-back" onClick={() => setCurrentView('shop')}>
                  ⬅️ Back to Main Page
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {currentView === 'cart' && (
        <div className="cart-page">
          <h2>Cart 🛒</h2>

          {cart.length === 0 ? (
            <p className="empty-msg">Your cart is empty for now.</p>
          ) : (
            <div className="cart-container">
              <div className="cart-items-list">
                {cart.map((item) => (
                  <div key={item.id} className="cart-item-row">
                    <img src={item.images[0]} alt={item.name} className="cart-row-img" />

                    <div className="cart-row-info">
                      <h4>{item.name}</h4>
                      <p>{item.shortDescription}</p>
                    </div>

                    <div className="cart-row-quantity">
                      <button className="btn-qty" onClick={() => decreaseQuantity(item.id)}>-</button>
                      <span className="qty-number">{item.quantity}</span>
                      <button className="btn-qty" onClick={() => addToCart(item)}>+</button>
                    </div>

                    <div className="cart-row-price">
                      {item.cost * item.quantity} RON
                      {item.quantity > 1 && <span className="price-per-unit">({item.cost} RON/buc)</span>}
                    </div>

                    <button className="btn-row-remove" onClick={() => setCart(cart.filter(c => c.id !== item.id))}>❌</button>
                  </div>
                ))}
              </div>

              <div className="cart-summary">
                <h3>Order Summary</h3>
                <div className="summary-row"><span>Total Products:</span> <strong>{totalItemsInCart}</strong></div>
                <div className="summary-row total"><span>Total Amount:</span> <strong>{totalPriceInCart} RON</strong></div>
                <button className="btn-checkout" onClick={() => alert('Order placed!')}>Place Order ✨</button>
              </div>
            </div>
          )}
          <div className="back-button-container">
            <button className="btn-back" onClick={() => setCurrentView('shop')}>⬅️ Back to Main Page</button>
          </div>
        </div>
      )}

      {currentView === 'wishlist' && (
        <div className="wishlist-page">
          <h2>Your Favorite Products ❤️</h2>

          {wishlist.length === 0 ? (
            <p className="empty-msg">You haven't added any products to your favorites yet.</p>
          ) : (
            <div className="wishlist-items-list">
              {wishlist.map((ring) => (
                <div key={ring.id} className="wishlist-item-row">
                  <img src={ring.images[0]} alt={ring.name} className="wishlist-row-img" />

                  <div className="wishlist-row-info">
                    <h4>{ring.name}</h4>
                    <span className="wishlist-row-price">{ring.cost} RON</span>
                  </div>

                  <div className="wishlist-row-actions">
                    <button className="btn-card-buy" onClick={() => addToCart(ring)}>Buy 🛒</button>
                    <button className="btn-view" onClick={() => openDetails(ring)}>View 👁️</button>
                    <button className="btn-row-remove" onClick={() => toggleWishlist(ring)}>❌</button>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="back-button-container">
            <button className="btn-back" onClick={() => setCurrentView('shop')}>⬅️ Back to Main Page</button>
          </div>
        </div>
      )}

      {currentView === 'shop' && (
        <div className="main-shop-page">
          <h2>Jewelry Collection 💍</h2>
          <div className="list-products store">
            {RINGS_DATA.map((ring) => {
              const isInWishlist = wishlist.some(item => item.id === ring.id);
              return (
                <div key={ring.id} className="card-product">
                  <button className="card-wishlist-icon" onClick={() => toggleWishlist(ring)}>
                    {isInWishlist ? '❤️' : '🤍'}
                  </button>
                  <img src={ring.images[0]} alt={ring.name} className="product-image" />
                  <h3>{ring.name}</h3>
                  <p className="short-desc">{ring.shortDescription}</p>
                  <span className="price">{ring.cost} RON</span>
                  <div className="card-buttons">
                    <button className="btn-view" onClick={() => openDetails(ring)}>
                      View Product 👁️
                    </button>
                    <button className="btn-card-buy" onClick={() => addToCart(ring)}>
                      Buy 🛒
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
}

export default Ecommerce;