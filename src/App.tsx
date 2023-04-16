import { Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import HomeRoutes from "./pages/routes";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/*" element={<HomeRoutes />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
