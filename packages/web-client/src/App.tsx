import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import StockInfoPage from "./pages/StockInfoPage";
import PricePage from "./pages/PricePage";
import ForeignInstitutionalPage from "./pages/ForeignInstitutionalPage";

function App() {
  return (
    <>
      {/* @ts-ignore */}
      <Routes>
        {/* @ts-ignore */}
        <Route path="/" element={<MainLayout />}>
          {/* @ts-ignore */}
          <Route index element={<StockInfoPage />} />
          {/* @ts-ignore */}
          <Route path="price" element={<PricePage />} />
          {/* @ts-ignore */}
          <Route
            path="foreign-institutional"
            element={<ForeignInstitutionalPage />}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
