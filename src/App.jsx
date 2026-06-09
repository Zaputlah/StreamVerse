import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import ProductList from './features/productlist/ProductList'

function App() {
  return (
    <div className="site-shell">
      <Header />
      <main>
        <section className="hero" aria-labelledby="hero-title">
          <div className="page-container hero__grid">
            <div className="hero__content">
              <p className="eyebrow">Langganan digital, tanpa ribet</p>
              <h1 id="hero-title">
                Semua hiburan favoritmu, <span>lebih terjangkau.</span>
              </h1>
              <p className="hero__description">
                Temukan paket streaming, musik, dan aplikasi premium.
                Cek harga dengan jelas, lalu pesan langsung lewat WhatsApp.
              </p>
              <div className="hero__actions">
                <a className="button button--primary" href="#katalog">
                  Lihat katalog
                  <svg viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M4 10h12m-5-5 5 5-5 5" />
                  </svg>
                </a>
                <a className="button button--text" href="#cara-pesan">
                  Cara pesan
                </a>
              </div>
              <div className="hero__notes" aria-label="Keunggulan layanan">
                <span>20+ layanan</span>
                <span>Harga transparan</span>
                <span>Pesan via WhatsApp</span>
              </div>
            </div>

            <aside className="hero-card" aria-label="Ringkasan cara berbelanja">
              <div className="hero-card__top">
                <span className="status-dot" />
                <span>Katalog aktif</span>
                <span className="hero-card__date">Update berkala</span>
              </div>
              <div className="hero-card__body">
                <p>Pilih sesuai kebutuhan</p>
                <strong>Streaming, musik, sampai tools kreatif.</strong>
                <div className="service-stack" aria-hidden="true">
                  {['netflix.png', 'Spotify.png', 'canva.webp', 'youtube.png'].map((image) => (
                    <span key={image}>
                      <img src={`/img/${image}`} alt="" />
                    </span>
                  ))}
                  <span className="service-stack__more">+19</span>
                </div>
              </div>
              <div className="hero-card__footer">
                <span>Mulai dari</span>
                <strong>Rp5.000</strong>
              </div>
            </aside>
          </div>
        </section>

        <section className="steps" id="cara-pesan" aria-labelledby="steps-title">
          <div className="page-container">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Cara pesan</p>
                <h2 id="steps-title">Tiga langkah, langsung beres.</h2>
              </div>
            </div>
            <div className="steps__grid">
              <article>
                <span>01</span>
                <h3>Pilih layanan</h3>
                <p>Cari aplikasi yang kamu butuhkan dari katalog.</p>
              </article>
              <article>
                <span>02</span>
                <h3>Tentukan paket</h3>
                <p>Bandingkan durasi dan tipe akun yang tersedia.</p>
              </article>
              <article>
                <span>03</span>
                <h3>Pesan via WhatsApp</h3>
                <p>Detail pesanan otomatis tersusun dan siap dikirim.</p>
              </article>
            </div>
          </div>
        </section>

        <ProductList />
      </main>
      <Footer />
    </div>
  )
}

export default App
