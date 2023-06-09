import { Navigate, Route, Routes } from "react-router-dom";

import Home from ".";
import ClientList from "./clients";
import Dashboard from "./dashboard";
import ImportClient from "./imports";
import Settings from "./settings";
import Profile from "./profile";
import PaymentRecords from "./records";
import Transactions from "./transaction";

const HomeRoutes = () => {
  return (
    <Routes>
      <Route element={<Home />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/clients" element={<ClientList />} />
        <Route path="/clientProfile/:id" element={<Profile />} />
        <Route path="/records" element={<PaymentRecords />} />
        <Route path="/transaction" element={<Transactions />} />
        <Route path="/imports" element={<ImportClient />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/" element={<Navigate to={"/dashboard"} />} />
      </Route>
    </Routes>
  );
};

export default HomeRoutes;
