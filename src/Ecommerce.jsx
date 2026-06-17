import { useEcommerce } from './useEcommerce';
import { RINGS_DATA } from './dataRings';
import { useState } from 'react';
import './Ecommerce.css';
import bottleImg from './assets/17.jpeg';

function Ecommerce() {
  const {
    cart, setCart, wishlist, selectedRing, activeImage, setActiveImage,
    currentView, setCurrentView, addToCart, decreaseQuantity, toggleWishlist,
    openDetails, totalItemsInCart, totalPriceInCart
  } = useEcommerce();

  const [searchQuery, setSearchQuery] = useState('');
  const collectionRings = RINGS_DATA.slice(0, 6);
  const filteredRings = RINGS_DATA.filter(ring =>
    ring.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (ring.shortDescription || '').toLowerCase().includes(searchQuery.toLowerCase())
  );
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value !== '' && currentView !== 'shop' && currentView !== 'collection') {
      setCurrentView('shop');
    }
  };

  return (
    <div className="store-container">

      <header className="store-header">
        <div className="logo" onClick={() => { setSearchQuery(''); setCurrentView('shop'); }}>
          Luxury Jewels For You 💍
        </div>
      </header>

      <div className="store-header-row">
        <nav className="nav-menu-left">
          <span className={`nav-link ${currentView === 'shop' ? 'active' : ''}`} onClick={() => setCurrentView('shop')}>Home</span>
          <span className={`nav-link ${currentView === 'collection' ? 'active' : ''}`} onClick={() => setCurrentView('collection')}>Jewelry Collection</span>
          <span className={`nav-link ${currentView === 'about' ? 'active' : ''}`} onClick={() => setCurrentView('about')}>About</span>
        </nav>

        <div className="search-bar">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search jewels..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>

        <div className="header-actions">
          <button className="status-item-btn" onClick={() => setCurrentView('wishlist')} title="Wishlist">
            <span className="icon">❤️</span>
            <span className="badge">{wishlist.length}</span>
          </button>
          <button className="status-item-btn" onClick={() => setCurrentView('cart')} title="Cart">
            <span className="icon">🛒</span>
            <span className="badge">{totalItemsInCart}</span>
          </button>
        </div>
      </div>

      {currentView === 'details' && selectedRing && (
        <div className="product-details-page">
          <div className="details-content-layout">

            <div className="details-left-side">
              <div className="large-image-wrapper">
                <img src={activeImage} alt={selectedRing.name} className="detail-img-large" />
              </div>
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

            <div className="details-right-side">
              <h2>{selectedRing.name}</h2>
              <p className="details-long-description">{selectedRing.longDescription}</p>
              <span className="detail-price">{selectedRing.cost} RON</span>

              <div className="details-actions">
                <button className="btn-buy-now" onClick={() => addToCart(selectedRing)}>
                  Add to Cart 🛒
                </button>
                <button className="btn-wishlist-detail" onClick={() => toggleWishlist(selectedRing)}>
                  {wishlist.some(item => item.id === selectedRing.id) ? "❤️ In Wishlist" : "💍 Add to Wishlist"}
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
            <div className="cart-main-layout">
              <div className="cart-items-list-wrapper">
                {cart.map((item) => (
                  <div key={item.id} className="cart-item-horizontal-row">
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
                      <strong>{item.cost * item.quantity} RON</strong>
                      {item.quantity > 1 && <span className="price-per-unit">({item.cost} RON)</span>}
                    </div>

                    <button className="btn-row-remove" onClick={() => setCart(cart.filter(c => c.id !== item.id))}>❌</button>
                  </div>
                ))}
              </div>

              <div className="cart-summary-box">
                <h3>Order Summary</h3>
                <div className="summary-row"><span>Total Products:</span> <strong>{totalItemsInCart}</strong></div>
                <div className="summary-row total"><span>Total Amount:</span> <strong>{totalPriceInCart} RON</strong></div>
                <button className="btn-checkout" onClick={() => alert('Order placed!')}>Place Order ✨</button>
              </div>
            </div>
          )}
        </div>
      )}

      {currentView === 'wishlist' && (
        <div className="wishlist-page">
          <h2>Your Favorite Products ❤️</h2>
          {wishlist.length === 0 ? (
            <p className="empty-msg">You haven't added any products to your favorites yet.</p>
          ) : (
            <div className="wishlist-items-list-wrapper">
              {wishlist.map((ring) => (
                <div key={ring.id} className="wishlist-item-horizontal-row">
                  <img src={ring.images[0]} alt={ring.name} className="wishlist-row-img" />

                  <div className="wishlist-row-info">
                    <h4>{ring.name}</h4>
                    <p>{ring.shortDescription}</p>
                  </div>

                  <div className="wishlist-row-price">
                    <strong>{ring.cost} RON</strong>
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
        </div>
      )}

      {/* PAGINA PRINCIPALĂ MAGAZIN (HOME) */}
      {currentView === 'shop' && (
        <div className="main-shop-page">
          <div className="list-products store">
            {filteredRings.length === 0 ? (
              <p className="empty-msg">No products found matching your search.</p>
            ) : (
              filteredRings.map((ring) => {
                const isInWishlist = wishlist.some(item => item.id === ring.id);
                return (
                  <div key={ring.id} className="card-product">
                    <button className="card-wishlist-icon" onClick={() => toggleWishlist(ring)}>
                      {isInWishlist ? '❤️' : '🖤'}  {/*🤎💛🧡🩵*/}
                    </button>
                    <img src={ring.images[0]} alt={ring.name} className="product-image" />
                    <h3>{ring.name}</h3>
                    <p className="short-desc">{ring.shortDescription}</p>
                    <span className="price">{ring.cost} RON</span>
                    <div className="card-buttons">
                      <button className="btn-view" onClick={() => openDetails(ring)}>View Product 👁️</button>
                      <button className="btn-card-buy" onClick={() => addToCart(ring)}>Buy 🛒</button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* PAGINA DEDICATĂ COLECȚIEI (6 PRODUSE) */}
      {currentView === 'collection' && (
        <div className="collection-page">
          <div className="collection-intro">
            <h2>The Signature Selection</h2>
            <p>A handpicked preview of our 6 most extraordinary and breathtaking ring configurations.</p>
          </div>
          <div className="list-products store">
            {collectionRings.map((ring) => {
              const isInWishlist = wishlist.some(item => item.id === ring.id);
              return (
                <div key={ring.id} className="card-product">
                  <button className="card-wishlist-icon" onClick={() => toggleWishlist(ring)}>
                    {isInWishlist ? '❤️' : '🖤'}
                  </button>
                  <img src={ring.images[0]} alt={ring.name} className="product-image" />
                  <h3>{ring.name}</h3>
                  <p className="short-desc">{ring.shortDescription}</p>
                  <span className="price">{ring.cost} RON</span>
                  <div className="card-buttons">
                    <button className="btn-view" onClick={() => openDetails(ring)}>View Product 👁️</button>
                    <button className="btn-card-buy" onClick={() => addToCart(ring)}>Buy 🛒</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* PAGINA ABOUT MY COLLECTION */}
      {currentView === 'about' && (
        <div className="about-page">
          <div className="about-section flex-row">
            <div className="about-text">
              <h2>About My Personal Collection</h2>
              <p>Welcome to my absolute sanctuary of curation. This space represents a lifetime love affair with silver engineering, timeless geometry, and complex mineralogy.</p>
              <p>Among these rigid metallic forms, you might have also stumbled upon a peculiar bottle with a text resting quietly inside it. Consider it an intentionally misplaced poetic relic—a metaphorical message cast into an ocean of structured design.</p>
              <h3>About Our Jewelry</h3>
              <p>Each piece is thoughtfully crafted to balance artistry and wearability. We combine traditional techniques with contemporary design to create jewelry that tells a story and stands the test of time. Whether you seek subtle elegance or a bold statement, our collection celebrates individuality and enduring craftsmanship.</p>
              <p>We source materials responsibly whenever possible, favoring recycled metals and ethically mined stones. Our makers pay attention to every detail — finishes are hand-polished and settings are double-checked for longevity.</p>
              <p>Browse slowly and let each design speak to you; if you have custom ideas or requests, reach out and we'll collaborate to bring a unique piece into being.</p>
            </div>
            <div className="about-image-wrapper">
              <img src={bottleImg} alt="Poetic Relic Bottle" className="about-side-img" />
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="store-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <h3>Luxury Jewels For You 💍</h3>
            <p>Timeless statements, curated personal collections and rigid luxury artifacts.</p>
          </div>
          <div className="footer-contact">
            <h4>Contact Inquiries</h4>
            <p><span className="footer-icon">💌</span> info@luxuryjewels.com</p>
          </div>
        </div>
        <div className="footer-bottom">
          &copy; 2026 Luxury Jewels For You. All Rights Reserved.
        </div>
      </footer>

    </div>
  );
}

export default Ecommerce;