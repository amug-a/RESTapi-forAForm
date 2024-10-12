const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  // PILGRIM'S DETAILS
  pilgrimName: { type: String, required: true },
  pilgrimDOB: { type: String, required: true },
  pilgrimGender: { type: String, required: true },
  pilgrimPlaceOfBirth: { type: String, required: true },
  pilgrimLocalGovernment: { type: String, required: true },
  pilgrimState: { type: String, required: true },
  pilgrimOccupation: { type: String, required: true },
  pilgrimContactNumber: { type: String, required: true },
  pilgrimHomeAddress: { type: String, required: true },
  pilgrimOfficeAddress: { type: String, required: true },
  pilgrimEmailAddress: { type: String, required: true },
  pilgrimMaritalStatus: { type: String, required: true },
  pilgrimPerformedHajjPreviously: { type: String, required: true },
  pilgrimYearofHajj: { type: Number, required: false },
  pilgrimPassportType: { type: String, required: true },
  pilgrimPassportNumber: { type: String, required: true },
  pilgrimPassportPOI: { type: String, required: true },
  pilgrimPassportIssueDate: { type: Date, required: true },
  pilgrimPassportExpiryDate: { type: Date, required: true },
  pilgrimBankAccountName: { type: String, required: true },
  pilgrimBankName: { type: String, required: true },
  pilgrimBankAccountNumber: { type: String, required: true },

  // PILGRIM'S PAYMENT DETAIL
  pilgrimSponsorshipStatus: { type: String, required: true },
  pilgrimSponsorName: { type: String, required: true },
  modeOfPayment: { type: String, required: true },

  firstInstallmentPaymentDate: { type: Date, required: true },
  firstInstallmentAmountPaid: { type: Number, required: true },
  firstInstallmentReceiptNumber: { type: String, required: true },

  secondInstallmentPaymentDate: { type: Date, required: true },
  secondInstallmentAmountPaid: { type: Number, required: true },
  secondInstallmentReceiptNumber: { type: String, required: true },

  thirdInstallmentPaymentDate: { type: Date, required: true },
  thirdInstallmentAmountPaid: { type: Number, required: true },
  thirdInstallmentReceiptNumber: { type: String, required: true },
  balanceIfAny: { type: Number, required: false },
  refundIfAny: { type: Number, required: false },

  // PILGRIM'S NEXT OF KIN (NOK)
  NOKName: { type: String, required: true },
  NOKRelationship: { type: String, required: true },
  NOKOccupation: { type: String, required: true },
  NOKOfficeAddress: { type: String, required: true },
  NOKHomeAddress: { type: String, required: true },
  NOKPhoneNumber: { type: String, required: true },
  NOKEmailAddress: { type: String, required: true },

  // PILGRIM'S GUARANTOR
  guarantorName: { type: String, required: true },
  guarantorRelationship: { type: String, required: true },
  guarantorOccupation: { type: String, required: true },
  guarantorRank: { type: String, required: true },
  guarantorOfficeAddress: { type: String, required: true },
  guarantorHomeAddress: { type: String, required: true },
  guarantorPhoneNumber: { type: String, required: true },
  guarantorEmailAddress: { type: String, required: true },

  // GUARDIAN FOR AGED OR FEMALE PILGRIM
  guardianName: { type: String, required: true },
  guardianPhoneNumber: { type: String, required: true },
  guardianContactNumber: { type: String, required: true },
  guardianRegistrationCentreNumber: { type: String, required: true },
  guardianRegistrationNumber: { type: String, required: true },

  // FILES UPLOADED
  files: {
    pilgrimInternationalPassport: { type: String, required: true },
    pilgrimNationalIdentityCard: { type: String, required: true },
    pilgrimPassportID: { type: String, required: true },
    firstSlip: { type: String, required: true },
    secondSlip: { type: String, required: true },
    thirdSlip: { type: String, required: true },
    pilgrimGuarantorID: { type: String, required: true },
  },

  createdAt: { type: Date, default: Date.now },
});

// Create the model
const FormData = mongoose.model("FormData", formSchema);

module.exports = FormData;
