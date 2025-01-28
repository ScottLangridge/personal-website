import * as React from "react";
import {Center, Container, Flex, Heading, Text} from "@chakra-ui/react";
import Sidebar from "../components/sidebar";
import {VStack} from "@chakra-ui/icons";
import MasonryGallery from "../components/MasonryGallery";
import {graphql} from "gatsby";


export default function Index({data}) {
    return (
        <div>
            <Flex>
                <Sidebar/>
                <Container maxW='90%'>
                    <Center>
                        <VStack>
                            <Heading>Scott Langridge</Heading>
                            <Text maxW='100%'>Here are some photos I like.</Text>
                            <MasonryGallery data={data}/>
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
          formats: [AUTO, WEBP, AVIF]
        )
      }
    }
  }
}
`;