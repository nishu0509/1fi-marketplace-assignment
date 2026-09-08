import { BrowserRouter, Routes, Route } from "react-router-dom";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Shop />} />
        <Route path="/products/:slug" element={<ProductDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
