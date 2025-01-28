import * as React from "react";
import {Box, Center, Container, Flex, Heading, Text} from "@chakra-ui/react";
import {VStack} from "@chakra-ui/icons";
import MasonryGallery from "../components/MasonryGallery";
import {graphql} from "gatsby";


export default function Index({data}) {
    return (
        <div>
            <Flex>
                <Container maxW='90%'>
                    <Center>
                        <VStack>
                            <Heading marginBottom="10px">Scott Langridge</Heading>
                            <Text maxW='100%' align={"center"}>Here are some photos I like.</Text>
                            <Box height="10px" width="100vw" backgroundColor="teal"></Box>
                            <Box maxW="80%">
                                <MasonryGallery data={data}/>
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
  allFile(filter: { sourceInstanceName: { eq: "images" } }) {
    nodes {
      childImageSharp {
        gatsbyImageData(
          width: 600
          placeholder: BLURRED
          formats: [AUTO, WEBP]
        )
      }
    }
  }
}
`;