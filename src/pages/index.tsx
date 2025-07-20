import * as React from "react";
import {graphql} from "gatsby";
import {Box, Center, Container, Flex, Heading, Text} from "@chakra-ui/react";
import {VStack} from "@chakra-ui/icons";
import ResponsiveMasonryGallery from "../components/ResonsiveMasonryGallery";


export default function Index({data}) {
    return (
        <div>
            <Flex>
                <Container maxW='90%'>
                    <Center>
                        <VStack>
                            <Heading marginBottom="10px">Scott Langridge</Heading>
                            <Text maxW='100%' align={"center"}>Here are some photos that I took.</Text>
                            <Text maxW='100%' align={"center"}>(You can click them for fullscreen)</Text>
                            <Box height="10px" width="100vw" backgroundColor="teal"></Box>
                            <Box maxW="80%">
                                <ResponsiveMasonryGallery data={data}/>
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
