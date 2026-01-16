import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    status: { type: String, default: 'pending', enum: ['pending', 'reviewed', 'resolved'] },
    date: { type: Number, required: true }
})

const Contact = mongoose.models.contact || mongoose.model('contact', contactSchema)

export default Contact;
