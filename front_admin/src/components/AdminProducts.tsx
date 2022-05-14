import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Text,
} from "@chakra-ui/react";
import ProductItem from "./ProductItem";
import IProduct from "../interfaces/IProduct";
import { ADMIN_BASE_URL } from "../constants/api";

const Products: React.FC = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${ADMIN_BASE_URL}/product`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, []);
  return (
    <TableContainer>
      <Table variant="simple">
        <TableCaption>Product Items</TableCaption>
        <Thead>
          <Tr>
            <Th>id</Th>
            <Th>title</Th>
            <Th>likes</Th>
            <Th>edit</Th>
            <Th>view</Th>
          </Tr>
        </Thead>
        <Tbody>
          {!loading &&
            products.map((product: IProduct) => (
              <Tr key={product.id}>
                <Td>{product.id}</Td>
                <Td>{product.title}</Td>
                <Td>{product.likes}</Td>
                <Td>
                  <Text color={"green.400"}>
                    <Link to={`/products/edit/${product.id}`}>edit</Link>
                  </Text>
                </Td>
                <Td>
                  <Text color={"green.400"}>
                    <Link to={`/products/${product.id}`}>open</Link>
                  </Text>
                </Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default Products;
