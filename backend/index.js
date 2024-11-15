const express = require("express");
const mongoose = require("mongoose");
const Contact = require("./schema");
const { contactSchema } = require("./validator");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();
// mongoose connection
mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("connected");
});

app.post("/create", async (req, res) => {
  const { firstName, lastName, email, phone, company, jobTitle } = req.body;

  const result = contactSchema.safeParse(
    firstName,
    lastName,
    email,
    phone,
    company,
    jobTitle
  );

  if (!result) {
    return res.status(400).json({
      success: false,
      message: result.error,
    });
  }

  try {
    const newContact = new Contact({
      firstName,
      lastName,
      email,
      company,
      phone,
      jobTitle,
    });

    const response = await newContact.save();

    if (!response) {
      return res.json({
        message: "Error Creating Contact",
        success: false,
      });
    }
    return res.json({
      message: "Contact Created Sucessfully",
      success: true,
      status: 200,
    });
  } catch (error) {
    res.json({ message: error.message, success: false, status: 400 });
  }
});

app.get("/all", async (req, res) => {
  try {
    const contacts = await Contact.find({});
    if (!contacts) {
      return res.json({
        message: "Error fetching new contacts",
        success: false,
      });
    }
    return res.json({ contacts, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
});

app.put("/update", async (req, res) => {
  const { contactId } = req.body;

  const result = contactSchema.safeParse(req.body);

  if (!result) {
    return res.status(400).json({
      success: false,
      message: result.error,
    });
  }

  try {
    const updatedContact = await Contact.findByIdAndUpdate(contactId, req.body);

    if (!updatedContact) {
      return res
        .status(404)
        .json({ message: "Contact not found", success: false });
    }
    res.json({
      updatedContact,
      success: true,
      message: "Contact Updated Successfully",
    });
  } catch (error) {
    res.status(400).json({ message: error.message, success: false });
  }
});

app.delete("/delete/:id", async (req, res) => {
  try {
    const deletedContact = await Contact.findByIdAndDelete(req.params.id);

    if (!deletedContact) {
      return res.json({ message: "Contact not found", success: false });
    }
    return res.json({ message: "Contact deleted successfully", success: true });
  } catch (error) {
    return res.json({ message: error.message, success: false });
  }
});
app.listen(3000, () => {
  console.log("server is running");
});
