import { useEffect, useMemo, useState } from "react";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [query, setQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("Semua");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("/pricelist.json");
                if (!response.ok) {
                    throw new Error("Gagal memuat katalog");
                }
                const data = await response.json();
                setProducts(data);
            } catch (fetchError) {
                console.error(fetchError);
                setError("Katalog belum bisa dimuat. Silakan coba lagi sebentar.");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        if (!selectedProduct) return undefined;

        const handleKeyDown = (event) => {
            if (event.key === "Escape") setSelectedProduct(null);
        };

        document.body.classList.add("modal-open");
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.classList.remove("modal-open");
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [selectedProduct]);

    const categories = useMemo(
        () => ["Semua", ...new Set(products.map((product) => product.jenis))],
        [products]
    );

    const visibleProducts = useMemo(() => {
        const normalizedQuery = query.trim().toLowerCase();

        return products.filter((product) => {
            const matchesCategory =
                activeCategory === "Semua" || product.jenis === activeCategory;
            const searchableText = [
                product.title,
                product.jenis,
                ...Object.keys(product.category),
            ].join(" ").toLowerCase();

            return matchesCategory && searchableText.includes(normalizedQuery);
        });
    }, [activeCategory, products, query]);

    const parsePrice = (price) => {
        if (typeof price === "number") return price;
        const normalized = String(price).toLowerCase().replace(",", ".");
        const number = Number.parseFloat(normalized.replace(/[^\d.]/g, ""));
        return normalized.includes("k") ? number * 1000 : number;
    };

    const formatPrice = (price) => {
        const numericPrice = parsePrice(price);
        if (Number.isNaN(numericPrice)) return price;
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0,
        }).format(numericPrice);
    };

    const getStartingPrice = (product) => {
        const prices = Object.values(product.category)
            .map(parsePrice)
            .filter((price) => !Number.isNaN(price));
        return prices.length ? Math.min(...prices) : null;
    };

    const getImageSrc = (image) => image.replace(/^\.\./, "");

    const handleClickBuy = (product, packageName, packagePrice) => {
        const message = `Halo Zaputlah, saya ingin pesan ${product.title} - ${packageName} (${formatPrice(packagePrice)}). Apakah masih tersedia?`;
        const whatsappLink = `https://wa.me/6281315025649?text=${encodeURIComponent(message)}`;
        window.open(whatsappLink, "_blank", "noopener,noreferrer");
    };

    return (
        <section className="catalog" id="katalog" aria-labelledby="catalog-title">
            <div className="page-container">
                <div className="section-heading catalog__heading">
                    <div>
                        <p className="eyebrow">Katalog</p>
                        <h2 id="catalog-title">Pilih yang lagi kamu butuhkan.</h2>
                    </div>
                    <p>
                        Harga dan paket ditampilkan apa adanya. Klik produk untuk
                        melihat pilihan lengkap.
                    </p>
                </div>

                <div className="catalog-toolbar">
                    <label className="search-box">
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                            <circle cx="11" cy="11" r="7" />
                            <path d="m20 20-4-4" />
                        </svg>
                        <span className="sr-only">Cari layanan</span>
                        <input
                            type="search"
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
                            placeholder="Cari Netflix, Canva, Spotify..."
                        />
                    </label>

                    <div className="category-filter" aria-label="Filter kategori">
                        {categories.map((category) => (
                            <button
                                className={activeCategory === category ? "is-active" : ""}
                                key={category}
                                type="button"
                                onClick={() => setActiveCategory(category)}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {!isLoading && !error && (
                    <p className="catalog-count">
                        Menampilkan <strong>{visibleProducts.length}</strong> layanan
                    </p>
                )}

                {isLoading && (
                    <div className="product-grid" aria-label="Memuat katalog">
                        {Array.from({ length: 8 }, (_, index) => (
                            <div className="product-card product-card--skeleton" key={index}>
                                <span />
                                <span />
                                <span />
                            </div>
                        ))}
                    </div>
                )}

                {error && <div className="catalog-message">{error}</div>}

                {!isLoading && !error && visibleProducts.length === 0 && (
                    <div className="catalog-message">
                        <strong>Belum ketemu.</strong>
                        <span>Coba kata kunci lain atau pilih kategori Semua.</span>
                    </div>
                )}

                {!isLoading && !error && visibleProducts.length > 0 && (
                    <div className="product-grid">
                        {visibleProducts.map((product) => {
                            const startingPrice = getStartingPrice(product);

                            return (
                                <button
                                    key={product.id}
                                    className="product-card"
                                    type="button"
                                    onClick={() => setSelectedProduct(product)}
                                    aria-label={`Lihat paket ${product.title}`}
                                >
                                    <span className="product-card__visual">
                                        <img src={getImageSrc(product.image)} alt="" />
                                        <span className="product-card__category">{product.jenis}</span>
                                    </span>
                                    <span className="product-card__content">
                                        <span className="product-card__name">{product.title}</span>
                                        <span className="product-card__options">
                                            {Object.keys(product.category).length} pilihan paket
                                        </span>
                                        <span className="product-card__bottom">
                                            <span>
                                                <small>Mulai</small>
                                                <strong>
                                                    {startingPrice ? formatPrice(startingPrice) : "Cek harga"}
                                                </strong>
                                            </span>
                                            <span className="product-card__arrow">
                                                <svg viewBox="0 0 20 20" aria-hidden="true">
                                                    <path d="M4 10h12m-5-5 5 5-5 5" />
                                                </svg>
                                            </span>
                                        </span>
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                )}
            </div>

            {selectedProduct && (
                <div
                    className="modal-backdrop"
                    onMouseDown={(event) => {
                        if (event.target === event.currentTarget) setSelectedProduct(null);
                    }}
                >
                    <section
                        className="product-modal"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="product-modal-title"
                    >
                        <button
                            className="modal-close"
                            type="button"
                            onClick={() => setSelectedProduct(null)}
                            aria-label="Tutup detail produk"
                        >
                            <svg viewBox="0 0 20 20" aria-hidden="true">
                                <path d="m5 5 10 10M15 5 5 15" />
                            </svg>
                        </button>

                        <div className="product-modal__header">
                            <span className="product-modal__logo">
                                <img src={getImageSrc(selectedProduct.image)} alt="" />
                            </span>
                            <div>
                                <span className="product-modal__category">
                                    {selectedProduct.jenis}
                                </span>
                                <h2 id="product-modal-title">{selectedProduct.title}</h2>
                                <p>Pilih paket yang paling sesuai untukmu.</p>
                            </div>
                        </div>

                        <div className="package-list">
                            {Object.entries(selectedProduct.category).map(([name, price]) => (
                                <div className="package-item" key={name}>
                                    <div>
                                        <span>{name}</span>
                                        <strong>{formatPrice(price)}</strong>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => handleClickBuy(selectedProduct, name, price)}
                                    >
                                        Pilih
                                        <svg viewBox="0 0 20 20" aria-hidden="true">
                                            <path d="M4 10h12m-5-5 5 5-5 5" />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                        </div>

                        <p className="product-modal__note">
                            Kamu akan diarahkan ke WhatsApp untuk konfirmasi ketersediaan.
                        </p>
                    </section>
                </div>
            )}
        </section>
    );
};

export default ProductList;
