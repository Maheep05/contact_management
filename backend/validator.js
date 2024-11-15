// contactValidator.js
const { z } = require("zod");

// Define a schema to validate contact data
const contactSchema = z.object({
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  email: z.string().email("Invalid email format").min(1, "Email is required"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .max(10, "Phoen Number can be of Maximum 10 numbers"),
  company: z.string().optional(),
  jobTitle: z.string().optional(),
});

module.exports = { contactSchema };
