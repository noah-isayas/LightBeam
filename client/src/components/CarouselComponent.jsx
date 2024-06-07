import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import WatchScreen from "./WatchScreen.jsx";
import ImageTemplate from "./ImageTemplate.jsx"; // Make sure the path is correct

function CarouselComponent() {
    return (
        <div className="carousel-container">
            <Carousel showArrows={true} infiniteLoop={true} showThumbs={false}>
                <div>
                    <WatchScreen/>
                </div>
                <div>
                    <WatchScreen/>
                </div>
                <div>
                    <ImageTemplate imageUrl={"kpmg.png"}/>
                </div>

            </Carousel>
        </div>
    );
}

export default CarouselComponent;
