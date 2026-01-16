import { Link } from 'react-router-dom';
import { footerLinks } from '../assets/assets';
import { assets } from '../assets/assets';

const Footer = () => {

    return (
        <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-24 bg-primary/10">
            <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-500/30 text-gray-500">

                <div className="flex flex-col items-start gap-4">
                    <img className="h-20 md:h-24 object-contain" src={assets.logo} alt="logo" />
                    <p className="max-w-[410px]">
                        We deliver fresh groceries and healthy snacks straight to your door.
                        Trusted by thousands, we aim to make your shopping experience simple,
                        affordable, and sustainable.
                    </p>
                </div>

                <div className="flex flex-wrap justify-between w-full md:w-[50%] gap-10">
                    {footerLinks.map((section, index) => (
                        <div key={index} className="min-w-[150px]">
                            <h3 className="font-bold text-gray-900 mb-4">{section.title}</h3>
                            <ul className="text-sm space-y-2">
                                {section.links.map((link, i) => (
                                    <li key={i}>
                                        {link.url.startsWith('/') ? (
                                            <Link
                                                to={link.url}
                                                onClick={() => window.scrollTo(0, 0)}
                                                className="hover:text-primary transition-colors cursor-pointer"
                                            >
                                                {link.text}
                                            </Link>
                                        ) : (
                                            <a
                                                href={link.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="hover:text-primary transition-colors"
                                            >
                                                {link.text}
                                            </a>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
            <p className="py-4 text-center text-sm md:text-base text-gray-500/70">
                Copyright {new Date().getFullYear()} © Grocerra.dev All Right Reserved.
            </p>
        </div>
    );
};

export default Footer;