import React from 'react';
import { useSettings } from '../context/SettingsContext';
import { PhoneIcon, MailIcon, HeadsetIcon, MapPinIcon, FacebookIcon, InstagramIcon, YouTubeIcon } from '../components/icons';
import { Link } from 'react-router-dom';

const ContactInfoCard: React.FC<{ icon: React.ReactNode, title: string, children: React.ReactNode }> = ({ icon, title, children }) => {
    const { settings } = useSettings();
    return (
        <div className="flex flex-col items-center text-center p-6 bg-gray-900 rounded-lg">
            <div className="p-4 bg-gray-800 rounded-full mb-4" style={{ color: settings.primaryColor }}>
                {icon}
            </div>
            <h3 className="font-semibold text-lg" style={{color: settings.textColor}}>{title}</h3>
            <div className="text-gray-400 text-sm">{children}</div>
        </div>
    );
};

const ContactPage: React.FC = () => {
    const { settings } = useSettings();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert("Thank you for your message! We will get back to you soon.");
        const form = e.target as HTMLFormElement;
        form.reset();
    };

    return (
        <div className="bg-black text-gray-300">
            <section className="relative py-20 bg-gray-900">
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="relative container mx-auto px-6 text-center text-white z-10">
                    <p className="font-semibold uppercase tracking-widest" style={{color: settings.primaryColor}}>Keep in Touch</p>
                    <h1 className={`${settings.pageTitleFontSize} font-bold`} style={{ fontFamily: 'serif' }}>
                        Contact Us
                    </h1>
                    <div className="text-lg text-gray-400">
                        <Link to="/">HOME</Link> / CONTACT US
                    </div>
                </div>
            </section>

            <section className="py-16 sm:py-24">
                <div className={`container mx-auto px-6 ${settings.containerWidth}`}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                        <ContactInfoCard icon={<PhoneIcon className="w-8 h-8" />} title="(+91) 93888 77777">
                            <a href="tel:+919388877777" className="hover:text-amber-400 transition-colors">Give us a call</a>
                        </ContactInfoCard>
                        <ContactInfoCard icon={<MailIcon className="w-8 h-8" />} title="YASIRPERFUMES@GMAIL.COM">
                            <a href="mailto:YASIRPERFUMES@GMAIL.COM" className="hover:text-amber-400 transition-colors">Send us an email</a>
                        </ContactInfoCard>
                        <ContactInfoCard icon={<HeadsetIcon className="w-8 h-8" />} title="24/7 Customer Support">
                            <p>We are here to help</p>
                        </ContactInfoCard>
                    </div>

                    <div className="grid lg:grid-cols-5 gap-12 items-start">
                        <div className="lg:col-span-2">
                             <p className={`${settings.sectionSubtitleFontSize} font-semibold uppercase tracking-widest mb-1`} style={{color: settings.primaryColor}}>Keep in Touch</p>
                             <h2 className="text-3xl font-bold mb-4" style={{fontFamily: 'serif', color: settings.textColor}}>Contact Us</h2>
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
                            </div>
                            <div className="flex space-x-6 mt-8">
                                {settings.facebook && (
                                    <a href={settings.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-gray-400 hover:text-white transition-colors duration-300">
                                        <FacebookIcon className="h-6 w-6" />
                                    </a>
                                )}
                                {settings.instagram && (
                                    <a href={settings.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-400 hover:text-white transition-colors duration-300">
                                        <InstagramIcon className="h-6 w-6" />
                                    </a>
                                )}
                                {settings.youtube && (
                                    <a href={settings.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-gray-400 hover:text-white transition-colors duration-300">
                                        <YouTubeIcon className="h-6 w-6" />
                                    </a>
                                )}
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="lg:col-span-3 p-8 rounded-lg shadow-lg" style={{backgroundColor: settings.cardBackgroundColor}}>
                            <div className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="sr-only">Your Name</label>
                                    <input type="text" id="name" name="name" required placeholder="Your name" className="w-full bg-gray-800 border border-gray-700 rounded-md p-3 text-white focus:ring-amber-500 focus:border-amber-500" />
                                </div>
                                <div>
                                    <label htmlFor="email" className="sr-only">Email Address</label>
                                    <input type="email" id="email" name="email" required placeholder="Email Address" className="w-full bg-gray-800 border border-gray-700 rounded-md p-3 text-white focus:ring-amber-500 focus:border-amber-500" />
                                </div>
                                <div>
                                    <label htmlFor="message" className="sr-only">Your Message</label>
                                    <textarea id="message" name="message" required rows={5} placeholder="Your Message" className="w-full bg-gray-800 border border-gray-700 rounded-md p-3 text-white focus:ring-amber-500 focus:border-amber-500"></textarea>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full py-3 px-4 rounded-md font-semibold transition-colors duration-300"
                                    style={{ backgroundColor: settings.primaryColor, color: settings.accentTextColor }}
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
            
            <section>
                 <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.407986348986!2d76.28036287588502!3d9.98380387340075!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b08736f8f4a4d6b%3A0x8b32026fa858356!2sBroadway%2C%2A%20Ernakulam%2C%20Kerala!5e0!3m2!1sen!2sin!4v1689252981504!5m2!1sen!2sin" 
                    width="100%" 
                    height="450" 
                    style={{border:0}} 
                    allowFullScreen={true} 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Location of Yasir Perfumes on Google Maps"
                ></iframe>
            </section>
        </div>
    );
};

export default ContactPage;
