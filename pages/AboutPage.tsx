

import React from 'react';
import { MapPinIcon, MailIcon, PhoneIcon } from '../components/icons';
import { useSettings } from '../context/SettingsContext';

const AboutPage: React.FC = () => {
    const { settings } = useSettings();
    
    return (
        <div className="bg-black text-gray-300">
            {/* Main Content */}
            <div className={`container mx-auto px-6 py-12 sm:py-20 ${settings.containerWidth}`}>
                <h1 className={`${settings.pageTitleFontSize} font-bold text-center mb-12`} style={{fontFamily: 'serif', color: settings.textColor}}>
                    About Us
                </h1>

                {/* About Our Group Section */}
                <section className="mb-24">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="text-left">
                            <p className={`${settings.sectionSubtitleFontSize} font-semibold uppercase tracking-widest mb-1`} style={{color: settings.sectionSubtitleColor}}>What We Do</p>
                            <h2 className={`${settings.sectionTitleFontSize} font-bold mb-4`} style={{fontFamily: settings.sectionTitleFontFamily, color: settings.sectionTitleColor}}>About Our Group History</h2>
                            <div className={`space-y-4 leading-relaxed ${settings.sectionTextFontSize}`} style={{color: settings.sectionTextColor}}>
                                <p>
                                    Yasir Perfumes Is A Group Of One Of The Leading Industrial Perfumes Dealer In Kerala. We Are Wholesalers, Retailers And Manufacturing Company Of Oud Athar Bakhoor & Scent Items. We Are Dealing With All International Branded Products.
                                </p>
                                <p>
                                    We Do What We Love And So We Always Explore The Changing Trends To Consistently Cater For The Tastes Of Our Discerning Customers. Yasir perfumes Expert In Exploring The Purity In Fragrance From A Splendid Array Of Oudh And Also Launching Awesome Oriental And French Line Perfumes To Suite The Taste Of All The Customers.
                                </p>
                                <p>
                                    Perfumes Have The Unique Power To Evoke Emotions, Lift Your Spirits And Energize You In Ways You Never Thought Possible. The Right Perfume Can Not Only Become A Part Of Your Identity, It Can Also Help You Build A Distinct Personality And Image.
                                </p>
                            </div>
                        </div>
                        <div className="rounded-lg overflow-hidden shadow-2xl">
                             <img src={settings.aboutPageHistoryImageUrl} alt="Perfume Bottle" className="w-full h-full object-cover"/>
                        </div>
                    </div>
                </section>

                {/* Map and Contact Section */}
                <section>
                    <div className="grid md:grid-cols-5 gap-0 items-stretch overflow-hidden rounded-lg shadow-2xl" style={{backgroundColor: settings.cardBackgroundColor}}>
                        <div className="md:col-span-3">
                            <iframe 
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.407986348986!2d76.28036287588502!3d9.98380387340075!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b08736f8f4a4d6b%3A0x8b32026fa858356!2sBroadway%2C%2A%20Ernakulam%2C%20Kerala!5e0!3m2!1sen!2sin!4v1689252981504!5m2!1sen!2sin" 
                                width="100%" 
                                height="100%" 
                                style={{border:0, minHeight: '450px'}} 
                                allowFullScreen={true} 
                                loading="lazy" 
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Location of Yasir Perfumes on Google Maps"
                            ></iframe>
                        </div>
                        <div className="md:col-span-2 p-8 flex flex-col justify-center">
                            <h2 className="text-2xl font-bold mb-6" style={{fontFamily: 'serif', color: settings.textColor}}>Contact Info</h2>
                             <div className="space-y-6">
                                <div className="flex items-start space-x-4">
                                    <MapPinIcon className="w-7 h-7 mt-1 shrink-0" style={{color: settings.primaryColor}} />
                                    <div>
                                        <h3 className="font-bold text-lg" style={{color: settings.textColor}}>Address</h3>
                                        <p className="text-gray-400">K P G Enclave, Broadway south end, Ernakulam, Kochi-682031</p>
                                    </div>
                                </div>
                                 <div className="flex items-start space-x-4">
                                    <MailIcon className="w-7 h-7 mt-1 shrink-0" style={{color: settings.primaryColor}} />
                                    <div>
                                        <h3 className="font-bold text-lg" style={{color: settings.textColor}}>Email</h3>
                                        <a href="mailto:yasirperfumes@gmail.com" className="text-gray-400 hover:text-amber-400 transition-colors">yasirperfumes@gmail.com</a>
                                    </div>
                                </div>
                                 <div className="flex items-start space-x-4">
                                    <PhoneIcon className="w-7 h-7 mt-1 shrink-0" style={{color: settings.primaryColor}} />
                                    <div>
                                        <h3 className="font-bold text-lg" style={{color: settings.textColor}}>Call Us</h3>
                                        <a href="tel:+919388877777" className="text-gray-400 hover:text-amber-400 transition-colors">(+91) 93888 77777</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default AboutPage;
