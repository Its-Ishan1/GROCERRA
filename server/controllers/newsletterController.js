import Subscriber from "../models/Subscriber.js";

export const subscribe = async (req, res) => {
    try {
        const { email } = req.body;

        const exists = await Subscriber.findOne({ email });

        if (exists) {
            return res.json({ success: false, message: "Email already subscribed" });
        }

        await Subscriber.create({ email });
        res.json({ success: true, message: "Subscribed successfully!" });

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

export const getSubscribers = async (req, res) => {
    try {
        const subscribers = await Subscriber.find({}).sort({ date: -1 });
        res.json({ success: true, subscribers });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};
