
import Contact from "../models/Contact.js";

// submit contact form : /api/contact/submit
export const submitContact = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        if (!name || !email || !subject || !message) {
            return res.json({ success: false, message: "Missing Details" });
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.json({ success: false, message: "Please enter a valid email address" });
        }

        const contactData = {
            name,
            email,
            subject,
            message,
            date: Date.now()
        }

        const newContact = new Contact(contactData);
        await newContact.save();

        res.json({ success: true, message: "Message Sent Successfully" });

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

// get all contact messages for seller : /api/contact/messages
export const getContactMessages = async (req, res) => {
    try {
        const messages = await Contact.find({}).sort({ date: -1 });
        res.json({ success: true, messages });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

// update message status : /api/contact/update-status
export const updateMessageStatus = async (req, res) => {
    try {
        const { id, status } = req.body;
        await Contact.findByIdAndUpdate(id, { status });
        res.json({ success: true, message: "Status Updated" });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}
