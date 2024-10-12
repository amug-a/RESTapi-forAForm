require("dotenv").config();
const express = require("express");
const app = express();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const FormData = require("./models/user.model"); // Adjust the path as necessary

const PORT = process.env.PORT || 3002;
app.use(cors());

const mongoose = require("mongoose");

const dbUsername = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;
const dbCluster = process.env.DB_CLUSTER;
const dbName = process.env.DB_NAME;

const mongoURL = `mongodb+srv://${dbUsername}:${dbPassword}@${dbCluster}/pilgrimdb?retryWrites=true&w=majority&appName=${dbName}`;

mongoose
  .connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

// Middleware to parse JSON data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Ensure the 'uploads' folder exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Set up Multer for file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Save files to 'uploads' folder
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Append original file extension
  },
});

// Initialize Multer to handle file uploads
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB limit
}).fields([
  { name: "pilgrimInternationalPassport", maxCount: 1 },
  { name: "pilgrimNationalIdentityCard", maxCount: 1 },
  { name: "pilgrimPassportID", maxCount: 1 },
  { name: "firstSlip", maxCount: 1 },
  { name: "secondSlip", maxCount: 1 },
  { name: "thirdSlip", maxCount: 1 },
  { name: "pilgrimGuarantorID", maxCount: 1 },
]);

app.post("/submit", upload, async (req, res) => {
  // console.log(req.files); // This will show the files that are received
  // console.log(req.body);

  // Group the non-file fields into an object
  const formData = {
    // PILGRIM'S DETAILS
    pilgrimName: req.body.pilgrimName,
    pilgrimGender: req.body.pilgrimGender,
    pilgrimPlaceOfBirth: req.body.pilgrimPlaceOfBirth,
    pilgrimDOB: req.body.pilgrimDOB,
    pilgrimLocalGovernment: req.body.pilgrimLocalGovernment,
    pilgrimState: req.body.pilgrimState,
    pilgrimOccupation: req.body.pilgrimOccupation,
    pilgrimContactNumber: req.body.pilgrimContactNumber,
    pilgrimHomeAddress: req.body.pilgrimHomeAddress,
    pilgrimOfficeAddress: req.body.pilgrimOfficeAddress,
    pilgrimEmailAddress: req.body.pilgrimEmailAddress,
    pilgrimMaritalStatus: req.body.pilgrimMaritalStatus,
    pilgrimPerformedHajjPreviously: req.body.pilgrimPerformedHajjPreviously,
    pilgrimYearofHajj: req.body.pilgrimYearofHajj,
    pilgrimPassportType: req.body.pilgrimPassportType,
    pilgrimPassportNumber: req.body.pilgrimPassportNumber,
    pilgrimPassportPOI: req.body.pilgrimPassportPOI,
    pilgrimPassportIssueDate: req.body.pilgrimPassportIssueDate,
    pilgrimPassportExpiryDate: req.body.pilgrimPassportExpiryDate,
    pilgrimBankAccountName: req.body.pilgrimBankAccountName,
    pilgrimBankName: req.body.pilgrimBankName,
    pilgrimBankAccountNumber: req.body.pilgrimBankAccountNumber,

    // PILGRIM'S PAYMENT DETAIL
    pilgrimSponsorshipStatus: req.body.pilgrimSponsorshipStatus,
    pilgrimSponsorName: req.body.pilgrimSponsorName,
    modeOfPayment: req.body.modeOfPayment,

    firstInstallmentPaymentDate: req.body.firstInstallmentPaymentDate, // First Installment
    firstInstallmentAmountPaid: req.body.firstInstallmentAmountPaid,
    firstInstallmentReceiptNumber: req.body.firstInstallmentReceiptNumber,

    secondInstallmentPaymentDate: req.body.secondInstallmentPaymentDate, // Second Installment
    secondInstallmentAmountPaid: req.body.secondInstallmentAmountPaid,
    secondInstallmentReceiptNumber: req.body.secondInstallmentReceiptNumber,

    thirdInstallmentPaymentDate: req.body.thirdInstallmentPaymentDate, // Third Installment
    thirdInstallmentAmountPaid: req.body.thirdInstallmentAmountPaid,
    thirdInstallmentReceiptNumber: req.body.thirdInstallmentReceiptNumber,
    balanceIfAny: req.body.balanceIfAny,
    refundIfAny: req.body.refundIfAny,

    // PILGRIM'S NEXT OF KIN (NOK)
    NOKName: req.body.NOKName,
    NOKRelationship: req.body.NOKRelationship,
    NOKOccupation: req.body.NOKOccupation,
    NOKOfficeAddress: req.body.NOKOfficeAddress,
    NOKHomeAddress: req.body.NOKHomeAddress,
    NOKPhoneNumber: req.body.NOKPhoneNumber,
    NOKEmailAddress: req.body.NOKEmailAddress,

    // PILGRIM'S GUARANTOR
    guarantorName: req.body.guarantorName,
    guarantorRelationship: req.body.guarantorRelationship,
    guarantorOccupation: req.body.guarantorOccupation,
    guarantorRank: req.body.guarantorRank,
    guarantorOfficeAddress: req.body.guarantorOfficeAddress,
    guarantorHomeAddress: req.body.guarantorHomeAddress,
    guarantorPhoneNumber: req.body.guarantorPhoneNumber,
    guarantorEmailAddress: req.body.guarantorEmailAddress,

    // GUARDIAN FOR AGED OR FEMALE PILGRIM
    guardianName: req.body.guardianName,
    guardianPhoneNumber: req.body.guardianPhoneNumber,
    guardianContactNumber: req.body.guardianContactNumber,
    guardianRegistrationCentreNumber: req.body.guardianRegistrationCentreNumber,
    guardianRegistrationNumber: req.body.guardianRegistrationNumber,

    files: {
      pilgrimInternationalPassport: req.files.pilgrimInternationalPassport[0].path,
      pilgrimNationalIdentityCard: req.files.pilgrimNationalIdentityCard[0].path,
      pilgrimPassportID: req.files.pilgrimPassportID[0].path,
      firstSlip: req.files.firstSlip[0].path,
      secondSlip: req.files.secondSlip[0].path,
      thirdSlip: req.files.thirdSlip[0].path,
      pilgrimGuarantorID: req.files.pilgrimGuarantorID[0].path,
    },
  };

  // Validate if any field is missing
  for (let key in formData) {
    if (!formData[key]) {
      return res.status(400).json({ message: `${key} is missing` });
    }
  }

  // Validate if files are missing
  if (
    !req.files ||
    !req.files.pilgrimInternationalPassport ||
    !req.files.pilgrimNationalIdentityCard ||
    !req.files.pilgrimPassportID ||
    !req.files.firstSlip ||
    !req.files.secondSlip ||
    !req.files.thirdSlip ||
    !req.files.pilgrimGuarantorID
  ) {
    return res.status(400).json({ message: "One or more file uploads are missing" });
  }

  try {
    // Create a new FormData document
    const newForm = new FormData(formData);

    // Save the document to the database
    await newForm.save();

    // Response to the client
    res.status(200).json({
      message: "Form submitted successfully",
      data: newForm,
    });
  } catch (error) {
    console.error("Error saving form data:", error);
    res.status(500).json({ message: "An error occurred while saving the form data." });
  }
});

app.get("/", (req, res) => {
  res.send("<h1>Hello from Node Server API Updated</h1>");
});

app.get("/get-user-data", async (req, res) => {
  try {
    const forms = await FormData.find(); // Fetch all form submissions
    res.status(200).json(forms);
  } catch (err) {
    res.status(500).json({ message: "Error fetching forms", error: err });
  }
});

app.get("/get-user-data/email", async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const user = await FormData.findOne({ pilgrimEmailAddress: email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ message: "Error fetching user", error: err.message });
  }
});

app.get("/get-user-data/phone", async (req, res) => {
  const { phone } = req.query; // Extract query parameter for phone number
  console.log(`Fetching user with phone: ${phone}`); // Log the phone number

  try {
    // Find user based on pilgrimContactNumber
    const user = await FormData.findOne({ pilgrimContactNumber: phone });

    if (user) {
      res.status(200).json(user); // Send user data as response
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error fetching user", error: err });
  }
});

// 2. GET request to fetch a single form submission by ID
app.get("/get-user-data/:id", async (req, res) => {
  try {
    const form = await FormData.findById(req.params.id); // Fetch form submission by ID
    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }
    res.status(200).json(form);
  } catch (err) {
    res.status(500).json({ message: "Error fetching form", error: err });
  }
});



app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
