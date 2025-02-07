import * as React from "react";
import {useEffect, useRef, useState} from "react";
import {Box} from "@chakra-ui/react";
import MasonryGallery from "./MasonryGallery";

export default function ResonsiveMasonryGallery({data}) {
    const galleryRef = useRef(null);
    const [galleryCols, setGalleryCols] = useState(1);

    useEffect(() => {
        function updateGalleryCols() {
            if (galleryRef.current) {
                const galleryWidth = galleryRef.current.offsetWidth;
                const minPhotoWidth = 400;
                setGalleryCols(Math.max(1, Math.floor(galleryWidth / minPhotoWidth)));
            }
        }

        const resizeObserver = new ResizeObserver(updateGalleryCols)
        if (galleryRef.current) {
            resizeObserver.observe(galleryRef.current);
            updateGalleryCols();
        }

        return () => resizeObserver.disconnect();
    }, []);

    return (
        <Box ref={galleryRef}>
            <MasonryGallery data={data} numCols={galleryCols}/>
        </Box>
    )
}