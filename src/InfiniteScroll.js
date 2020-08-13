import React, { useState, useRef, useEffect } from 'react'
import imageService from './services/imageService';
const containerStyle = {
    display: 'flex',
    flexDirection: 'column'    
};

const InfiniteScroll = () => {

    const [images, setImages] = useState([]);
    const [page, setPage] = useState(1);
    const loaderRef = useRef(null);

    useEffect(() => {

        imageService.getPhotos(page).then(response => {
            setImages(images.concat(response.data));            
            setPage(page+1);
        });
    }, []);

    useEffect(() => {        
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 1.0
        };
        const observer = new IntersectionObserver(handleObserver, options);
        observer.observe(loaderRef.current);
    },[]);

    const handleObserver = (entities) => {
        const target = entities[0];
        if(target.isIntersecting){
            imageService.getPhotos(page).then(response => {
                setImages( (images) => images.concat(response.data));
                
                setPage((page) => page + 1);
            });
        }
    };

    return (
        <div style={containerStyle}>
            {
                images.map((image, index) => {
                    return (<div key={image.id}>
                        <img src={image.url} alt={image.title}></img>
                    </div>);
                })
            }
            <div ref={loaderRef}>
                <h2>
                    Loading more...
                </h2>
            </div>
        </div>
    );
}

export default InfiniteScroll;
