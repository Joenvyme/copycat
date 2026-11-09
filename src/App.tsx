import { Navigate, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { ProjectPage } from "./pages/Project";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/project/:slug" element={<ProjectPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
