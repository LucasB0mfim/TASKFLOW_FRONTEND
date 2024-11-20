import { Navigate, Route, Routes } from "react-router-dom";

import Dashboard from "./pages/Dashboard";

const Rotas = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/dashboard" replace />} />
    <Route path="/dashboard" element={ <Dashboard /> } />
  </Routes>
)

export default Rotas
