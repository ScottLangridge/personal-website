import * as React from "react";
import {AbsoluteCenter, Flex, Box, Center, Card} from "@chakra-ui/react";
import {GatsbyImage, getImage} from "gatsby-plugin-image";


export default function ImageSpotlight({open, setOpen, imageNode}) {
    const image = imageNode ? getImage(imageNode.childImageSharp.gatsbyImageData) : null;

    return (
        <Flex position="fixed" top="0" left="0" width="100vw" height="100vh" bg="rgba(0, 0, 0, 0.75)" zIndex="overlay" hidden={!open} onClick={() => {setOpen(false)}}>
            <AbsoluteCenter>
                    <GatsbyImage
                        image={image}
                        alt="img"
                        objectFit="contain"
                        style={{
                            maxWidth: "90vh",
                            maxHeight: "90vh",
                            width: "100%",
                            height: "100%",
                        }}
                    />
            </AbsoluteCenter>
        </Flex>
    )
}