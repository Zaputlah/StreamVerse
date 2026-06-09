const Footer = () => {
    const services = [
        ["netflix.png", "Netflix"],
        ["youtube.png", "YouTube"],
        ["Spotify.png", "Spotify"],
        ["canva.webp", "Canva"],
        ["Disney.png", "Disney"],
        ["HBOGO.png", "HBO Go"],
        ["Capcut.png", "CapCut"],
        ["Vidio.png", "Vidio"],
    ];

    const payments = [
        ["Gopay.png", "GoPay"],
        ["dana.png", "DANA"],
        ["ovo.png", "OVO"],
        ["bri.png", "BRI"],
        ["bca.webp", "BCA"],
    ];

    return (
        <footer className="site-footer">
            <div className="page-container">
                <div className="footer__top">
                    <div className="footer__intro">
                        <a className="brand brand--footer" href="#">
                            <span className="brand__mark">Z</span>
                            <span>Zaputlah</span>
                        </a>
                        <p>Tempat praktis untuk menemukan akun premium dengan pilihan paket yang jelas.</p>
                    </div>

                    <div className="footer__services">
                        <p className="footer__label">Layanan tersedia</p>
                        <div className="logo-row">
                            {services.map(([image, name]) => (
                                <span className="logo-chip" key={name} title={name}>
                                    <img loading="lazy" src={`/img/${image}`} alt={name} />
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="footer__bottom">
                    <div className="payment-row" aria-label="Metode pembayaran">
                        <span>Bayar dengan</span>
                        {payments.map(([image, name]) => (
                            <img loading="lazy" src={`/img/${image}`} alt={name} key={name} />
                        ))}
                    </div>
                    <p>© {new Date().getFullYear()} Zaputlah</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
