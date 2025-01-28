import {useState} from "react";
import * as React from "react";
import {Box} from "@chakra-ui/react";
import {GatsbyImage, getImage} from "gatsby-plugin-image";
import ImageSpotlight from "../components/ImageSpotlight";


export default function MasonryGallery({data}) {
    const images = data.allFile.nodes;

    const [spotlightIsOpen, setSpotlightIsOpen] = useState(false);
    const [spotlightImageNode, setSpotlightImageNode] = useState(null);
    const onImageClick = (imgNode) => {
        setSpotlightImageNode(imgNode);
        setSpotlightIsOpen(true);
    }

    return (
        <>
            <ImageSpotlight open={spotlightIsOpen} setOpen={setSpotlightIsOpen}
                            imageNode={spotlightImageNode}></ImageSpotlight>
            <Box sx={{columnCount: [1, 2, 3], columnGap: "8px"}} marginTop="25px">
                {images.map((imageNode, index) => {
                    const image = getImage(imageNode.childImageSharp.gatsbyImageData);
                    return (
                        <Box padding="10px" onClick={() => onImageClick(imageNode)}>
                            <GatsbyImage
                                key={index}
                                image={image}
                                alt={`Image ${index + 1}`}
                                style={{cursor: "pointer"}}/>
                        </Box>
                    );
                })}
            </Box>
        </>
    )
}