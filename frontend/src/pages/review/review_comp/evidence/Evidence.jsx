import React, { useState, useEffect } from 'react';
import axios from "axios";
import "./Evidence.css";

const Evidence = () => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchDefinition = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/get_images`);
                console.log(response.data); // Check the structure of response data
                
                // Transform the object to an array format [{filename, description}]
                const imageArray = Object.entries(response.data).map(([filename, description]) => ({
                    filename,
                    description
                }));
                setImages(imageArray);
            } catch (error) {
                console.error("Error fetching images:", error.response ? error.response.data.message : error.message);
            }
        };

        fetchDefinition();
    }, []);

    return (
        <div className="image-grid">
            {images.length > 0 ? (
                images.map((image, index) => (
                    <div className="image-item" key={index}>
                        <img src={`http://localhost:5000/api/get_image/${image.filename}`} alt={image.description} />
                        <p>{image.description}</p>
                    </div>
                ))
            ) : (
                <p>No images available</p>
            )}
        </div>
    );
};

export default Evidence;
