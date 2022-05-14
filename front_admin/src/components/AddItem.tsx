import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Flex,
  Box,
  Button,
  VStack,
  Wrap,
  WrapItem,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { MdPhone, MdEmail, MdLocationOn } from "react-icons/md";
import { BsPerson } from "react-icons/bs";
import { ADMIN_BASE_URL } from "../constants/api";

export default function AddItem() {
  const { productId } = useParams();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    if (productId)
      fetch(`http://localhost:8000/api/product/${productId}`)
        .then((res) => res.json())
        .then((data) => {
          setTitle(data.title);
          setImage(data.image);
          setId(data.id);
          setLoading(false);
        });
  }, [productId]);

  const AddItem = () => {
    const url =
      id !== ""
        ? `${ADMIN_BASE_URL}/product/${id}`
        : `${ADMIN_BASE_URL}/product`;
    const method = id !== "" ? "PUT" : "POST";

    fetch(url, {
      method,
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        image,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);

        if (id === "") {
          setTitle("");
          setImage("");
        }

        toast({
          title: id !== "" ? "Product Updated." : "Product Added.",
          description: `We've ${
            id !== "" ? "updated" : "created"
          } the product for you.`,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      });
  };

  const getSubmitTitle = () => {
    if (loading) return "sending...";

    return id !== "" ? "Update Product" : "Add Product";
  };

  return (
    <Container bg="#9DC4FB" maxW="full" mt={0} centerContent overflow="hidden">
      <Flex>
        <Box
          bg="#02054B"
          color="white"
          borderRadius="lg"
          m={{ sm: 4, md: 16, lg: 10 }}
          p={{ sm: 5, md: 5, lg: 16 }}
        >
          <Box p={4}>
            <Wrap spacing={{ base: 20, sm: 3, md: 5, lg: 20 }}>
              <WrapItem>
                <Box bg="white" borderRadius="lg">
                  <Box m={8} color="#0B0E3F">
                    <VStack spacing={5}>
                      <FormControl id="name">
                        <FormLabel>Product title:</FormLabel>
                        <InputGroup borderColor="#E0E1E7">
                          <Input
                            type="text"
                            size="md"
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                          />
                        </InputGroup>
                      </FormControl>
                      <FormControl id="image">
                        <FormLabel>image url:</FormLabel>
                        <Textarea
                          borderColor="gray.300"
                          _hover={{
                            borderRadius: "gray.300",
                          }}
                          value={image}
                          placeholder="url..."
                          onChange={(e) => setImage(e.target.value)}
                        />
                      </FormControl>
                      <FormControl id="submit" float="right">
                        <Button
                          variant="solid"
                          bg="#0D74FF"
                          color="white"
                          _hover={{}}
                          onClick={AddItem}
                        >
                          {getSubmitTitle()}
                        </Button>
                      </FormControl>
                    </VStack>
                  </Box>
                </Box>
              </WrapItem>
            </Wrap>
          </Box>
        </Box>
      </Flex>
    </Container>
  );
}
