

import React from 'react';
import { GiftIcon, BriefcaseIcon, TargetIcon } from '../components/icons';
import { useSettings } from '../context/SettingsContext';

const ServiceCard: React.FC<{
    icon: React.ReactNode;
    subtitle: string;
    title: string;
    children: React.ReactNode;
}> = ({ icon, subtitle, title, children }) => {
    const { settings } = useSettings();
    return (
        <div className="p-8 rounded-lg shadow-xl flex flex-col md:flex-row items-start gap-8" style={{backgroundColor: settings.cardBackgroundColor}}>
            <div style={{color: settings.primaryColor}} className="shrink-0 bg-gray-900 p-4 rounded-full">
                {icon}
            </div>
            <div>
                <p className={`${settings.sectionSubtitleFontSize} font-semibold uppercase tracking-widest mb-1`} style={{color: settings.primaryColor}}>{subtitle}</p>
                <h2 className={`${settings.sectionTitleFontSize} font-bold mb-3`} style={{ fontFamily: settings.sectionTitleFontFamily, color: settings.textColor }}>{title}</h2>
                <div className={`text-gray-400 leading-relaxed space-y-4 ${settings.sectionTextFontSize}`}>
                    {children}
                </div>
            </div>
        </div>
    )
};


const ServicesPage: React.FC = () => {
    const { settings } = useSettings();
    return (
        <div className="bg-black">
            <div className={`container mx-auto px-6 py-12 sm:py-20 text-gray-300 ${settings.containerWidth}`}>
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <h1 className={`${settings.pageTitleFontSize} font-bold`} style={{ fontFamily: 'serif', color: settings.textColor }}>
                            Our Services & Philosophy
                        </h1>
                        <p className={`max-w-2xl mx-auto mt-4 text-gray-400 ${settings.sectionTextFontSize}`}>Discover our commitment to quality, heritage, and the timeless art of perfumery.</p>
                    </div>

                    <div className="space-y-12">
                        <ServiceCard
                            icon={<GiftIcon className="w-10 h-10" />}
                            subtitle="What We Do"
                            title="Perfumes for a Lifetime"
                        >
                            <p>
                                Yasir Perfumes is a wholesaler, retailer, and manufacturing company of Oud, Athar, Bakhoor & Scent items. We proudly admire our Arabian heritage and our one and only goal is to represent it to the world in the best way it should be.
                            </p>
                            <p>
                                For us, we do that through our products; every scent carries a piece of heritage, culture, and traditions of the Middle East. We always strive to reach the highest levels of excellence in quality and uniqueness.
                            </p>
                             <p className="text-sm italic text-gray-500">
                                <strong>Oud:</strong> The Arabic term for the highly prized incense that is cultivated from the Agarwood tree.
                            </p>
                        </ServiceCard>

                        <ServiceCard
                            icon={<BriefcaseIcon className="w-10 h-10" />}
                            subtitle="Our Vision"
                            title="Experienced Team & Professional"
                        >
                            <p>
                                We always strive to reach the highest levels of excellence. Whether it's quality or uniqueness in our products or the way we gather our thoughts to take the highest levels of competitiveness and reaching the skies. Admiring charming scents, exquisite designs, velvet touch and legendary imaginations. Seeing the sophistication in our clients' eyes is our aim.
                            </p>
                        </ServiceCard>
                        
                        <ServiceCard
                            icon={<TargetIcon className="w-10 h-10" />}
                            subtitle="Our Mission"
                            title="Why Choose Us?"
                        >
                           <p>
                             We thrive for perfection, diversity, sophistication and excellence in all our products. To achieve that we became creative with everything from the product itself to choosing distinctive designs for all our perfume bottles that preserve our Arabian culture and heritage.
                           </p>
                        </ServiceCard>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServicesPage;