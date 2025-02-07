import * as React from "react";
import {useState, useEffect, useRef} from "react";
import {Box, Center, Container, Flex, Heading, Text} from "@chakra-ui/react";
import {VStack} from "@chakra-ui/icons";
import MasonryGallery from "../components/MasonryGallery";
import {graphql} from "gatsby";


export default function Index({data}) {
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
        <div>
            <Flex>
                <Container maxW='90%'>
                    <Center>
                        <VStack>
                            <Heading marginBottom="10px">Scott Langridge</Heading>
                            <Text maxW='100%' align={"center"}>Here are some photos that I like.</Text>
                            <Box height="10px" width="100vw" backgroundColor="teal"></Box>
                            <Box ref={galleryRef} maxW="80%">
                                <MasonryGallery data={data} numCols={galleryCols}/>
                            </Box>
                        </VStack>
                    </Center>
                </Container>
            </Flex>
        </div>
    )
}


export const query = graphql`
  query {
  allFile(filter: { sourceInstanceName: { eq: "images" } }, sort: { birthTime: DESC }) {
    nodes {
      id
      childImageSharp {
        gatsbyImageData(
          placeholder: BLURRED
          formats: [AUTO, WEBP]
        )
      }
    }
  }
}
`;