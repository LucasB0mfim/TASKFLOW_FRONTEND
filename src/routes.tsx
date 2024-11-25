// Importação de componentes para definir e navegar entre rotas.
import { Navigate, Route, Routes } from "react-router-dom";

// Importação da página principal do sistema.
import Dashboard from "./pages/Dashboard";

const Rotas = () => (
  <Routes>
    {/* Redireciona a rota raiz ("/") para a rota "/dashboard". */}
    <Route path="/" element={<Navigate to="/dashboard" replace />} />

    {/* Define a rota para a página de Dashboard. */}
    <Route path="/dashboard" element={<Dashboard />} />
  </Routes>
);

export default Rotas;
