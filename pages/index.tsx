import React from 'react';
import Link from 'next/link';
import { useProducts } from '@/src/context/ProductContext';
import { ProductCard } from '@/src/components/ProductCard';
import { useSettings } from '@/src/context/SettingsContext';
import BannerCarousel from '@/src/components/BannerCarousel';

const HomePage: React.FC = () => {
  const { products } = useProducts();
  const { settings } = useSettings();
  const enabledBanners = settings.banners.filter(b => b.enabled);

  const renderHero = () => {
    if (enabledBanners.length > 0) {
      return <BannerCarousel banners={enabledBanners} />;
    }
    return (
      <section className="relative h-[80vh] bg-cover bg-center flex items-center justify-center text-white" style={{ backgroundImage: `url('${settings.heroImageUrl}')` }}>
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative z-10 text-center p-6">
          <h1 className={`${settings.heroTitleFontSize} font-bold tracking-tight`} style={{fontFamily: settings.heroTitleFontFamily}}>{settings.heroTitle}</h1>
          <p className={`mt-4 ${settings.heroSubtitleFontSize} max-w-2xl mx-auto`}>{settings.heroSubtitle}</p>
          <Link 
            href="/shopping" 
            className="mt-8 inline-block py-3 px-8 rounded-md text-lg font-semibold transition-transform duration-300 hover:scale-105"
            style={{ backgroundColor: settings.primaryColor, color: settings.accentTextColor }}
          >
            {settings.heroButtonText}
          </Link>
        </div>
      </section>
    );
  };
  
  const ReadMoreButton: React.FC<{path: string}> = ({ path }) => {
    const { settings } = useSettings();
    return (
      <Link 
        href={path}
        className="inline-block mt-8 py-3 px-8 rounded-md text-lg font-semibold border transition-colors duration-300"
        style={{
          borderColor: settings.primaryColor,
          color: settings.primaryColor,
        }}
        onMouseEnter={e => {
            e.currentTarget.style.backgroundColor = settings.primaryColor;
            e.currentTarget.style.color = settings.accentTextColor;
        }}
        onMouseLeave={e => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = settings.primaryColor;
        }}
      >
        Read More
      </Link>
    );
  };

  return (
    <div className="bg-gray-950">
      {renderHero()}

      <section className="py-16 sm:py-24 bg-black">
        <div className={`container mx-auto px-6 ${settings.containerWidth}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="rounded-lg overflow-hidden shadow-2xl">
                    <img src={settings.homeAboutImageUrl} alt="About Yasir Perfumes" className="w-full h-auto object-cover" />
                </div>
                <div>
                    <h2 className={`${settings.sectionTitleFontSize} font-bold mb-4`} style={{fontFamily: settings.sectionTitleFontFamily, color: settings.sectionTitleColor}}>About Us</h2>
                    <p className={`leading-relaxed mb-4 ${settings.sectionTextFontSize}`} style={{color: settings.sectionTextColor}}>
                        Yasir Perfumes is a group of one of the leading industrial perfumes dealer in Kerala. We are Wholesalers, Retailers and manufacturing company of Oud Athar Bakhoor & Scent items.
                    </p>
                    <p className={`leading-relaxed ${settings.sectionTextFontSize}`} style={{color: settings.sectionTextColor}}>
                       We do what we love and so we always explore the changing trends to consistently cater for the tastes of our discerning customers. Yasir perfumes expert in exploring the purity in fragrance from a splendid array of Oudh.
                    </p>
                    <ReadMoreButton path="/about" />
                </div>
            </div>
        </div>
      </section>

      <section className="py-24 sm:py-32 bg-cover bg-center bg-fixed" style={{backgroundImage: `url('${settings.homeParallaxImageUrl}')`}}>
          <div className="absolute inset-0 bg-black opacity-70"></div>
          <div className="relative z-10 text-center text-white container mx-auto px-6">
              <h2 className={`${settings.sectionTitleFontSize} font-bold`} style={{fontFamily: settings.sectionTitleFontFamily, color: settings.homeParallaxTitleColor}}>{settings.homeParallaxTitle}</h2>
              <p className={`mt-4 text-lg md:text-xl max-w-3xl mx-auto ${settings.sectionTextFontSize}`} style={{color: settings.homeParallaxSubtitleColor}}>{settings.homeParallaxSubtitle}</p>
              <ReadMoreButton path="/services" />
          </div>
      </section>

      <section id="featured" className="py-16 sm:py-24 bg-black">
        <div className={`container mx-auto px-6 ${settings.containerWidth}`}>
          <div className="text-center mb-12">
            <p className={`${settings.sectionSubtitleFontSize} font-semibold uppercase tracking-widest mb-1`} style={{color: settings.sectionSubtitleColor}}>Our Products</p>
            <h2 className={`${settings.sectionTitleFontSize} font-bold`} style={{color: settings.sectionTitleColor, fontFamily: settings.sectionTitleFontFamily}}>100% Pure</h2>
            <p className={`max-w-2xl mx-auto mt-4 ${settings.sectionTextFontSize}`} style={{color: settings.sectionTextColor}}>Perfumes Have The Unique Power To Evoke Emotions, Lift Your Spirits And Energize You In Ways You Never Thought Possible.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.slice(0, 3).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
           <div className="text-center mt-16">
              <Link
                href="/shopping"
                className="inline-block py-3 px-8 rounded-md text-lg font-semibold border transition-colors duration-300"
                style={{
                  borderColor: settings.primaryColor,
                  color: settings.primaryColor,
                }}
                onMouseEnter={e => {
                    e.currentTarget.style.backgroundColor = settings.primaryColor;
                    e.currentTarget.style.color = settings.accentTextColor;
                }}
                onMouseLeave={e => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = settings.primaryColor;
                }}
              >
                  See More
              </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
