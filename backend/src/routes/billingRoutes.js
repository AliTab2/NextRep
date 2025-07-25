import ExcelJS from "exceljs";
import express from "express";
const router = express.Router();
import User from "../models/User.js";

export async function createBillingWorkbook(courses, trainer, month) {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Monatsabrechnung");

  sheet.columns = [
    { header: "Sportart", key: "sport", width: 20 },
    { header: "Datum", key: "date", width: 15 },
    { header: "Beginn", key: "start", width: 10 },
    { header: "Ende", key: "end", width: 10 },
    { header: "Dauer (Min)", key: "duration", width: 15 },
    { header: "Betrag (€)", key: "amount", width: 15 },
  ];

  courses.forEach((c) => {
    sheet.addRow(c);
  });

  sheet.eachRow({ includeEmpty: false }, (row) => {
    row.eachCell({ includeEmpty: true }, (cell) => {
      cell.font = {
        name: "Calibri",
        size: 11,
        color: { argb: "FF000000" },
      };

      cell.border = {
        top: { style: "thin", color: { argb: "FF000000" } },
        bottom: { style: "thin", color: { argb: "FF000000" } },
        left: { style: "thin", color: { argb: "FF000000" } },
        right: { style: "thin", color: { argb: "FF000000" } },
      };

      cell.alignment = {
        vertical: "middle",
        horizontal: "left",
      };
    });
  });

  const total = courses.reduce((sum, curr) => {
    return sum + curr.amount;
  }, 0);
  sheet.addRow([]);
  sheet.addRow(["", "", "", "", "", `Gesamt: ${total}`]);

  const trainerInfo = {
    trainer: trainer,
    company: "clever fit GmbH",
    month: month,
    employment: "Kurstrainer*in / 538 €",
  };

  sheet.addRow(["Mitarbeiter", trainerInfo.trainer]);
  sheet.addRow(["Firma", trainerInfo.company]);
  sheet.addRow(["Monat", trainerInfo.month]);
  sheet.addRow(["Beschäftigung", trainerInfo.employment]);
  sheet.addRow([]);

  sheet.addRow([]);
  sheet.addRow(["Datum / Unterschrift Arbeitnehmer:"]);
  sheet.addRow([]);
  sheet.addRow(["Datum / Kontrolle Studioleitung:"]);
  sheet.addRow([]);
  sheet.addRow(["Datum / Kontrolle Arbeitgeber:"]);
  sheet.addRow([]);

  sheet.addRow([]);
  sheet.addRow(["Erstellt von NextRep (https://www.next-rep.app)"]);

  return workbook;
}

router.post("/", async (req, res) => {
  try {
    const courses = req.body.courses;
    const month = req.body.month;
    const userId = req.headers["x-user-id"];
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({});

    const workbook = await createBillingWorkbook(
      courses,
      user.billingName,
      month
    );
    const buffer = await workbook.xlsx.writeBuffer();

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=Monatsabrechnung.xlsx"
    );
    res.send(buffer);
  } catch (err) {
    console.error("Fehler beim Erstellen/Download:", err);
    res.status(500).send("Fehler beim Download");
  }
});

export default router;
