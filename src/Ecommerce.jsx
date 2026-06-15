import { useEcommerce } from './useEcommerce';
import './Ecommerce.css';

import img0 from './assets/0.jpeg';
import img0b from './assets/0b.jpeg';
import img0c from './assets/0c.jpeg';

import img1 from './assets/1.jpeg';
import img1b from './assets/1b.jpeg';
import img1c from './assets/1c.jpeg';


import img2 from './assets/2.jpeg';
import img2b from './assets/2b.jpeg';
import img2c from './assets/2c.jpeg';

import img3 from './assets/3.jpeg';
import img3b from './assets/3b.jpeg';
import img3c from './assets/3c.jpeg';
import img3a from './assets/3a.jpeg';

import img4 from './assets/4.jpeg';
import img4b from './assets/4b.jpeg';
import img4c from './assets/4c.jpeg';
import img4a from './assets/4a.jpeg';

import img5 from './assets/5.jpeg';
import img5b from './assets/5b.jpeg';
import img5c from './assets/5c.jpeg';

import img6 from './assets/6.jpeg';
import img6b from './assets/6b.jpeg';
import img6c from './assets/6c.jpeg';

import img7 from './assets/7.jpeg';

import img8 from './assets/8.jpeg';
import img8b from './assets/8b.jpeg';
import img8c from './assets/8c.jpeg';

import img9 from './assets/9.jpeg';
import img9b from './assets/9b.jpeg';
import img9c from './assets/9c.jpeg';

import img10 from './assets/10.jpeg';
import img10b from './assets/10b.jpeg';

import img11 from './assets/11.jpeg';
import img11b from './assets/11b.jpeg';

import img12 from './assets/12.jpeg';
import img12b from './assets/12b.jpeg';
import img12c from './assets/12c.jpeg';

import img13 from './assets/13.jpeg';
import img13b from './assets/13b.jpeg';
import img13c from './assets/13c.jpeg';
import img13a from './assets/13a.jpeg';

import img14 from './assets/14.jpeg';
import img14b from './assets/14b.jpeg';

import img15 from './assets/15.jpeg';
import img15b from './assets/15b.jpeg';
import img15c from './assets/15c.jpeg';

import img16 from './assets/16.jpeg';


import img17 from './assets/17.jpeg';
import img17b from './assets/17b.jpeg';






// 2. BAZA DE DATE 
const RINGS_DATA = [
  {
    id: 0,
    name: "Night Flower Ring",
    cost: 1200,
    shortDescription: "Argint 925 cu pietre zirconia.",
    longDescription: "Un inel elegant cu detalii fine sub formă de floare, lucrat manual din argint pur 925 și încrustat cu cristale zirconia cubica strălucitoare.",
    images: [img0, img0b, img0c]
  },
  {
    id: 1,
    name: "Line of Love Ring",
    cost: 350,
    shortDescription: "Silver 925 cu design minimalist.",
    longDescription: "Design minimalist format dintr-o linie continuă de inimi discrete. Perfect pentru a fi purtat zi de zi.",
    images: [img1, img1b, img1c]
  },
  {
    id: 2,
    name: "Eternal Knot Ring",
    cost: 500,
    shortDescription: "Inel simbolic din argint 925 cu nod celtic.",
    longDescription: "Un inel simbolic care reprezintă legătura eternă și conexiunea profundă. Realizat din argint pur 925 și decorat cu un nod celtic intricately lucrat, acest inel este perfect pentru cei care apreciază simbolismul și designul detaliat.",
    images: [img2, img2b, img2c]
  },
  {
    id: 3,
    name: "Pure Red Ring",
    cost: 800,
    shortDescription: "Inel statement din argint 925 cu email roșu.",
    longDescription: "Un inel statement care adaugă un strop de culoare oricărei ținute. Realizat din argint pur 925 și decorat cu un email roșu vibrant, acest inel este perfect pentru cei care iubesc să iasă în evidență.",
    images: [img3, img3b, img3c, img3a]
  },
  {
    id: 4,
    name: "Green Elegance Ring",
    cost: 950,
    shortDescription: "Inel rafinat din argint 925 cu piatra verde smarald.",
    longDescription: "Un inel rafinat care adaugă un aer de eleganță oricărei ținute. Realizat din argint pur 925 și decorat cu o piatră verde smarald, acest inel este perfect pentru cei care apreciază frumusețea subtilă și detaliile fine.",
    images: [img4, img4b, img4c, img4a]
  },
  {
    id: 5,
    name: "Blue Serenity Ring",
    cost: 1100,
    shortDescription: "Inel elegant din argint 925 cu quarz albastru.",
    longDescription: "Un inel elegant care adaugă un aer de liniște oricărei ținute. Realizat din argint pur 925 și decorat cu un quarz albastru blând, acest inel este perfect pentru cei care caută armonie și simplitate.",
    images: [img5, img5b, img5c]
  },
  {
    id: 6,
    name: " Black Onyx Ring",
    cost: 1300,
    shortDescription: "Inel sofisticat din argint 925 cu onix negru.",
    longDescription: "Un inel sofisticat care adaugă un aer de mister oricărei ținute. Realizat din argint pur 925 și decorat cu o piatră onix neagră, acest inel este perfect pentru cei care iubesc eleganța întunecată și detaliile dramatice.",
    images: [img6, img6b, img6c]
  },

  {
    id: 7,
    name: "Purple Haze Ring",
    cost: 900,
    shortDescription: "Inel delicat din argint 925 cu email mov.",
    longDescription: "Un inel delicat care adaugă un aer de mister oricărei ținute. Realizat din argint pur 925 și decorat cu un email mov, acest inel este perfect pentru cei care iubesc eleganța subtilă și detaliile fine.",
    images: [img7]
  },



];
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
          Luxury Jewels💍
        </div>
        <div className="header-status">
          <span className="status-item" onClick={() => setCurrentView('wishlist')} style={{ cursor: 'pointer' }}>
            ❤️ Wishlist: <strong>{wishlist.length}</strong>
          </span>
          <span className="status-item" onClick={() => setCurrentView('cart')} style={{ cursor: 'pointer' }}>
            🛒 Coș: <strong>{totalItemsInCart} pr.</strong> ({totalPriceInCart} RON)
          </span>
        </div>
      </header>

      {/* PAGINA 1: DETALII PRODUS */}
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
                  Adaugă în coș 🛒
                </button>
                <button className="btn-wishlist-detail" onClick={() => toggleWishlist(selectedRing)}>
                  {wishlist.some(item => item.id === selectedRing.id) ? "❤️ În Wishlist" : "🤍 Adaugă la Wishlist"}
                </button>
              </div>

              <div className="back-button-container">
                <button className="btn-back" onClick={() => setCurrentView('shop')}>
                  ⬅️ Înapoi la Produse
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PAGINA 2: COȘUL DE CUMPĂRĂTURI */}
      {currentView === 'cart' && (
        <div className="cart-page">
          <h2>Coșul tău de cumpărături 🛒</h2>

          {cart.length === 0 ? (
            <p className="empty-msg">Coșul tău este gol deocamdată.</p>
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
                <h3>Sumar Comandă</h3>
                <div className="summary-row"><span>Produse totale:</span> <strong>{totalItemsInCart}</strong></div>
                <div className="summary-row total"><span>Total de plată:</span> <strong>{totalPriceInCart} RON</strong></div>
                <button className="btn-checkout" onClick={() => alert('Comandă realizată!')}>Finalizează Comanda ✨</button>
              </div>
            </div>
          )}
          <div className="back-button-container">
            <button className="btn-back" onClick={() => setCurrentView('shop')}>⬅️ Continuă Cumpărăturile</button>
          </div>
        </div>
      )}

      {/* PAGINA 3: WISHLIST */}
      {currentView === 'wishlist' && (
        <div className="wishlist-page">
          <h2>Produsele tale favorite ❤️</h2>

          {wishlist.length === 0 ? (
            <p className="empty-msg">Nu ai adăugat niciun produs la favorite încă.</p>
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
            <button className="btn-back" onClick={() => setCurrentView('shop')}>⬅️ Înapoi la Magazin</button>
          </div>
        </div>
      )}

      {/* PAGINA 4: GRILA PRINCIPALĂ A MAGAZINULUI */}
      {currentView === 'shop' && (
        <div className="main-shop-page">
          <h2>Colecția de Inele</h2>
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