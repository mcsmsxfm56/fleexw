import { objEmpresa, objEvento, objTrabajador } from "@/types/Types";
import * as XLSX from "xlsx";

export const downloadExcelAdmin = (
  sheetTrabajador: objTrabajador[],
  sheetEmpresa: objEmpresa[],
  sheetEventos: objEvento[]
) => {
  const sheetTrabajador2 = XLSX?.utils.json_to_sheet(sheetTrabajador);
  const sheetEmpresa2 = XLSX?.utils.json_to_sheet(sheetEmpresa);
  const sheetEventos2 = XLSX?.utils.json_to_sheet(sheetEventos);
  const adminData = XLSX?.utils.book_new();
  XLSX?.utils.book_append_sheet(
    adminData,
    sheetTrabajador2,
    "Tabla Trabajadores"
  );
  XLSX?.utils.book_append_sheet(adminData, sheetEmpresa2, "Tabla Empresa");
  XLSX?.utils.book_append_sheet(adminData, sheetEventos2, "Tabla Eventos");
  XLSX?.writeFile(adminData, "adminData.xlsx");
};

export const downloadExcelNoAdmin = (sheetEvents: objEvento[]) => {
  const sheetEvents2 = XLSX?.utils.json_to_sheet(sheetEvents);
  const adminData = XLSX?.utils.book_new();
  XLSX?.utils.book_append_sheet(adminData, sheetEvents2, "Tabla Eventos");
  XLSX?.writeFile(adminData, "datosEventos.xlsx");
};
