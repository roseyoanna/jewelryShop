import { useEcommerce } from './useEcommerce';
import { RINGS_DATA } from './dataRings';
import { BRACELETS_DATA } from './dataBracelets';
import { EARRINGS_DATA } from './dataEarrings';
import { useState } from 'react';
import './Ecommerce.css';
import bottleImg from './assets/17.jpeg';
import Home from './Home';

const ALL_PRODUCTS = [...RINGS_DATA, ...BRACELETS_DATA, ...EARRINGS_DATA];

function Ecommerce() {
  const {
    cart, setCart, wishlist, selectedProduct, activeImage, setActiveImage,
    currentView, setCurrentView, addToCart, decreaseQuantity, toggleWishlist,
    openDetails, totalItemsInCart, totalPriceInCart
  } = useEcommerce();

  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = ALL_PRODUCTS.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (product.shortDescription || '').toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredRings = filteredProducts.filter(p => RINGS_DATA.some(r => r.id === p.id));
  const filteredBracelets = filteredProducts.filter(p => BRACELETS_DATA.some(b => b.id === p.id));
  const filteredEarrings = filteredProducts.filter(p => EARRINGS_DATA.some(e => e.id === p.id));

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value !== '' && currentView !== 'shop') {
      setCurrentView('shop');
    }
  };
  const [showPopup, setShowPopup] = useState(false);
  const [popupMesg, setPopupMesg] = useState('');
  const handleAddToCartPopup = (product) => {
    addToCart(product);
    setPopupMesg('');
    setShowPopup(true);

    setTimeout(() => {
      setShowPopup(false);

    }, 2000);
  };

  const renderProductCard = (product) => {
    const isInWishlist = wishlist.some(item => item.id === product.id);
    return (
      <div key={product.id} className="card-product">
        <button className="card-wishlist-icon" onClick={() => toggleWishlist(product)}>
          {isInWishlist ? '❤️' : '🖤'}
        </button>
        <img src={product.images[0]} alt={product.name} className="product-image" />
        <h3>{product.name}</h3>
        <p className="short-desc">{product.shortDescription}</p>
        <span className="price">{product.cost} RON</span>
        <div className="card-buttons">
          <button className="btn-view" onClick={() => openDetails(product)}>View Product 👁️</button>
          <button className="btn-card-buy" onClick={() => handleAddToCartPopup(product)}>Buy 🛒</button>
        </div>
      </div>
    );
  };
  return (
    <div className="store-container">
      {currentView === 'home' && (<Home onViewChange={setCurrentView} />)}
      {showPopup && (
        <div className="cart-popup">
          <span className="popup-icon"><em>💍Added to🛒 </em></span> {popupMesg}
        </div>
      )}
      {currentView !== 'home' && (<>
        <header className="store-header">
          <div className="logo" onClick={() => setCurrentView('home')}>
            Luxury Jewels For You 💍
          </div>
        </header>
        <div className="store-header-row">
          <nav className="nav-menu-left">
            <span className={`nav-link ${currentView === 'home' ? 'active' : ''}`} onClick={() => setCurrentView('home')}>Home</span>
            <span className={`nav-link ${currentView === 'shop' ? 'active' : ''}`} onClick={() => setCurrentView('shop')}>Rings</span>
            <span className={`nav-link ${currentView === 'bracelets' ? 'active' : ''}`} onClick={() => setCurrentView('bracelets')}>Bracelets</span>
            <span className={`nav-link ${currentView === 'earrings' ? 'active' : ''}`} onClick={() => setCurrentView('earrings')}>Earrings</span>
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

        {currentView === 'details' && selectedProduct && (
          <div className="product-details-page">
            <button className="btn-back-to-shop" onClick={() => {
              if (RINGS_DATA.some(r => r.id === selectedProduct.id)) {
                setCurrentView('shop');
              } else if (BRACELETS_DATA.some(b => b.id === selectedProduct.id)) {
                setCurrentView('bracelets');
              } else if (EARRINGS_DATA.some(e => e.id === selectedProduct.id)) {
                setCurrentView('earrings');
              } else {
                setCurrentView('shop');

              }
            }}
            >
              🔙
            </button>
            <div className="details-content-layout">

              <div className="details-left-side">
                <div className="large-image-wrapper">
                  <img src={activeImage} alt={selectedProduct.name} className="detail-img-large" />
                </div>
                <div className="detail-thumbnails">
                  {selectedProduct.images.map((imgUrl, index) => (
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
                <h2>{selectedProduct.name}</h2>
                <p className="details-long-description">{selectedProduct.longDescription}</p>
                <span className="detail-price">{selectedProduct.cost} RON</span>

                <div className="details-actions">
                  <button className="btn-buy-now" onClick={() => handleAddToCartPopup(selectedProduct)}>
                    Add to Cart 🛒
                  </button>
                  <button className="btn-wishlist-detail" onClick={() => toggleWishlist(selectedProduct)}>
                    {wishlist.some(item => item.id === selectedProduct.id) ? "❤️ In Wishlist" : "💍 Add to Wishlist"}
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
                        <button className="btn-qty" onClick={() => handleAddToCartPopup(item)}>+</button>
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
                {wishlist.map((product) => (
                  <div key={product.id} className="wishlist-item-horizontal-row">
                    <img src={product.images[0]} alt={product.name} className="wishlist-row-img" />

                    <div className="wishlist-row-info">
                      <h4>{product.name}</h4>
                      <p>{product.shortDescription}</p>
                    </div>

                    <div className="wishlist-row-price">
                      <strong>{product.cost} RON</strong>
                    </div>

                    <div className="wishlist-row-actions">
                      <button className="btn-card-buy" onClick={() => handleAddToCartPopup(product)}>Buy 🛒</button>
                      <button className="btn-view" onClick={() => openDetails(product)}>View 👁️</button>
                      <button className="btn-row-remove" onClick={() => toggleWishlist(product)}>❌</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Products Pages  */}
        {currentView === 'shop' && (
          <div className="main-shop-page">
            <div className="list-products store">
              {filteredRings.length === 0 ? (
                <p className="empty-msg">No rings found matching your search.</p>
              ) : (
                filteredRings.map(rings => renderProductCard(rings))
              )}
            </div>
          </div>
        )}

        {currentView === 'bracelets' && (
          <div className='main-shop-page'>
            <div className='list-products store'>
              {filteredBracelets.length === 0 ? (
                <p className="empty-msg">No bracelets found matching yur search.</p>
              ) : (
                filteredBracelets.map(bracelets => renderProductCard(bracelets))
              )}
            </div>
          </div>
        )}
        {currentView === 'earrings' && (
          <div className='main-shop-page'>
            <div className='list-products store'>
              {filteredEarrings.length === 0 ? (
                <p className="empty-msg">No earrings found matching yur search</p>
              ) : (
                filteredEarrings.map(earrings => renderProductCard(earrings))
              )}
            </div>
          </div>
        )}

        {currentView === 'about' && (
          <div className="about-page">
            <div className="about-section flex-row">
              <div className="about-text">
                <h2>My Personal Collection of Jewelry</h2>
                <p>This collection is entirely private—personal, unique jewels accumulated over years of searching.
                  It is my absolute sanctuary of beauty, where every artifact stands as a testament to time and personal character.
                  Within my personal jewelry box rests a private history.</p>
                <p>These jewels are not merely kept in darkness, they are a living part of my daily life,
                  worn with deep affection and pride. Each piece has its own unique lineage, some were precious
                  gifts from unforgettable souls, while others were hard-won discoveries bought during my travels.
                  To wear them is to carry those moments with me, making this private collection a breathing archive
                  of my journey.</p>
                <p>Welcome to my absolute sanctuary of curation.
                  This space represents a lifetime love affair with silver engineering, timeless geometry, and complex mineralogy.
                  Among these rigid metallic forms, you might have also stumbled upon a peculiar bottle with a text resting quietly inside it.
                  Consider it an intentionally misplaced poetic relic, a metaphorical message cast into an ocean of structured design.</p>


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
              <p>Timeless personal collections and luxury artifacts.</p>
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
      </>
      )}
    </div>
  );
}

export default Ecommerce;