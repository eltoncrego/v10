import { BrowserRouter, Routes, Route } from "react-router";
import Home from "@/pages/home";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
