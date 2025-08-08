import React from 'react';
import { useSettings } from '@/src/context/SettingsContext';

const PrivacyPolicyPage: React.FC = () => {
    const { settings } = useSettings();
    const cardStyle = { backgroundColor: settings.cardBackgroundColor };

    return (
        <div className={`container mx-auto px-6 py-12 sm:py-20 text-gray-300 ${settings.containerWidth}`}>
            <div className="max-w-4xl mx-auto">
                <h1 className={`${settings.pageTitleFontSize} font-bold text-center mb-12`} style={{fontFamily: 'serif', color: settings.textColor}}>
                    Privacy & Policies
                </h1>

                <div 
                    className="prose prose-invert prose-lg max-w-none p-8 rounded-lg shadow-xl" 
                    style={cardStyle}
                    dangerouslySetInnerHTML={{ __html: settings.privacyPolicyContent }}
                />
            </div>
        </div>
    );
};

export default PrivacyPolicyPage;
