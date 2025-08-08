
import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Banner } from '../context/SettingsContext';
import { useSettings } from '../context/SettingsContext';

interface BannerCarouselProps {
    banners: Banner[];
}

const ChevronLeftIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
    </svg>
);

const ChevronRightIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
);

const BannerCarousel: React.FC<BannerCarouselProps> = ({ banners }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const { settings } = useSettings();

    const goToPrevious = useCallback(() => {
        if (banners.length > 0) {
            setCurrentIndex(prevIndex => (prevIndex - 1 + banners.length) % banners.length);
        }
    }, [banners.length]);

    const goToNext = useCallback(() => {
        if (banners.length > 0) {
            setCurrentIndex(prevIndex => (prevIndex + 1) % banners.length);
        }
    }, [banners.length]);

    // Auto-scroll functionality that resets on manual interaction
    useEffect(() => {
        if (banners.length > 1) {
            const timer = setInterval(goToNext, 5000); // Auto-scroll every 5 seconds
            return () => clearInterval(timer);
        }
    // When any manual control changes `currentIndex`, this effect re-runs, 
    // clearing the old timer and starting a new one.
    }, [currentIndex, goToNext, banners.length]);

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            goToPrevious();
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            goToNext();
        }
    };

    if (!banners || banners.length === 0) {
        return null;
    }

    return (
        <section 
            className="group relative h-[60vh] w-full overflow-hidden bg-gray-900 focus:outline-none" 
            role="region" 
            aria-roledescription="carousel" 
            aria-label="Promotional Banners"
            tabIndex={0}
            onKeyDown={handleKeyDown}
        >
            <div 
                className="flex transition-transform ease-in-out duration-700 h-full"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {banners.map((banner, index) => (
                    <div 
                        key={`${banner.id}-${index}`}
                        className="relative h-full w-full flex-shrink-0 bg-cover bg-center flex items-center justify-center text-white"
                        style={{ backgroundImage: `url('${banner.imageUrl}')` }}
                        role="group"
                        aria-roledescription="slide"
                        aria-label={`${index + 1} of ${banners.length}`}
                        aria-hidden={currentIndex !== index}
                    >
                        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
                        <div className="relative z-10 text-center p-6 max-w-4xl mx-auto">
                            <h1 className="text-3xl md:text-5xl font-bold tracking-tight" style={{fontFamily: 'serif'}}>{banner.title}</h1>
                            <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">{banner.subtitle}</p>
                            {banner.buttonText && banner.buttonLink && (
                                <Link 
                                    to={banner.buttonLink} 
                                    className="mt-8 inline-block py-3 px-8 rounded-md text-lg font-semibold transition-transform duration-300 hover:scale-105"
                                    style={{ backgroundColor: settings.primaryColor, color: settings.accentTextColor }}
                                >
                                    {banner.buttonText}
                                </Link>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            
            {banners.length > 1 && (
                <>
                    {/* Previous Button */}
                    <button 
                        onClick={goToPrevious}
                        className="absolute top-1/2 left-4 -translate-y-1/2 z-20 p-2 bg-black/30 rounded-full text-white opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300 hover:bg-black/50 focus:outline-none focus:ring-2 focus:ring-white"
                        aria-label="Previous slide"
                    >
                        <ChevronLeftIcon className="h-8 w-8" />
                    </button>
                    {/* Next Button */}
                    <button 
                        onClick={goToNext}
                        className="absolute top-1/2 right-4 -translate-y-1/2 z-20 p-2 bg-black/30 rounded-full text-white opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300 hover:bg-black/50 focus:outline-none focus:ring-2 focus:ring-white"
                        aria-label="Next slide"
                    >
                        <ChevronRightIcon className="h-8 w-8" />
                    </button>

                    {/* Dots Navigation */}
                    <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
                        {banners.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${currentIndex === index ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'}`}
                                aria-label={`Go to slide ${index + 1}`}
                                aria-current={currentIndex === index}
                            ></button>
                        ))}
                    </div>
                </>
            )}
        </section>
    );
};

export default BannerCarousel;
