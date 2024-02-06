import React, { useEffect } from 'react';
import Categories from '../components/Categories';
import { Footer } from '../components/Footer';
import { Navbar } from '../components/Navbar';
import { Slider } from '../components/Slider';
import { Testimonials } from '../components/Testimonials';
import { Products } from './product/Products';

/*
  Home Component

 - Represents the main page of the application by rendering each component.
*/

export const Home = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [window.location.pathname]);

    return (
        <>
            <Navbar />

            <Slider />

            <Categories />

            <Products />

            <Testimonials />

            <Footer />
        </>
    )
}