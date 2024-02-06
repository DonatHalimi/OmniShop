import React from 'react';

/*
    Testimonials Component
    
   - Displays customer testimonials in a responsive and visually appealing layout.
   - Utilizes Pravatar for placeholder profile images.
   - Each testimonial includes the customer's name, profile image, and a quote.
   - The component aims to build trust and credibility by showcasing positive customer experiences.
   - Creates an engaging and interactive section for users to explore.
*/

export const Testimonials = () => {
    return (
        <div className="min-w-screen min-h-screen flex items-center justify-center py-5 mt-40">
            <div className="w-full border-t px-5 py-16 md:py-24 text-gray-800">
                <div className="w-full max-w-6xl mx-auto">
                    <div className="text-center max-w-xl mx-auto">
                        <h1 className="text-6xl md:text-7xl font-bold mb-5 text-gradient-gray leading-tight select-none">Discover <br />Customer Stories</h1>
                        <h3 className="text-xl mb-5 font-light select-none">Explore the joy of cutting-edge products through our customers' experiences.</h3>
                        <div className="text-center mb-10">
                            <span className="inline-block w-1 h-1 rounded-full bg-gray-600 ml-1"></span>
                            <span className="inline-block w-3 h-1 rounded-full bg-gray-600 ml-1"></span>
                            <span className="inline-block w-40 h-1 rounded-full bg-gray-600"></span>
                            <span className="inline-block w-3 h-1 rounded-full bg-gray-600 ml-1"></span>
                            <span className="inline-block w-1 h-1 rounded-full bg-gray-600 ml-1"></span>
                        </div>
                    </div>
                    <div className="-mx-3 md:flex items-start">
                        <div className="px-3 md:w-1/3">
                            <div className="w-full mx-auto rounded-lg bg-white border border-gray-200 p-5 text-gray-800 font-light mb-6">
                                <div className="w-full flex mb-4 items-center">
                                    <div className="overflow-hidden rounded-full w-10 h-10 bg-gray-50 border border-gray-200 select-none">
                                        <img src="https://i.pravatar.cc/100?img=1" alt="" />
                                    </div>
                                    <div className="flex-grow pl-3">
                                        <h6 className="font-bold text-sm uppercase text-gray-600">Kenzie Edgar</h6>
                                    </div>
                                </div>
                                <div className="w-full">
                                    <p className="text-sm leading-tight"><span className="text-lg leading-none italic font-bold text-gray-400 mr-1 select-none">"</span>Absolutely love this store! The product variety is amazing, and the staff is super helpful. Got my new gadget here, and it's been a game-changer for work and play!<span className="text-lg leading-none italic font-bold text-gray-400 ml-1 select-none">"</span></p>
                                </div>
                            </div>
                            <div className="w-full mx-auto rounded-lg bg-white border border-gray-200 p-5 text-gray-800 font-light mb-6">
                                <div className="w-full flex mb-4 items-center">
                                    <div className="overflow-hidden rounded-full w-10 h-10 bg-gray-50 border border-gray-200 select-none">
                                        <img src="https://i.pravatar.cc/100?img=2" alt="" />
                                    </div>
                                    <div className="flex-grow pl-3">
                                        <h6 className="font-bold text-sm uppercase text-gray-600">Stevie Tifft</h6>
                                    </div>
                                </div>
                                <div className="w-full">
                                    <p className="text-sm leading-tight"><span className="text-lg leading-none italic font-bold text-gray-400 mr-1 select-none">"</span>I'm a tech enthusiast, and this store is my go-to. The knowledgeable staff helped me pick the perfect gadgets. Great service, and I always recommend it to my friends.<span className="text-lg leading-none italic font-bold text-gray-400 ml-1 select-none">"</span></p>
                                </div>
                            </div>
                        </div>
                        <div className="px-3 md:w-1/3">
                            <div className="w-full mx-auto rounded-lg bg-white border border-gray-200 p-5 text-gray-800 font-light mb-6">
                                <div className="w-full flex mb-4 items-center">
                                    <div className="overflow-hidden rounded-full w-10 h-10 bg-gray-50 border border-gray-200 select-none">
                                        <img src="https://i.pravatar.cc/100?img=3" alt="" />
                                    </div>
                                    <div className="flex-grow pl-3">
                                        <h6 className="font-bold text-sm uppercase text-gray-600">Tommie Ewart</h6>
                                    </div>
                                </div>
                                <div className="w-full">
                                    <p className="text-sm leading-tight"><span className="text-lg leading-none italic font-bold text-gray-400 mr-1 select-none">"</span>Discovering OmniShop was a game-changer for my wardrobe! The store offers a unique blend of trendy and classic pieces that perfectly suit my style. From casual wear to elegant evening attire, they have it all. <span className="text-lg leading-none italic font-bold text-gray-400 ml-1 select-none">"</span></p>
                                </div>
                            </div>
                            <div className="w-full mx-auto rounded-lg bg-white border border-gray-200 p-5 text-gray-800 font-light mb-6">
                                <div className="w-full flex mb-4 items-center">
                                    <div className="overflow-hidden rounded-full w-10 h-10 bg-gray-50 border border-gray-200 select-none">
                                        <img src="https://i.pravatar.cc/100?img=4" alt="" />
                                    </div>
                                    <div className="flex-grow pl-3">
                                        <h6 className="font-bold text-sm uppercase text-gray-600">Charlie Howse</h6>
                                    </div>
                                </div>
                                <div className="w-full">
                                    <p className="text-sm leading-tight"><span className="text-lg leading-none italic font-bold text-gray-400 mr-1 select-none">"</span>Kudos to the team at this store! Their expertise helped me build a top-notch gaming rig. The range of products is impressive, and the service is excellent.<span className="text-lg leading-none italic font-bold text-gray-400 ml-1 select-none">"</span></p>
                                </div>
                            </div>
                        </div>
                        <div className="px-3 md:w-1/3">
                            <div className="w-full mx-auto rounded-lg bg-white border border-gray-200 p-5 text-gray-800 font-light mb-6">
                                <div className="w-full flex mb-4 items-center">
                                    <div className="overflow-hidden rounded-full w-10 h-10 bg-gray-50 border border-gray-200 select-none">
                                        <img src="https://i.pravatar.cc/100?img=5" alt="" />
                                    </div>
                                    <div className="flex-grow pl-3">
                                        <h6 className="font-bold text-sm uppercase text-gray-600">Nevada Herbertson</h6>
                                    </div>
                                </div>
                                <div className="w-full">
                                    <p className="text-sm leading-tight"><span className="text-lg leading-none italic font-bold text-gray-400 mr-1 select-none">"</span>I am thrilled with the amazing collection and quality of clothing at OmniShop. Every piece I've purchased has not only been stylish but also incredibly well-made.<span className="text-lg leading-none italic font-bold text-gray-400 ml-1 select-none">"</span></p>
                                </div>
                            </div>
                            <div className="w-full mx-auto rounded-lg bg-white border border-gray-200 p-5 text-gray-800 font-light mb-6">
                                <div className="w-full flex mb-4 items-center">
                                    <div className="overflow-hidden rounded-full w-10 h-10 bg-gray-50 border border-gray-200 select-none">
                                        <img src="https://i.pravatar.cc/100?img=6" alt="" />
                                    </div>
                                    <div className="flex-grow pl-3">
                                        <h6 className="font-bold text-sm uppercase text-gray-600">Kris Stanton</h6>
                                    </div>
                                </div>
                                <div className="w-full">
                                    <p className="text-sm leading-tight"><span className="text-lg leading-none italic font-bold text-gray-400 mr-1 select-none">"</span>As a tech professional, I appreciate a store that caters to my specific needs. Found everything I was looking for, and the advice from the staff was spot-on. Highly recommend!<span className="text-lg leading-none italic font-bold text-gray-400 ml-1 select-none">"</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};