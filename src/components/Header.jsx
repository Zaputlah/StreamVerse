const Header = () => {
    return (
        <header className="site-header">
            <div className="page-container site-header__inner">
                <a className="brand" href="#" aria-label="Zaputlah, kembali ke atas">
                    <span className="brand__mark">Z</span>
                    <span>Zaputlah</span>
                </a>

                <nav className="site-nav" aria-label="Navigasi utama">
                    <a href="#katalog">Katalog</a>
                    <a href="#cara-pesan">Cara pesan</a>
                </nav>

                <a className="header-cta" href="#katalog">
                    Cek harga
                    <svg viewBox="0 0 20 20" aria-hidden="true">
                        <path d="M4 10h12m-5-5 5 5-5 5" />
                    </svg>
                </a>
            </div>
        </header>
    );
};

export default Header;
