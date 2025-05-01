import { Routes, Route } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { theme } from "./theme/theme";
import MainLayout from "./layouts/MainLayout";
import StockInfoPage from "./pages/StockInfoPage";
import PricePage from "./pages/PricePage";
import ForeignInstitutionalPage from "./pages/ForeignInstitutionalPage";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
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
    </ThemeProvider>
  );
}

export default App;
