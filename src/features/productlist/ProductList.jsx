import { useState, useEffect } from "react";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const response = await fetch("/pricelist.json");
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const handleProductClick = (product) => {
        setSelectedProduct(product);
    };

    const handleCloseOverlay = (event) => {
    // Pastikan tombol close tidak dianggap sebagai bagian dari area luar
    if (event.target === event.currentTarget) {
        setSelectedProduct(null);
    }
};

    const handleClosePopup = () => {
        setSelectedProduct(null);
    };

    const handleClickBuy = (product, categoryKey) => {
    const categoryValue = selectedProduct.category[categoryKey];
    const message = `Saya ingin membeli ${product.title} yang ${categoryKey}: ${categoryValue}`;
    const whatsappLink = `https://wa.me/081315025649/?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, "_blank");
};


    return (
        <div className="w-full h-full grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-6 py-4">
            {products.map(product => (
                <div key={product.id} className="relative bg-white rounded-lg shadow-md overflow-hidden group cursor-pointer" onClick={() => handleProductClick(product)}>
                    <img
                        src={product.image}
                        alt={product.title}
                        className="w-[50%] h-full m-auto object-contain transition-transform duration-500 ease-in-out transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 flex flex-col justify-end items-start p-4 bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <h3 className="text-white font-semibold text-lg m-auto">{product.title}</h3>
                    </div>
                </div>
            ))}
            {selectedProduct && (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50" onClick={handleCloseOverlay}>
        <div className="bg-white p-10 rounded-lg shadow-md relative max-w-xl">
            {/* <h2 className="text-2xl font-semibold text-center mb-2">{selectedProduct.title}</h2> */}
            <img src={selectedProduct.image} alt={selectedProduct.title} className="w-[20%] h-auto m-auto py-6 object-contain" />
            {/* <button onClick={handleClosePopup} className="absolute top-[5%] right-0 bg-gray-400 text-white rounded-full w-8 h-8 flex justify-center items-center">X</button> */}
            <div className="grid grid-cols-2 gap-4">
                {Object.entries(selectedProduct.category).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center mb-2">
                        <p className="text-sm">{`${key}: ${value}`}</p>
                        <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 ml-5 rounded text-xs"
                onClick={() => handleClickBuy(selectedProduct, key)} // Meneruskan categoryKey ke dalam handleClickBuy
            >
                BUY
            </button>
                    </div>
                ))}
            </div>
        </div>
    </div>
)}

        </div>
    );
};

export default ProductList;
