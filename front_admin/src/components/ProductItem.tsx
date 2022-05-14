import {
  Flex,
  Circle,
  Box,
  Image,
  Badge,
  useColorModeValue,
  Icon,
  chakra,
  Tooltip,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import IProduct from "../interfaces/IProduct";

interface RatingProps {
  rating: number;
  numReviews: number;
}

function Rating({ rating, numReviews }: RatingProps) {
  return (
    <Flex align="center">
      {Array(5)
        .fill("")
        .map((_, i) => {
          const roundedRating = Math.round(rating * 2) / 2;
          if (roundedRating - i >= 1) {
            return (
              <BsStarFill
                key={i}
                style={{ marginLeft: "1" }}
                color={i < rating ? "teal.500" : "gray.300"}
              />
            );
          }
          if (roundedRating - i === 0.5) {
            return <BsStarHalf key={i} style={{ marginLeft: "1" }} />;
          }
          return <BsStar key={i} style={{ marginLeft: "1" }} />;
        })}
      <Box as="span" ml="2" color="gray.600" fontSize="sm">
        {numReviews} like{numReviews > 1 && "s"}
      </Box>
    </Flex>
  );
}


const ProductAddToCart: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<IProduct>({} as IProduct);
  const { productId } = useParams();

  useEffect(() => {
    if (productId)
      fetch(`http://localhost:8000/api/product/${productId}`)
        .then((res) => res.json())
        .then((data) => {
          setProduct(data);
          setLoading(false);
        });
  }, [productId]);

  const bgColor = useColorModeValue("white", "gray.800");

  return (
    <Flex p={50} w="full" alignItems="center" justifyContent="center">
      {loading ? (
        "loading..."
      ) : (
        <Box
          bg={bgColor}
          maxW="sm"
          borderWidth="1px"
          rounded="lg"
          shadow="lg"
          position="relative"
        >
          <Image
            src={product.image}
            alt={`Picture of ${product.title}`}
            roundedTop="lg"
          />

          <Box p="6">
            <Flex mt="1" justifyContent="space-between" alignContent="center">
              <Box
                fontSize="2xl"
                fontWeight="semibold"
                as="h4"
                lineHeight="tight"
              >
                {product.title}
              </Box>
            </Flex>

            <Flex justifyContent="space-between" alignContent="center">
              <Rating rating={product.likes} numReviews={product.likes} />
            </Flex>
          </Box>
        </Box>
      )}
    </Flex>
  );
};

export default ProductAddToCart;
