import {useState} from "react";
import * as React from "react";
import {VStack, HStack, Box} from "@chakra-ui/react";
import {GatsbyImage, getImage} from "gatsby-plugin-image";
import ImageSpotlight from "../components/ImageSpotlight";

const IMG_WIDTH = 400;

function distributeImages(images) {
    const numCols = 3;

    let distributedImages = [];
    for (let i = 0; i < numCols; i++) {
        distributedImages.push([])
    }

    let i = 0;
    while (images.length) {
        distributedImages[i].push(images.shift());
        i = (i + 1) % numCols;
    }

    return distributedImages;
}

export default function MasonryGallery({data}) {
    const images = data.allFile.nodes;
    const distributedImages = distributeImages(images);

    const [spotlightIsOpen, setSpotlightIsOpen] = useState(false);
    const [spotlightImageNode, setSpotlightImageNode] = useState(null);
    const onImageClick = (imgNode) => {
        setSpotlightImageNode(imgNode);
        setSpotlightIsOpen(true);
    }

    return (
        <>
            <ImageSpotlight
                open={spotlightIsOpen}
                setOpen={setSpotlightIsOpen}
                imageNode={spotlightImageNode}
            ></ImageSpotlight>
            <HStack align='start' spacing={4}>
                {distributedImages.map((columnImages, colIndex) => {
                    return (
                        <VStack spacing={4}>
                            {columnImages.map((imageNode, index) => {
                                const image = getImage(imageNode.childImageSharp.gatsbyImageData);
                                return (
                                    <Box key={index} onClick={() => onImageClick(imageNode)}>
                                        <GatsbyImage
                                            image={image}
                                            alt={`Image ${index + 1}`}
                                            style={{width: IMG_WIDTH, cursor: "pointer"}}
                                        />
                                    </Box>
                                );
                            })}
                        </VStack>
                    )
                })}
            </HStack>
        </>
    )
}
