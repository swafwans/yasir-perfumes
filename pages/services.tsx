
import React from 'react';
import { useSettings } from '@/src/context/SettingsContext';
import Image from 'next/image';

const ServicesPage: React.FC = () => {
    const { settings } = useSettings();
    return (
        <div className="bg-black text-gray-300">
             <section className="relative py-20 bg-gray-900">
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="relative container mx-auto px-6 text-center text-white z-10">
                    <h1 className={`${settings.pageTitleFontSize} font-bold`} style={{ fontFamily: 'serif' }}>
                        -Our Services-
                    </h1>
                    <p className="text-lg text-gray-400">HOME / SERVICES</p>
                </div>
            </section>
            
            <div className={`container mx-auto px-6 py-12 sm:py-20 ${settings.containerWidth}`}>
                <div className="space-y-24">

                    {/* Section 1: Perfumes for a Lifetime */}
                    <section className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="rounded-lg overflow-hidden shadow-2xl">
                             <img src="https://picsum.photos/seed/service1/800/900" alt="Perfume Showcase" width={800} height={900} className="w-full h-full object-cover"/>
                        </div>
                        <div className="text-left">
                            <p className={`${settings.sectionSubtitleFontSize} font-semibold uppercase tracking-widest mb-1`} style={{color: settings.primaryColor}}>What We Do</p>
                            <h2 className={`${settings.sectionTitleFontSize} font-bold mb-4`} style={{fontFamily: settings.sectionTitleFontFamily, color: settings.sectionTitleColor}}>Perfumes for a Lifetime</h2>
                            <div className={`space-y-4 leading-relaxed ${settings.sectionTextFontSize}`} style={{color: settings.sectionTextColor}}>
                                <p>
                                    Yasir Perfumes Is Wholesalers, Retailers And Manufacturing Company Of Oud Athar Bakhoor & Cent Items. We Proudly Admire Our Arabian Heritage And Our One And Only Goal Is To Represent It To The World In The Best Way It Should Be. For Us We Do That Through Our Products; Every Scent Carries A Piece Of Heritage, Culture And Traditions Of The Middle East In General And The Arab World In Particular. We Always Strive To Reach The Highest Levels Of Excellence. Whether It's Quality Or Uniqueness In Our Products Or The Way We Gather Our Thoughts To Take The Highest Levels Of Competitiveness And Reaching The Skies.
                                </p>
                                <p className="text-sm italic text-gray-500">
                                    Oud Is The Arabic Term For The Highly Prized Incense That Is Cultivated From The Agarwood Tree.
                                </p>
                            </div>
                        </div>
                    </section>
                    
                    {/* Section 2: Experience Team & Professional */}
                    <section className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="rounded-lg overflow-hidden shadow-2xl md:order-last">
                             <img src="https://picsum.photos/seed/service2/800/900" alt="Professional Perfume Bottles" width={800} height={900} className="w-full h-full object-cover"/>
                        </div>
                         <div className="text-left">
                            <p className={`${settings.sectionSubtitleFontSize} font-semibold uppercase tracking-widest mb-1`} style={{color: settings.primaryColor}}>Our Vision</p>
                            <h2 className={`${settings.sectionTitleFontSize} font-bold mb-4`} style={{fontFamily: settings.sectionTitleFontFamily, color: settings.sectionTitleColor}}>Experience Team & Professional</h2>
                            <div className={`space-y-4 leading-relaxed ${settings.sectionTextFontSize}`} style={{color: settings.sectionTextColor}}>
                                <p>
                                   We Always Strive To Reach The Highest Levels Of Excellence. Whether Its Quality Or Uniqueness In Our Products Or The Way We Gather Our Thoughts To Take The Highest Levels Of Competitiveness And Reaching The Skies. Admiring Charming Scents, Exquisite Designs, Velvet Touch And Legendary Imaginations. Seeing The Sophistication In Our Clients' Eyes Is Our Aim.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Section 3: Why Choose Us? */}
                     <section className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="rounded-lg overflow-hidden shadow-2xl">
                             <img src="https://picsum.photos/seed/service3/800/900" alt="Golden Perfume Bottle" width={800} height={900} className="w-full h-full object-cover"/>
                        </div>
                         <div className="text-left">
                            <p className={`${settings.sectionSubtitleFontSize} font-semibold uppercase tracking-widest mb-1`} style={{color: settings.primaryColor}}>Our Mission</p>
                            <h2 className={`${settings.sectionTitleFontSize} font-bold mb-4`} style={{fontFamily: settings.sectionTitleFontFamily, color: settings.sectionTitleColor}}>Why Choose Us ?</h2>
                            <div className={`space-y-4 leading-relaxed ${settings.sectionTextFontSize}`} style={{color: settings.sectionTextColor}}>
                               <p>
                                 We Thrive For Perfection, Diversity, Sophistication And Excellency In All Our Products. To Achieve That We Became Creative With Everything From The Product Itself To Choosing Distinctive Designs For All Our Perfume Bottles That Preserves Arabian Culture And Heritage.
                               </p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default ServicesPage;
