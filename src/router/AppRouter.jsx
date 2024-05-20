import { Navigate, Route, Routes } from "react-router-dom";

import { CrudPage } from "../pages/CrudPage";
import { OfrecimientosPage } from "../pages/OfrecimientosPage";

export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/Ofrecimientos" element={<OfrecimientosPage />} />
        <Route path="/CRUD" element={<CrudPage />} />
        <Route path="/*" element={<Navigate to="/Ofrecimientos" />}></Route>
      </Routes>
    </>
  );
};
