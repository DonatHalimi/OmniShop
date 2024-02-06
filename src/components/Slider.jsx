import { Splide, SplideSlide } from '@splidejs/react-splide';
import React from 'react';
import slider_1 from "../images/slider-1.png";
import slider_2 from "../images/slider-2.png";
import slider_3 from "../images/slider-3.png";
import slider_4 from "../images/slider-4.png";
import slider_5 from "../images/slider-5.png";
import slider_6 from "../images/slider-6.jpg";

/* 
    Slider Component
    
   - Utilizes the Splide carousel library for image slider functionality.
   - Imports images for each slide from local sources.
   - Renders a responsive image slider with multiple slides.
*/

export const Slider = () => {
    return (
        <Splide>
            <SplideSlide>
                <img src={slider_1} alt="Image 4" style={{ width: '1812px', height: '870.66px' }} />
            </SplideSlide>
            <SplideSlide>
                <img src={slider_2} alt="Image 2" style={{ width: '1812px', height: '870.66px' }} />
            </SplideSlide>
            <SplideSlide>
                <img src={slider_3} alt="Image 3" style={{ width: '1812px', height: '870.66px' }} />
            </SplideSlide>
            <SplideSlide>
                <img src={slider_4} alt="Image 4" style={{ width: '1812px', height: '870.66px' }} />
            </SplideSlide>
            <SplideSlide>
                <img src={slider_5} alt="Image 5" style={{ width: '1812px', height: '870.66px' }} />
            </SplideSlide>
            <SplideSlide>
                <img src={slider_6} alt="Image 6" style={{ width: '1812px', height: '870.66px' }} />
            </SplideSlide>
        </Splide >
    )
}