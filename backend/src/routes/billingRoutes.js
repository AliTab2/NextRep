import ExcelJS from "exceljs";
import express from "express";
const router = express.Router();
import User from "../models/User.js";

export async function createBillingWorkbook(
  courses,
  trainer,
  month,
  vacationDates = []
) {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile("./billing.xlsx");
  const sheet = workbook.getWorksheet(1);

  // headers
  const trainerField = "D8:F8";
  const companyField = "D9:F9";
  const monthField = "D10:F10";

  sheet.getCell(trainerField).value = trainer;
  sheet.getCell(companyField).value = "clever fit GmbH";
  sheet.getCell(monthField).value = month;

  let latestCourseRowIndex = 0;
  const vacationRow = (index) => {
    const internIndex = latestCourseRowIndex === 0 ? 14 : latestCourseRowIndex;
    return sheet.getRow(internIndex + index);
  };

  // courses
  courses.forEach((c, i) => {
    const index = 14 + i;
    latestCourseRowIndex = index; // needed to sign vacation dates afterwards!
    const row = sheet.getRow(index);

    const dateCell = row.getCell("B");
    const startCell = row.getCell("C");
    const endCell = row.getCell("D");
    const durationCell = row.getCell("F");
    const amountCell = row.getCell("G");

    dateCell.value = c.date;
    startCell.value = c.start;
    endCell.value = c.end;
    durationCell.value =
      c.duration < 60 ? `00:${c.duration}:00` : `0${1}:00:00`;
    amountCell.value = c.amount;
  });

  // vacations
  if (vacationDates.length > 0) {
    vacationDates.forEach((d, i) => {
      const row = vacationRow(i + 1);
      const dateCell = row.getCell("B");
      const descriptionCell = row.getCell("G");

      dateCell.value = d;
      descriptionCell.value = "Urlaub";
    });
  }

  // total amount
  const totalAmountCell = sheet.getCell("G44:J44");
  totalAmountCell.value = courses.reduce((sum, curr) => {
    return sum + curr.amount;
  }, 0);

  // total hours
  const totalHoursCell = sheet.getCell("F46");
  totalHoursCell.value = courses.reduce((sum, curr) => {
    return sum + curr.duration / 60;
  }, 0);

  return workbook;
}

router.post("/", async (req, res) => {
  try {
    const courses = req.body.courses;
    const month = req.body.month;
    const vacationDates = req.body.vacationDates;
    const userId = req.headers["x-user-id"];
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({});

    const workbook = await createBillingWorkbook(
      courses,
      user.billingName,
      month,
      vacationDates
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
