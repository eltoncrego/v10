import { BrowserRouter, Routes, Route } from "react-router";
import { Layout } from "@/components/layout";
import Home from "@/pages/home";

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
