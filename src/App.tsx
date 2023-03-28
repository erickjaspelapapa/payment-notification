import { Route, Routes } from "react-router-dom";

import HomeRoutes from "./pages/routes";

function App() {
  return (
    <Routes>
      <Route path="/*" element={<HomeRoutes />} />
    </Routes>
  );
}

export default App;
