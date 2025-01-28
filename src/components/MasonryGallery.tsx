import * as React from "react";
import {Box} from "@chakra-ui/react";
import {GatsbyImage, getImage} from "gatsby-plugin-image";


export default function MasonryGallery({data}) {
    const images = data.allFile.nodes;

    return (
        <Box sx={{columnCount: [1, 2, 3], columnGap: "8px"}} marginTop="25px">
            {images.map((imageNode, index) => {
                const image = getImage(imageNode.childImageSharp.gatsbyImageData);
                return (
                    <Box padding="10px">
                        <GatsbyImage key={index} image={image} alt={`Image ${index + 1}`}/>
                    </Box>
                );
            })}
        </Box>
    )
}