
import React, { useState, useMemo, useEffect } from 'react';
import { useProducts } from '@/src/context/ProductContext';
import { ProductCard } from '@/src/components/ProductCard';
import { useSettings } from '@/src/context/SettingsContext';

const ShoppingPage: React.FC = () => {
    const { products } = useProducts();
    const { settings } = useSettings();
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('default');

    const priceCeiling = useMemo(() => {
        if (products.length === 0) return 65000;
        return Math.ceil(Math.max(...products.map(p => p.price)));
    }, [products]);

    const [maxPrice, setMaxPrice] = useState(priceCeiling);

    useEffect(() => {
        if (maxPrice > priceCeiling) {
            setMaxPrice(priceCeiling);
        }
    }, [priceCeiling, maxPrice]);

    useEffect(() => {
        setMaxPrice(priceCeiling);
    }, [products, priceCeiling]);


    const filteredAndSortedProducts = useMemo(() => {
        let filtered = products.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                  product.description.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesPrice = product.price <= maxPrice;
            return matchesSearch && matchesPrice;
        });

        switch(sortOrder) {
            case 'price_asc':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price_desc':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'name_asc':
                filtered.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'name_desc':
                filtered.sort((a, b) => b.name.localeCompare(a.name));
                break;
            default:
                break;
        }

        return filtered;

    }, [products, searchTerm, maxPrice, sortOrder]);

    return (
        <div className={`container mx-auto px-6 py-12 sm:py-16 ${settings.containerWidth}`}>
            <h1 className={`${settings.pageTitleFontSize} font-bold mb-8 text-center`} style={{ fontFamily: 'serif', color: settings.textColor }}>Our Collection</h1>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
                <aside 
                    className="lg:col-span-1 p-6 rounded-lg shadow-lg h-fit lg:sticky top-28"
                    style={{backgroundColor: settings.cardBackgroundColor}}
                >
                    <h2 className="text-2xl font-semibold mb-6 border-b border-gray-700 pb-3" style={{color: settings.textColor}}>Filters</h2>
                    
                    <div className="mb-6">
                        <label htmlFor="search" className="block text-sm font-medium text-gray-300 mb-2">Search Products</label>
                        <input
                            type="text"
                            id="search"
                            aria-label="Search products by name or description"
                            placeholder="e.g. Noir Enigma"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-white focus:ring-amber-500 focus:border-amber-500"
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="price" className="block text-sm font-medium text-gray-300 mb-2">Max Price</label>
                        <input
                            type="range"
                            id="price"
                            aria-label="Filter by maximum price"
                            min="0"
                            max={priceCeiling}
                            value={maxPrice}
                            onChange={e => setMaxPrice(Number(e.target.value))}
                            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                            style={{accentColor: settings.primaryColor}}
                        />
                        <div className="flex justify-between text-sm text-gray-400 mt-2">
                            <span>₹0</span>
                            <span>₹{maxPrice.toLocaleString('en-IN')}</span>
                        </div>
                    </div>

                     <div className="mb-6">
                        <label htmlFor="sort" className="block text-sm font-medium text-gray-300 mb-2">Sort By</label>
                        <select
                            id="sort"
                            aria-label="Sort products"
                            value={sortOrder}
                            onChange={e => setSortOrder(e.target.value)}
                            className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-white focus:ring-amber-500 focus:border-amber-500"
                        >
                            <option value="default">Default</option>
                            <option value="price_asc">Price: Low to High</option>
                            <option value="price_desc">Price: High to Low</option>
                            <option value="name_asc">Name: A to Z</option>
                            <option value="name_desc">Name: Z to A</option>
                        </select>
                    </div>
                </aside>

                <main className="lg:col-span-3">
                    {filteredAndSortedProducts.length > 0 ? (
                         <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                            {filteredAndSortedProducts.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center p-12 rounded-lg" style={{backgroundColor: settings.cardBackgroundColor}}>
                            <h3 className="text-2xl font-semibold" style={{color: settings.textColor}}>No Products Found</h3>
                            <p className="text-gray-400 mt-2">Try adjusting your filters to find your perfect scent.</p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default ShoppingPage;
