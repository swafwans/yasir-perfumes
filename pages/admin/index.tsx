
import React, { useState, useEffect } from 'react';
import { useProducts } from '@/src/context/ProductContext';
import { useAuth } from '@/src/context/AuthContext';
import { useRouter } from 'next/router';
import { Product } from '@/src/types';
import { Logo, PlusIcon, TrashIcon, XIcon, HeartIcon, ShoppingCartIcon } from '@/src/components/icons';
import { useSettings, SiteSettings, NavLinkItem, Banner } from '@/src/context/SettingsContext';

const toBase64 = (file: File): Promise<string> => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
});

// A simple Modal component
const Modal: React.FC<{ isOpen: boolean; onClose: () => void; children: React.ReactNode }> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4" onClick={onClose} role="dialog" aria-modal="true">
            <div className="bg-gray-800 rounded-lg shadow-xl p-8 w-full max-w-2xl relative max-h-full overflow-y-auto" onClick={e => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors" aria-label="Close modal">
                    <XIcon className="h-6 w-6" />
                </button>
                {children}
            </div>
        </div>
    );
};

// A form for adding/editing products
const ProductForm: React.FC<{ product?: Product; onSave: (product: Product | Omit<Product, 'id'>) => void; onCancel: () => void }> = ({ product, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        name: product?.name || '',
        description: product?.description || '',
        price: product?.price || 0,
        imageUrl: product?.imageUrl || '',
        notes: {
            top: product?.notes.top || '',
            middle: product?.notes.middle || '',
            base: product?.notes.base || '',
        },
    });

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const base64 = await toBase64(e.target.files[0]);
            setFormData(prev => ({...prev, imageUrl: base64}));
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name.startsWith('notes.')) {
            const noteKey = name.split('.')[1] as keyof typeof formData.notes;
            setFormData(prev => ({ ...prev, notes: { ...prev.notes, [noteKey]: value } }));
        } else {
            setFormData(prev => ({ ...prev, [name]: name === 'price' ? Number(value) : value }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (product) {
            onSave({ ...formData, id: product.id });
        } else {
            onSave(formData);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-2xl font-bold text-white mb-4">{product ? 'Edit Product' : 'Add New Product'}</h2>
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300">Name</label>
                <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 mt-1 text-white focus:ring-amber-500 focus:border-amber-500"/>
            </div>
            <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-300">Description</label>
                <textarea name="description" id="description" value={formData.description} onChange={handleChange} required rows={3} className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 mt-1 text-white focus:ring-amber-500 focus:border-amber-500"></textarea>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-300">Price</label>
                    <input type="number" name="price" id="price" step="1" value={formData.price} onChange={handleChange} required className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 mt-1 text-white focus:ring-amber-500 focus:border-amber-500"/>
                </div>
                 <div>
                    <label htmlFor="imageFile" className="block text-sm font-medium text-gray-300">Product Image</label>
                    <input type="file" name="imageFile" id="imageFile" onChange={handleFileChange} accept="image/*" className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-amber-600 file:text-white hover:file:bg-amber-700 mt-1"/>
                    {formData.imageUrl && <img src={formData.imageUrl} alt="Preview" className="mt-2 h-20 w-20 object-cover rounded" />}
                </div>
            </div>
            <h3 className="text-lg font-semibold text-white pt-2">Scent Notes</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label htmlFor="notes.top" className="block text-sm font-medium text-gray-300">Top Notes</label>
                    <input type="text" name="notes.top" id="notes.top" value={formData.notes.top} onChange={handleChange} required className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 mt-1 text-white focus:ring-amber-500 focus:border-amber-500"/>
                </div>
                 <div>
                    <label htmlFor="notes.middle" className="block text-sm font-medium text-gray-300">Middle Notes</label>
                    <input type="text" name="notes.middle" id="notes.middle" value={formData.notes.middle} onChange={handleChange} required className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 mt-1 text-white focus:ring-amber-500 focus:border-amber-500"/>
                </div>
                 <div>
                    <label htmlFor="notes.base" className="block text-sm font-medium text-gray-300">Base Notes</label>
                    <input type="text" name="notes.base" id="notes.base" value={formData.notes.base} onChange={handleChange} required className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 mt-1 text-white focus:ring-amber-500 focus:border-amber-500"/>
                </div>
            </div>
            <div className="flex justify-end space-x-4 pt-4">
                <button type="button" onClick={onCancel} className="py-2 px-4 rounded-md text-white bg-gray-600 hover:bg-gray-500 transition-colors">Cancel</button>
                <button type="submit" className="py-2 px-4 rounded-md text-white bg-amber-600 hover:bg-amber-500 transition-colors">Save Product</button>
            </div>
        </form>
    )
}

const BannerForm: React.FC<{ banner?: Banner; onSave: (banner: Banner) => void; onCancel: () => void; }> = ({ banner, onSave, onCancel }) => {
    const [formData, setFormData] = useState<Omit<Banner, 'id' | 'enabled'>>({
        title: banner?.title || '',
        subtitle: banner?.subtitle || '',
        imageUrl: banner?.imageUrl || '',
        buttonText: banner?.buttonText || '',
        buttonLink: banner?.buttonLink || '',
    });

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const base64 = await toBase64(e.target.files[0]);
            setFormData(prev => ({...prev, imageUrl: base64}));
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const bannerToSave = {
            ...formData,
            id: banner?.id || Date.now(),
            enabled: banner?.enabled ?? true,
        };
        onSave(bannerToSave);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-2xl font-bold text-white mb-4">{banner?.id ? 'Edit Banner' : 'Add New Banner'}</h2>
             <div>
                <label htmlFor="bannerImageFile" className="block text-sm font-medium text-gray-300">Banner Image</label>
                <input type="file" name="bannerImageFile" id="bannerImageFile" onChange={handleFileChange} accept="image/*" required={!banner?.imageUrl} className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-amber-600 file:text-white hover:file:bg-amber-700 mt-1"/>
                {formData.imageUrl && <img src={formData.imageUrl} alt="Banner Preview" className="mt-2 h-32 w-full object-cover rounded" />}
            </div>
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-300">Title</label>
                <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} required className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 mt-1 text-white focus:ring-amber-500 focus:border-amber-500"/>
            </div>
            <div>
                <label htmlFor="subtitle" className="block text-sm font-medium text-gray-300">Subtitle</label>
                <input type="text" name="subtitle" id="subtitle" value={formData.subtitle} onChange={handleChange} required className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 mt-1 text-white focus:ring-amber-500 focus:border-amber-500"/>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="buttonText" className="block text-sm font-medium text-gray-300">Button Text (Optional)</label>
                    <input type="text" name="buttonText" id="buttonText" value={formData.buttonText} onChange={handleChange} className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 mt-1 text-white focus:ring-amber-500 focus:border-amber-500"/>
                </div>
                <div>
                    <label htmlFor="buttonLink" className="block text-sm font-medium text-gray-300">Button Link (Optional)</label>
                    <input type="text" name="buttonLink" id="buttonLink" value={formData.buttonLink} onChange={handleChange} placeholder="/shopping" className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 mt-1 text-white focus:ring-amber-500 focus:border-amber-500"/>
                </div>
            </div>
            <div className="flex justify-end space-x-4 pt-4">
                <button type="button" onClick={onCancel} className="py-2 px-4 rounded-md text-white bg-gray-600 hover:bg-gray-500 transition-colors">Cancel</button>
                <button type="submit" className="py-2 px-4 rounded-md text-white bg-amber-600 hover:bg-amber-500 transition-colors">Save Banner</button>
            </div>
        </form>
    );
};

const ProductCardPreview: React.FC<{ product: Product; settings: SiteSettings }> = ({ product, settings }) => {
  const cardClasses = [
    'group',
    'block',
    'overflow-hidden',
    'transition-shadow duration-300',
    'flex flex-col',
    settings.cardShadow ? 'shadow-lg' : '',
    settings.cardOutline ? 'border-2' : 'border',
  ].join(' ');

  return (
    <div
      className={cardClasses}
      style={{
        backgroundColor: settings.cardBackgroundColor,
        borderColor: settings.cardOutline ? settings.primaryColor : '#374151',
        borderRadius: `${settings.cardBorderRadius}px`,
      }}
    >
      <div className="relative">
        <img src={product.imageUrl} alt={product.name} className={`w-full ${settings.cardImageHeight} object-cover`} />
        <div
          className="absolute top-3 right-3 p-2 bg-black bg-opacity-50 rounded-full text-white"
        >
          <HeartIcon className="h-6 w-6" isFilled={false} />
        </div>
      </div>
      <div 
        className="flex flex-col flex-grow"
        style={{ padding: `${settings.cardPadding}rem` }}
      >
        <h3 className={`truncate ${settings.cardTitleFontSize} ${settings.cardTitleFontWeight}`} style={{color: settings.textColor}}>{product.name}</h3>
        <p className={`text-gray-400 mt-1 ${settings.cardPriceFontSize}`}>₹{product.price.toLocaleString('en-IN')}</p>
        <button 
          className="w-full mt-auto pt-4 flex items-center justify-center py-2 px-4 rounded-md"
          style={{ backgroundColor: settings.primaryColor, color: settings.accentTextColor }}
        >
          <ShoppingCartIcon className="h-5 w-5 mr-2" />
          {settings.cardButtonText}
        </button>
      </div>
    </div>
  );
};


const AdminDashboardPage: React.FC = () => {
    const { products, addProduct, updateProduct, deleteProduct } = useProducts();
    const { logout } = useAuth();
    const router = useRouter();
    const [isProductModalOpen, setIsProductModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | undefined>(undefined);
    const [isBannerModalOpen, setIsBannerModalOpen] = useState(false);
    const [editingBanner, setEditingBanner] = useState<Banner | undefined>(undefined);

    const { settings, updateSettings } = useSettings();
    const [formSettings, setFormSettings] = useState<SiteSettings>(settings);
    const [showSuccess, setShowSuccess] = useState<string | null>(null);

    useEffect(() => {
        setFormSettings(settings);
    }, [settings]);

    const handleSettingsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
            const { checked } = e.target as HTMLInputElement;
            setFormSettings(prev => ({ ...prev, [name]: checked }));
        } else {
            setFormSettings(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleFileSettingChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name } = e.target;
        if (e.target.files && e.target.files[0]) {
            const base64 = await toBase64(e.target.files[0]);
            setFormSettings(prev => ({...prev, [name]: base64}));
        }
    }

     const handleNavLinkChange = (id: number, field: keyof NavLinkItem, value: string | boolean) => {
        setFormSettings(prev => ({
            ...prev,
            navLinks: prev.navLinks.map(link => 
                link.id === id ? { ...link, [field]: value } : link
            )
        }));
    };

    const handleSaveSettings = (e: React.FormEvent) => {
        e.preventDefault();
        updateSettings(formSettings);
        setShowSuccess('Settings updated successfully!');
        setTimeout(() => setShowSuccess(null), 3000);
    };

    const handleLogout = () => {
        logout();
        router.push('/');
    };

    // Product Modal Handlers
    const handleAddNewProduct = () => {
        setEditingProduct(undefined);
        setIsProductModalOpen(true);
    };

    const handleEditProduct = (product: Product) => {
        setEditingProduct(product);
        setIsProductModalOpen(true);
    };

    const handleDeleteProduct = (id: number) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            deleteProduct(id);
        }
    };
    
    const handleSaveProduct = (productData: Product | Omit<Product, 'id'>) => {
        if ('id' in productData) {
            updateProduct(productData);
        } else {
            addProduct(productData);
        }
        setIsProductModalOpen(false);
        setEditingProduct(undefined);
    };

    // Banner Modal Handlers
    const handleAddNewBanner = () => {
        setEditingBanner(undefined);
        setIsBannerModalOpen(true);
    };

    const handleEditBanner = (banner: Banner) => {
        setEditingBanner(banner);
        setIsBannerModalOpen(true);
    };

    const handleDeleteBanner = (id: number) => {
        if (window.confirm('Are you sure you want to delete this banner?')) {
            setFormSettings(prev => ({
                ...prev,
                banners: prev.banners.filter(b => b.id !== id)
            }));
        }
    };

    const handleToggleBanner = (id: number) => {
        setFormSettings(prev => ({
            ...prev,
            banners: prev.banners.map(b => b.id === id ? { ...b, enabled: !b.enabled } : b)
        }));
    };

    const handleSaveBanner = (banner: Banner) => {
        const bannerExists = formSettings.banners.some(b => b.id === banner.id);
        if (bannerExists) {
            setFormSettings(prev => ({...prev, banners: prev.banners.map(b => b.id === banner.id ? banner : b)}));
        } else {
            setFormSettings(prev => ({...prev, banners: [...prev.banners, banner]}));
        }
        setIsBannerModalOpen(false);
    };

    const inputClass = "w-full bg-gray-700 border border-gray-600 rounded-md p-2 mt-1 text-white focus:ring-amber-500 focus:border-amber-500";
    const labelClass = "block text-sm font-medium text-gray-300";

    return (
        <div className="bg-gray-900 min-h-screen text-white">
            <header className="bg-gray-800 shadow-md">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <Logo textClassName="text-xl" iconSize={28} />
                    <button onClick={handleLogout} className="py-2 px-4 rounded-md text-white bg-red-600 hover:bg-red-700 transition-colors">Logout</button>
                </div>
            </header>
            <main className="container mx-auto p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold">Manage Products</h2>
                    <button onClick={handleAddNewProduct} className="flex items-center bg-amber-600 hover:bg-amber-500 text-white font-bold py-2 px-4 rounded-md transition-colors">
                        <PlusIcon className="h-5 w-5 mr-2" />
                        Add New Product
                    </button>
                </div>

                <div className="bg-gray-800 rounded-lg shadow overflow-x-auto">
                    <table className="w-full text-left min-w-[640px]">
                        <thead className="bg-gray-700">
                            <tr>
                                <th className="p-4 font-semibold">Image</th>
                                <th className="p-4 font-semibold">Name</th>
                                <th className="p-4 font-semibold">Price</th>
                                <th className="p-4 font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => (
                                <tr key={product.id} className="border-b border-gray-700 hover:bg-gray-700/50">
                                    <td className="p-4"><img src={product.imageUrl} alt={product.name} className="h-12 w-12 object-cover rounded"/></td>
                                    <td className="p-4 font-medium">{product.name}</td>
                                    <td className="p-4">₹{product.price.toLocaleString('en-IN')}</td>
                                    <td className="p-4">
                                        <div className="flex space-x-4">
                                            <button onClick={() => handleEditProduct(product)} className="text-blue-400 hover:text-blue-300 transition-colors font-semibold">Edit</button>
                                            <button onClick={() => handleDeleteProduct(product.id)} className="text-red-500 hover:text-red-400 transition-colors" aria-label={`Delete ${product.name}`}>
                                                <TrashIcon className="h-5 w-5"/>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-12">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-semibold">Manage Promotional Banners</h2>
                        <button onClick={handleAddNewBanner} className="flex items-center bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-md transition-colors">
                            <PlusIcon className="h-5 w-5 mr-2" />
                            Add New Banner
                        </button>
                    </div>
                     <div className="bg-gray-800 rounded-lg shadow overflow-x-auto">
                        <table className="w-full text-left min-w-[640px]">
                            <thead className="bg-gray-700">
                                <tr>
                                    <th className="p-4 font-semibold">Image</th>
                                    <th className="p-4 font-semibold">Title</th>
                                    <th className="p-4 font-semibold">Status</th>
                                    <th className="p-4 font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {formSettings.banners.map(banner => (
                                    <tr key={banner.id} className="border-b border-gray-700 hover:bg-gray-700/50">
                                        <td className="p-4"><img src={banner.imageUrl} alt={banner.title} className="h-12 w-24 object-cover rounded"/></td>
                                        <td className="p-4 font-medium">{banner.title}</td>
                                        <td className="p-4">
                                            <label htmlFor={`banner-enabled-${banner.id}`} className="flex items-center cursor-pointer">
                                                <div className="relative">
                                                    <input type="checkbox" id={`banner-enabled-${banner.id}`} className="sr-only peer" checked={banner.enabled} onChange={() => handleToggleBanner(banner.id)} />
                                                    <div className="block w-12 h-6 rounded-full bg-gray-500 peer-checked:bg-amber-600 transition-colors"></div>
                                                    <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform peer-checked:translate-x-6"></div>
                                                </div>
                                                <span className="ml-3 text-sm font-medium text-gray-300">{banner.enabled ? 'Enabled' : 'Disabled'}</span>
                                            </label>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex space-x-4">
                                                <button onClick={() => handleEditBanner(banner)} className="text-blue-400 hover:text-blue-300 transition-colors font-semibold">Edit</button>
                                                <button onClick={() => handleDeleteBanner(banner.id)} className="text-red-500 hover:text-red-400 transition-colors" aria-label={`Delete ${banner.title}`}>
                                                    <TrashIcon className="h-5 w-5"/>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                 {formSettings.banners.length === 0 && (
                                    <tr>
                                        <td colSpan={4} className="text-center p-8 text-gray-400">No promotional banners created yet.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <form onSubmit={handleSaveSettings}>
                    
                    <div className="mt-12">
                        <h2 className="text-2xl font-semibold mb-6">Home Page Hero Customization</h2>
                        <div className="bg-gray-800 rounded-lg shadow p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="heroTitle" className={labelClass}>Title</label>
                                    <input type="text" name="heroTitle" id="heroTitle" value={formSettings.heroTitle} onChange={handleSettingsChange} className={inputClass}/>
                                </div>
                                <div>
                                    <label htmlFor="heroSubtitle" className={labelClass}>Subtitle</label>
                                    <input type="text" name="heroSubtitle" id="heroSubtitle" value={formSettings.heroSubtitle} onChange={handleSettingsChange} className={inputClass}/>
                                </div>
                                <div>
                                    <label htmlFor="heroButtonText" className={labelClass}>Button Text</label>
                                    <input type="text" name="heroButtonText" id="heroButtonText" value={formSettings.heroButtonText} onChange={handleSettingsChange} className={inputClass}/>
                                </div>
                            </div>
                             <div>
                                <label htmlFor="heroImageUrl" className={labelClass}>Banner Image</label>
                                <input type="file" name="heroImageUrl" id="heroImageUrl" onChange={handleFileSettingChange} accept="image/*" className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-amber-600 file:text-white hover:file:bg-amber-700 mt-1"/>
                                {formSettings.heroImageUrl && <img src={formSettings.heroImageUrl} alt="Banner Preview" className="mt-2 h-32 w-full object-cover rounded" />}
                            </div>
                        </div>
                    </div>
                    
                    <div className="mt-12">
                        <h2 className="text-2xl font-semibold mb-6">Content Customization</h2>
                        <div className="bg-gray-800 rounded-lg shadow p-6 space-y-8">
                            {/* Home Page Content */}
                            <div>
                                <h3 className="text-xl font-semibold mb-4 text-amber-400 border-b border-gray-700 pb-2">Home Page Sections</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                                    <div>
                                        <label htmlFor="homeAboutImageUrl" className={labelClass}>'About Us' Section Image</label>
                                        <input type="file" name="homeAboutImageUrl" id="homeAboutImageUrl" onChange={handleFileSettingChange} accept="image/*" className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-amber-600 file:text-white hover:file:bg-amber-700 mt-1"/>
                                        {formSettings.homeAboutImageUrl && <img src={formSettings.homeAboutImageUrl} alt="About Us Preview" className="mt-2 h-32 w-full object-cover rounded" />}
                                    </div>
                                    <div>
                                        <label htmlFor="homeParallaxImageUrl" className={labelClass}>Parallax Section Background</label>
                                        <input type="file" name="homeParallaxImageUrl" id="homeParallaxImageUrl" onChange={handleFileSettingChange} accept="image/*" className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-amber-600 file:text-white hover:file:bg-amber-700 mt-1"/>
                                        {formSettings.homeParallaxImageUrl && <img src={formSettings.homeParallaxImageUrl} alt="Parallax Preview" className="mt-2 h-32 w-full object-cover rounded" />}
                                    </div>
                                </div>
                                <div className="mt-6 border-t border-gray-700 pt-6">
                                    <h4 className="text-lg font-semibold mb-4 text-gray-200">'Perfumes for a Lifetime' Section Content</h4>
                                    <div className="space-y-4">
                                        <div>
                                            <label htmlFor="homeParallaxTitle" className={labelClass}>Title</label>
                                            <input type="text" name="homeParallaxTitle" id="homeParallaxTitle" value={formSettings.homeParallaxTitle} onChange={handleSettingsChange} className={inputClass}/>
                                        </div>
                                        <div>
                                            <label htmlFor="homeParallaxSubtitle" className={labelClass}>Subtitle/Paragraph</label>
                                            <textarea name="homeParallaxSubtitle" id="homeParallaxSubtitle" value={formSettings.homeParallaxSubtitle} onChange={handleSettingsChange} rows={4} className={inputClass}></textarea>
                                        </div>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            <div className="flex flex-col items-center">
                                                <label htmlFor="homeParallaxTitleColor" className="block text-sm font-medium text-gray-300 mb-2">Title Color</label>
                                                <input type="color" name="homeParallaxTitleColor" id="homeParallaxTitleColor" value={formSettings.homeParallaxTitleColor} onChange={handleSettingsChange} className="w-16 h-10 p-0 border-0 bg-transparent cursor-pointer"/>
                                            </div>
                                            <div className="flex flex-col items-center">
                                                <label htmlFor="homeParallaxSubtitleColor" className="block text-sm font-medium text-gray-300 mb-2">Subtitle Color</label>
                                                <input type="color" name="homeParallaxSubtitleColor" id="homeParallaxSubtitleColor" value={formSettings.homeParallaxSubtitleColor} onChange={handleSettingsChange} className="w-16 h-10 p-0 border-0 bg-transparent cursor-pointer"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* About Page Content */}
                            <div>
                                <h3 className="text-xl font-semibold mb-4 text-amber-400 border-b border-gray-700 pb-2">About Page Section</h3>
                                <div>
                                    <label htmlFor="aboutPageHistoryImageUrl" className={labelClass}>'About Our History' Image</label>
                                    <input type="file" name="aboutPageHistoryImageUrl" id="aboutPageHistoryImageUrl" onChange={handleFileSettingChange} accept="image/*" className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-amber-600 file:text-white hover:file:bg-amber-700 mt-1"/>
                                    {formSettings.aboutPageHistoryImageUrl && <img src={formSettings.aboutPageHistoryImageUrl} alt="About History Preview" className="mt-2 h-32 w-full object-cover rounded" />}
                                </div>
                            </div>
                        </div>
                    </div>

                     <div className="mt-12">
                        <h2 className="text-2xl font-semibold mb-6">Layout & Sizing Customization</h2>
                        <div className="bg-gray-800 rounded-lg shadow p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="containerWidth" className={`${labelClass} mb-1`}>Page Content Width</label>
                                <select name="containerWidth" id="containerWidth" value={formSettings.containerWidth} onChange={handleSettingsChange} className={inputClass}>
                                    <option value="max-w-5xl">Compact</option>
                                    <option value="max-w-7xl">Standard</option>
                                    <option value="max-w-screen-2xl">Wide</option>
                                    <option value="w-full px-6">Full Width</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="cardImageHeight" className={`${labelClass} mb-1`}>Product Card Image Shape</label>
                                <select name="cardImageHeight" id="cardImageHeight" value={formSettings.cardImageHeight} onChange={handleSettingsChange} className={inputClass}>
                                    <option value="h-64">Fixed Height (Medium)</option>
                                    <option value="h-80">Fixed Height (Tall)</option>
                                    <option value="aspect-square">Square (1:1)</option>
                                    <option value="aspect-[4/3]">Landscape (4:3)</option>
                                    <option value="aspect-[3/4]">Portrait (3:4)</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    
                    <div className="mt-12">
                        <h2 className="text-2xl font-semibold mb-6">Product Card Appearance</h2>
                        <div className="bg-gray-800 rounded-lg shadow p-6 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="cardBorderRadius" className={`${labelClass} mb-1`}>Card Border Radius (px)</label>
                                    <input type="number" name="cardBorderRadius" id="cardBorderRadius" value={formSettings.cardBorderRadius} onChange={handleSettingsChange} className={inputClass}/>
                                </div>
                                <div>
                                    <label htmlFor="cardPadding" className={`${labelClass} mb-1`}>Card Padding (rem)</label>
                                    <input type="number" name="cardPadding" id="cardPadding" step="0.25" min="0.5" max="2" value={formSettings.cardPadding} onChange={handleSettingsChange} className={inputClass}/>
                                </div>
                                <div>
                                    <label htmlFor="cardTitleFontSize" className={`${labelClass} mb-1`}>Title Font Size</label>
                                    <select name="cardTitleFontSize" id="cardTitleFontSize" value={formSettings.cardTitleFontSize} onChange={handleSettingsChange} className={inputClass}>
                                        <option value="text-base">Base</option>
                                        <option value="text-lg">Large</option>
                                        <option value="text-xl">Extra Large</option>
                                        <option value="text-2xl">2X Large</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="cardTitleFontWeight" className={`${labelClass} mb-1`}>Title Font Weight</label>
                                    <select name="cardTitleFontWeight" id="cardTitleFontWeight" value={formSettings.cardTitleFontWeight} onChange={handleSettingsChange} className={inputClass}>
                                        <option value="font-normal">Normal</option>
                                        <option value="font-semibold">Semi-bold</option>
                                        <option value="font-bold">Bold</option>
                                    </select>
                                </div>
                                 <div>
                                    <label htmlFor="cardPriceFontSize" className={`${labelClass} mb-1`}>Price Font Size</label>
                                    <select name="cardPriceFontSize" id="cardPriceFontSize" value={formSettings.cardPriceFontSize} onChange={handleSettingsChange} className={inputClass}>
                                        <option value="text-sm">Small</option>
                                        <option value="text-base">Base</option>
                                        <option value="text-lg">Large</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="cardButtonText" className={`${labelClass} mb-1`}>Button Text</label>
                                    <input type="text" name="cardButtonText" id="cardButtonText" value={formSettings.cardButtonText} onChange={handleSettingsChange} className={inputClass}/>
                                </div>
                            </div>
                            <div className="md:col-span-1">
                                <h3 className="text-lg font-semibold text-center mb-4">Live Preview</h3>
                                <div className="mx-auto max-w-[300px]">
                                    {products.length > 0 && <ProductCardPreview product={products[0]} settings={formSettings} />}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12">
                        <h2 className="text-2xl font-semibold mb-6">Site-wide Design Customization</h2>
                        <div className="bg-gray-800 rounded-lg shadow p-6 space-y-8">
                            <div>
                                <h3 className="text-xl font-semibold mb-4 text-amber-400 border-b border-gray-700 pb-2">Colors & Appearance</h3>
                                <div className="space-y-6 pt-4">
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <div className="flex flex-col items-center">
                                            <label htmlFor="primaryColor" className="block text-sm font-medium text-gray-300 mb-2">Primary</label>
                                            <input type="color" name="primaryColor" id="primaryColor" value={formSettings.primaryColor} onChange={handleSettingsChange} className="w-16 h-10 p-0 border-0 bg-transparent cursor-pointer"/>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <label htmlFor="backgroundColor" className="block text-sm font-medium text-gray-300 mb-2">Background</label>
                                            <input type="color" name="backgroundColor" id="backgroundColor" value={formSettings.backgroundColor} onChange={handleSettingsChange} className="w-16 h-10 p-0 border-0 bg-transparent cursor-pointer"/>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <label htmlFor="cardBackgroundColor" className="block text-sm font-medium text-gray-300 mb-2">Card BG</label>
                                            <input type="color" name="cardBackgroundColor" id="cardBackgroundColor" value={formSettings.cardBackgroundColor} onChange={handleSettingsChange} className="w-16 h-10 p-0 border-0 bg-transparent cursor-pointer"/>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <label htmlFor="textColor" className="block text-sm font-medium text-gray-300 mb-2">Text</label>
                                            <input type="color" name="textColor" id="textColor" value={formSettings.textColor} onChange={handleSettingsChange} className="w-16 h-10 p-0 border-0 bg-transparent cursor-pointer"/>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <label htmlFor="accentTextColor" className="block text-sm font-medium text-gray-300 mb-2">Accent Text</label>
                                            <input type="color" name="accentTextColor" id="accentTextColor" value={formSettings.accentTextColor} onChange={handleSettingsChange} className="w-16 h-10 p-0 border-0 bg-transparent cursor-pointer"/>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <label htmlFor="sectionTitleColor" className="block text-sm font-medium text-gray-300 mb-2">Section Title</label>
                                            <input type="color" name="sectionTitleColor" id="sectionTitleColor" value={formSettings.sectionTitleColor} onChange={handleSettingsChange} className="w-16 h-10 p-0 border-0 bg-transparent cursor-pointer"/>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <label htmlFor="sectionSubtitleColor" className="block text-sm font-medium text-gray-300 mb-2">Section Subtitle</label>
                                            <input type="color" name="sectionSubtitleColor" id="sectionSubtitleColor" value={formSettings.sectionSubtitleColor} onChange={handleSettingsChange} className="w-16 h-10 p-0 border-0 bg-transparent cursor-pointer"/>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <label htmlFor="sectionTextColor" className="block text-sm font-medium text-gray-300 mb-2">Section Text</label>
                                            <input type="color" name="sectionTextColor" id="sectionTextColor" value={formSettings.sectionTextColor} onChange={handleSettingsChange} className="w-16 h-10 p-0 border-0 bg-transparent cursor-pointer"/>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-8">
                                        <label htmlFor="cardShadow" className="flex items-center cursor-pointer">
                                            <span className="text-sm text-gray-300 mr-3">Card Shadow</span>
                                            <div className="relative">
                                                <input type="checkbox" name="cardShadow" id="cardShadow" className="sr-only peer" checked={formSettings.cardShadow} onChange={handleSettingsChange} />
                                                <div className="block w-12 h-6 rounded-full bg-gray-500 peer-checked:bg-amber-600 transition-colors"></div>
                                                <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform peer-checked:translate-x-6"></div>
                                            </div>
                                        </label>
                                        <label htmlFor="cardOutline" className="flex items-center cursor-pointer">
                                            <span className="text-sm text-gray-300 mr-3">Card Outline</span>
                                            <div className="relative">
                                                <input type="checkbox" name="cardOutline" id="cardOutline" className="sr-only peer" checked={formSettings.cardOutline} onChange={handleSettingsChange} />
                                                <div className="block w-12 h-6 rounded-full bg-gray-500 peer-checked:bg-amber-600 transition-colors"></div>
                                                <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform peer-checked:translate-x-6"></div>
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-4 text-amber-400 border-b border-gray-700 pb-2">Typography</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
                                    <div>
                                        <label htmlFor="heroTitleFontSize" className={labelClass}>Hero Title Size</label>
                                        <select name="heroTitleFontSize" id="heroTitleFontSize" value={formSettings.heroTitleFontSize} onChange={handleSettingsChange} className={inputClass}>
                                            <option value="text-3xl md:text-5xl">Large</option>
                                            <option value="text-4xl md:text-6xl">X-Large (Default)</option>
                                            <option value="text-5xl md:text-7xl">2X-Large</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="heroTitleFontFamily" className={labelClass}>Hero Title Font</label>
                                        <select name="heroTitleFontFamily" id="heroTitleFontFamily" value={formSettings.heroTitleFontFamily} onChange={handleSettingsChange} className={inputClass}>
                                            <option value="serif">Serif</option>
                                            <option value="sans-serif">Sans-serif</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="heroSubtitleFontSize" className={labelClass}>Hero Subtitle Size</label>
                                        <select name="heroSubtitleFontSize" id="heroSubtitleFontSize" value={formSettings.heroSubtitleFontSize} onChange={handleSettingsChange} className={inputClass}>
                                            <option value="text-base md:text-lg">Small</option>
                                            <option value="text-lg md:text-xl">Medium (Default)</option>
                                            <option value="text-xl md:text-2xl">Large</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="pageTitleFontSize" className={labelClass}>Page Title Size</label>
                                        <select name="pageTitleFontSize" id="pageTitleFontSize" value={formSettings.pageTitleFontSize} onChange={handleSettingsChange} className={inputClass}>
                                            <option value="text-3xl md:text-4xl">Large</option>
                                            <option value="text-4xl md:text-5xl">X-Large (Default)</option>
                                            <option value="text-5xl md:text-6xl">2X-Large</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="sectionTitleFontSize" className={labelClass}>Section Title Size</label>
                                        <select name="sectionTitleFontSize" id="sectionTitleFontSize" value={formSettings.sectionTitleFontSize} onChange={handleSettingsChange} className={inputClass}>
                                            <option value="text-2xl md:text-3xl">Medium</option>
                                            <option value="text-3xl md:text-4xl">Large (Default)</option>
                                            <option value="text-4xl md:text-5xl">X-Large</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="sectionTitleFontFamily" className={labelClass}>Section Title Font</label>
                                        <select name="sectionTitleFontFamily" id="sectionTitleFontFamily" value={formSettings.sectionTitleFontFamily} onChange={handleSettingsChange} className={inputClass}>
                                            <option value="serif">Serif</option>
                                            <option value="sans-serif">Sans-serif</option>
                                        </select>
                                    </div>
                                     <div>
                                        <label htmlFor="sectionSubtitleFontSize" className={labelClass}>Section Subtitle Size</label>
                                        <select name="sectionSubtitleFontSize" id="sectionSubtitleFontSize" value={formSettings.sectionSubtitleFontSize} onChange={handleSettingsChange} className={inputClass}>
                                            <option value="text-xs">X-Small</option>
                                            <option value="text-sm">Small (Default)</option>
                                            <option value="text-base">Base</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="sectionTextFontSize" className={labelClass}>Section Body Text Size</label>
                                        <select name="sectionTextFontSize" id="sectionTextFontSize" value={formSettings.sectionTextFontSize} onChange={handleSettingsChange} className={inputClass}>
                                            <option value="text-sm">Small</option>
                                            <option value="text-base">Base (Default)</option>
                                            <option value="text-lg">Large</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="mt-12">
                        <h2 className="text-2xl font-semibold mb-6">Manage Navigation, Logo &amp; Footer</h2>
                        <div className="bg-gray-800 rounded-lg shadow p-6 space-y-6">
                            <div className="flex items-center space-x-8">
                                <label htmlFor="showAuthButtons" className="flex items-center cursor-pointer">
                                    <span className="text-sm text-gray-300 mr-3">Show Customer Login Button</span>
                                    <div className="relative">
                                        <input type="checkbox" name="showAuthButtons" id="showAuthButtons" className="sr-only peer" checked={formSettings.showAuthButtons} onChange={handleSettingsChange} />
                                        <div className="block w-12 h-6 rounded-full bg-gray-500 peer-checked:bg-amber-600 transition-colors"></div>
                                        <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform peer-checked:translate-x-6"></div>
                                    </div>
                                </label>
                            </div>

                            <div className="border-t border-gray-700 pt-6">
                                <label htmlFor="logoUrl" className={labelClass}>Logo Image</label>
                                <input type="file" name="logoUrl" id="logoUrl" onChange={handleFileSettingChange} accept="image/*" className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-amber-600 file:text-white hover:file:bg-amber-700 mt-1"/>
                                {formSettings.logoUrl && (
                                    <div className="mt-2 bg-gray-700 p-2 rounded inline-block">
                                        <img
                                            src={formSettings.logoUrl}
                                            alt="Logo Preview"
                                            style={{
                                                height: `${formSettings.logoHeight}px`,
                                                width: `${formSettings.logoWidth}px`,
                                                objectFit: 'contain'
                                            }}
                                        />
                                    </div>
                                )}
                                <p className="text-xs text-gray-400 mt-1">Leave blank to use the default SVG logo.</p>
                            </div>
                             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="logoWidth" className={labelClass}>Logo Width (px)</label>
                                    <input type="number" name="logoWidth" id="logoWidth" value={formSettings.logoWidth} onChange={handleSettingsChange} className={inputClass}/>
                                </div>
                                <div>
                                    <label htmlFor="logoHeight" className={labelClass}>Logo Height (px)</label>
                                    <input type="number" name="logoHeight" id="logoHeight" value={formSettings.logoHeight} onChange={handleSettingsChange} className={inputClass}/>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-lg font-medium text-gray-100 mb-2">Navigation Links</h3>
                                <div className="space-y-4">
                                    {formSettings.navLinks.map(link => (
                                        <div key={link.id} className="grid grid-cols-1 md:grid-cols-8 gap-4 items-center bg-gray-700 p-3 rounded-md">
                                            <div className="md:col-span-3">
                                                <label htmlFor={`nav-text-${link.id}`} className="sr-only">Link Text</label>
                                                <input type="text" id={`nav-text-${link.id}`} value={link.text} onChange={e => handleNavLinkChange(link.id, 'text', e.target.value)} placeholder="Link Text" className="w-full bg-gray-600 border border-gray-500 rounded-md p-2 text-white focus:ring-amber-500 focus:border-amber-500"/>
                                            </div>
                                            <div className="md:col-span-4">
                                                <label htmlFor={`nav-path-${link.id}`} className="sr-only">Link Path</label>
                                                <input type="text" id={`nav-path-${link.id}`} value={link.path} onChange={e => handleNavLinkChange(link.id, 'path', e.target.value)} placeholder="/path" className="w-full bg-gray-600 border border-gray-500 rounded-md p-2 text-white focus:ring-amber-500 focus:border-amber-500"/>
                                            </div>
                                            <div className="flex items-center justify-end">
                                                <label htmlFor={`nav-enabled-${link.id}`} className="flex items-center cursor-pointer">
                                                    <span className="text-sm text-gray-300 mr-2">Show</span>
                                                    <div className="relative">
                                                        <input type="checkbox" id={`nav-enabled-${link.id}`} className="sr-only peer" checked={link.enabled} onChange={e => handleNavLinkChange(link.id, 'enabled', e.target.checked)} />
                                                        <div className="block w-12 h-6 rounded-full bg-gray-500 peer-checked:bg-amber-600 transition-colors"></div>
                                                        <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform peer-checked:translate-x-6"></div>
                                                    </div>
                                                </label>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                             <div className="grid md:grid-cols-3 gap-4 pt-4">
                                <div>
                                    <label htmlFor="facebook" className={labelClass}>Facebook URL</label>
                                    <input type="url" name="facebook" id="facebook" value={formSettings.facebook} onChange={handleSettingsChange} placeholder="https://facebook.com/yourpage" className={inputClass}/>
                                </div>
                                 <div>
                                    <label htmlFor="instagram" className={labelClass}>Instagram URL</label>
                                    <input type="url" name="instagram" id="instagram" value={formSettings.instagram} onChange={handleSettingsChange} placeholder="https://instagram.com/yourprofile" className={inputClass}/>
                                </div>
                                 <div>
                                    <label htmlFor="youtube" className={labelClass}>YouTube URL</label>
                                    <input type="url" name="youtube" id="youtube" value={formSettings.youtube} onChange={handleSettingsChange} placeholder="https://youtube.com/yourchannel" className={inputClass}/>
                                </div>
                            </div>
                        </div>
                    </div>
                
                    <div className="mt-8">
                        <h2 className="text-2xl font-semibold mb-6">Content Page Management</h2>
                        <div className="bg-gray-800 rounded-lg shadow p-6 space-y-6">
                            <div>
                                <label htmlFor="termsContent" className={labelClass}>Terms &amp; Conditions</label>
                                <textarea name="termsContent" id="termsContent" value={formSettings.termsContent} onChange={handleSettingsChange} rows={6} className={inputClass}></textarea>
                            </div>
                            <div>
                                <label htmlFor="privacyPolicyContent" className={labelClass}>Privacy &amp; Policies</label>
                                <textarea name="privacyPolicyContent" id="privacyPolicyContent" value={formSettings.privacyPolicyContent} onChange={handleSettingsChange} rows={6} className={inputClass}></textarea>
                            </div>
                            <div>
                                <label htmlFor="refundContent" className={labelClass}>Refund &amp; Cancellation</label>
                                <textarea name="refundContent" id="refundContent" value={formSettings.refundContent} onChange={handleSettingsChange} rows={6} className={inputClass}></textarea>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 flex justify-end items-center space-x-4 sticky bottom-6 pr-6">
                        {showSuccess && <p className="text-green-400 bg-gray-800 px-4 py-2 rounded-md shadow-lg">{showSuccess}</p>}
                        <button type="submit" className="py-2 px-8 rounded-md text-white bg-amber-600 hover:bg-amber-500 transition-colors shadow-lg">Save All Settings</button>
                    </div>
                </form>
            </main>
            <Modal isOpen={isProductModalOpen} onClose={() => setIsProductModalOpen(false)}>
                <ProductForm product={editingProduct} onSave={handleSaveProduct} onCancel={() => setIsProductModalOpen(false)} />
            </Modal>
            <Modal isOpen={isBannerModalOpen} onClose={() => setIsBannerModalOpen(false)}>
                <BannerForm banner={editingBanner} onSave={handleSaveBanner} onCancel={() => setIsBannerModalOpen(false)} />
            </Modal>
        </div>
    );
};

export default AdminDashboardPage;
