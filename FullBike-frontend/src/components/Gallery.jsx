import PropTypes from 'prop-types';
import '../styles/Gallery.css';

// Import local images
import image1 from '../assets/images/image1.jpg';
import image2 from '../assets/images/image2.jpg';
import image3 from '../assets/images/image3.jpg';
import image4 from '../assets/images/image4.jpg';
import image5 from '../assets/images/image5.jpg';
import image6 from '../assets/images/image6.jpg';
import image7 from '../assets/images/image7.jpg';
import image8 from '../assets/images/image8.jpg';
import image9 from '../assets/images/image9.jpg';
import image10 from '../assets/images/image10.jpg';
import fullbike1 from '../assets/images/fullbike1.jpeg';
import fullbike2 from '../assets/images/fullbike2.jpeg';
import fullbike3 from '../assets/images/fullbike3.jpeg';
import fullbike4 from '../assets/images/fullbike4.jpeg';
import fullbike5 from '../assets/images/fullbike5.jpeg';
import fullbike6 from '../assets/images/fullbike6.jpeg';

const images = [
    image1, image2, image3, image4,
    image5, image6, image7, image8,
    image9, image10, fullbike1, fullbike2,
    fullbike3, fullbike4, fullbike5, fullbike6,
];

export default function Gallery() {
    return (
        <div className="gallery-container">
            {images.map((src, index) => (
                <div key={index} className="gallery-item">
                    <img src={src} alt={`Gallery item ${index + 1}`} />
                </div>
            ))}
        </div>
    );
}

Gallery.propTypes = {
    images: PropTypes.arrayOf(PropTypes.string),
};