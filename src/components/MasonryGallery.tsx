import {useState} from "react";
import * as React from "react";
import {VStack, HStack, Box} from "@chakra-ui/react";
import {GatsbyImage, getImage} from "gatsby-plugin-image";
import ImageSpotlight from "../components/ImageSpotlight";

function distributeImages(images, numCols) {
    let distributedImages = [];

    for (let i = 0; i < numCols; i++) {
        distributedImages.push([])
    }

    images.forEach(((image, index) => {
        distributedImages[index % numCols].push(image);
    }));

    return distributedImages;
}

export default function MasonryGallery({data, numCols}) {
    const images = data.allFile.nodes;
    const distributedImages = distributeImages(images, numCols);

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
                {distributedImages.map((columnImages) => {
                    return (
                        <VStack width="100%" spacing={4}>
                            {columnImages.map((imageNode, index) => {
                                const image = getImage(imageNode.childImageSharp.gatsbyImageData);
                                return (
                                    <Box key={index} onClick={() => onImageClick(imageNode)}>
                                        <GatsbyImage
                                            image={image}
                                            alt={`Image ${index + 1}`}
                                            style={{cursor: "pointer"}}
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
