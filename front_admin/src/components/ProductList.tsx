import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Divider,
  Heading,
  List,
  ListIcon,
  ListItem,
  Image,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";
import { FRONT_BASE_URL } from "../constants/api";
import IProduct from "../interfaces/IProduct";

const options = [
  { id: 1, desc: "1 lorem ipsum" },
  { id: 2, desc: "Lorem, ipsum dolor." },
  { id: 3, desc: "Monthly Updates" },
];
interface PackageTierProps {
  handleLike: (id: string) => void;
  product: IProduct;
}
const PackageTier = ({ product, handleLike }: PackageTierProps) => {
  const colorTextLight = "purple.600";
  const bgColorLight = "gray.300";

  const colorTextDark = "purple.500";
  const bgColorDark = "gray.300";

  return (
    <Stack
      p={3}
      py={3}
      justifyContent={{
        base: "flex-start",
        md: "space-around",
      }}
      direction={{
        base: "column",
        md: "row",
      }}
      alignItems={{ md: "center" }}
    >
      <Heading size={"md"}>{product.title}</Heading>
      <Image
        boxSize="100px"
        objectFit="cover"
        src={product.image}
        alt={`Picture of ${product.title}`}
        roundedTop="lg"
      />
      <Stack>
        <Button
          onClick={() => handleLike(product.id)}
          size="md"
          color={useColorModeValue(colorTextLight, colorTextDark)}
          bgColor={useColorModeValue(bgColorLight, bgColorDark)}
        >
          Like: {product.likes}
        </Button>
      </Stack>
    </Stack>
  );
};
const ThreeTierPricingHorizontal = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${FRONT_BASE_URL}/products`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  const likeHandler = (id: string) => {
    console.log("id: ", id);
    fetch(`${FRONT_BASE_URL}/products/${id}/like`, {
      method: "POST",
    });
  };
  return (
    <Box py={6} px={5}>
      <Stack spacing={4} width={"100%"} direction={"column"}>
        <Stack
          p={5}
          alignItems={"center"}
          justifyContent={{
            base: "flex-start",
            md: "space-around",
          }}
          direction={{
            base: "column",
            md: "row",
          }}
        >
          <Stack
            width={{
              base: "100%",
              md: "40%",
            }}
            textAlign={"center"}
          >
            <Heading size={"lg"}>
              All the Products <Text color="purple.400">That you Love</Text>
            </Heading>
          </Stack>
          <Stack
            width={{
              base: "100%",
              md: "60%",
            }}
          >
            <Text textAlign={"center"}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
              quod in iure vero. Facilis magnam, sed officiis commodi labore
              odit.
            </Text>
          </Stack>
        </Stack>
        <Divider />
        {products?.length &&
          products.map((product: IProduct) => (
            <div key={product.id}>
              <PackageTier product={product} handleLike={likeHandler} />
              <Divider />
            </div>
          ))}
      </Stack>
    </Box>
  );
};

export default ThreeTierPricingHorizontal;
