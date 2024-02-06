import { faFacebook, faGithub, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from "../images/Logo.png";

export const Footer = () => {
    return (
        <footer className="px-20 divide-y bg-white dark:bg-gray-900 dark:text-gray-400">
            <div className="container flex flex-col justify-between py-10 mx-auto space-y-8 lg:flex-row lg:space-y-0">
                <div className="lg:w-1/3">
                    {/* Logo */}
                    <Link to={"/"}>
                        <img src={Logo} className='select-none' style={{ width: '250px' }} />
                    </Link>
                    <div className="py-4 text-sm text-left bg-white dark:bg-gray-900 dark:text-gray-400">
                        Your one-stop destination for a wide range of products.<br />Explore and shop with ease!
                    </div>
                </div>

                <div className="grid grid-cols-2 text-sm gap-x-3 gap-y-8 lg:w-2/3 sm:grid-cols-4">
                    <div className="space-y-4">
                        <h3 className="tracki uppercase dark:text-gray-50 select-none">Pages</h3>
                        <ul className="space-y-3 mt-2 mb-2">
                            <Link to={'/'}>
                                <li className="mb-2 hover:underline">Home</li>
                            </Link>
                            <Link to={'/about-us'}>
                                <li className="mb-2 hover:underline">About</li>
                            </Link>
                            <Link to={'/contact'}>
                                <li className="mb-2 hover:underline">Contact</li>
                            </Link>
                            <Link to={'/cart'}>
                                <li className="mb-2 hover:underline">Cart</li>
                            </Link>
                            <Link to={'/wishlist'}>
                                <li className="mb-2 hover:underline">Wishlist</li>
                            </Link>
                        </ul>
                    </div>
                    <div className="space-y-3">
                        <h3 className="tracki uppercase dark:text-gray-50 select-none">Company</h3>
                        <ul className="space-y-1">
                            <Link to={'/faq'}>
                                <li className="mb-2 hover:underline">FAQ</li>
                            </Link>
                            <Link to={'/privacy-policy'}>
                                <li className="mb-2 hover:underline">Privacy Policy</li>
                            </Link>
                        </ul>
                    </div>
                    <div className="space-y-3">
                        <h3 className="uppercase dark:text-gray-50 select-none">Contact</h3>
                        <ul className="space-y-1">
                            <li>
                                <a rel="noopener noreferrer" className='hover:underline' href="mailto:omnishop@support.com">omnishop@support.com</a>
                            </li>
                            <li>
                                <a rel="noopener noreferrer">+383 44 123 123</a>
                            </li>
                            <li>
                                <a rel="noopener noreferrer">or Viber / WhatsApp</a>
                            </li>
                            <li>
                                <a rel="noopener noreferrer">+383 45 321 321</a>
                            </li>
                            <li>
                                <a rel="noopener noreferrer">Lagjja Kalabria, 10000 Prishtinë, Kosovë</a>
                            </li>
                        </ul>
                    </div>
                    <div className="space-y-3">
                        <div className="uppercase dark:text-gray-50 select-none">Social media</div>
                        <div className="flex justify-start space-x-3">
                            <a rel="noopener noreferrer" href="https://www.facebook.com" target='_blank' title="Facebook" className="flex items-center p-1">
                                <FontAwesomeIcon icon={faFacebook} style={{ fontSize: '20px' }} />
                            </a>
                            <a rel="noopener noreferrer" href="https://twitter.com" target='_blank' title="Twitter" className="flex items-center p-1">
                                <FontAwesomeIcon icon={faTwitter} style={{ fontSize: '20px' }} />
                            </a>
                            <a rel="noopener noreferrer" href="https://www.instagram.com" target='_blank' title="Instagram" className="flex items-center p-1">
                                <FontAwesomeIcon icon={faInstagram} style={{ fontSize: '20px' }} />
                            </a>
                            <a rel="noopener noreferrer" href="https://github.com/DonatHalimi" target='_blank' title="Instagram" className="flex items-center p-1">
                                <FontAwesomeIcon icon={faGithub} style={{ fontSize: '20px' }} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-6 text-sm text-center dark:text-gray-400 select-none">© 2024 OmniShop Co. All rights reserved.</div>
        </footer>
    )
}
