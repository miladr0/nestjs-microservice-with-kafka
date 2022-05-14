import { Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";

interface LayoutProps {
  Component?: React.ComponentType<any>;
}

export default function Layout({ Component }: LayoutProps) {
  return (
    <>
      <Routes>
      </Routes>
    </>
  );
}
