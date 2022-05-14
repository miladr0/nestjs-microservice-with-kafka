import * as React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import customTheme from "./extendTheme";
import NavBar from "./components/NavBar";
import Layout from "./components/Layout";
import Products from "./components/AdminProducts";
import ProductItem from "./components/ProductItem";
import AddItem from "./components/AddItem";
import AdminProducts from "./components/AdminProducts";
import ProductList from "./components/ProductList";

export default function App() {
  return (
    <ChakraProvider theme={customTheme}>
      <BrowserRouter>
        <NavBar />

        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/products" element={<AdminProducts />} />
          <Route path="/products/:productId" element={<ProductItem />} />
          <Route path="/products/add" element={<AddItem />} />
          <Route path="/products/edit/:productId" element={<AddItem />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}
