const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    rollNumber: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    marks: {
        Math: Number,
        Science: Number,
        English: Number,
        History: Number
    }
});


const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
