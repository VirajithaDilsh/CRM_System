require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User");

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");

        const existingAdmin = await User.findOne({ email: "admin@example.com" });
        if (!existingAdmin) {
            const admin = new User({
                name: "Admin User",
                email: "admin@example.com",
                password: "password123",
                role: "admin",
            });
            await admin.save();
            console.log("Admin user created");
        } else {
            console.log("Admin user already exists");
        }
    } catch (error) {
        console.error("Error seeding admin user:", error);
    }
};

seedAdmin();