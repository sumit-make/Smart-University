const express =require("express");
const app =express();
const mongoose =require("mongoose");
const Student = require("./models/Student");

const port = 3000;
const path =require("path");

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/NIT');
  
  }

main().then(()=>{
    console.log("connection successful to db");
})
.catch(err => console.log(err));




app.use(express.urlencoded({extended: true}));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));



const students = [
    { rollNumber: "21BCS001", name: "Rahul Sharma", marks: { Math: 85, Science: 78, English: 92, History: 88 } },
    { rollNumber: "21BCS002", name: "Priya Singh", marks: { Math: 76, Science: 80, English: 85, History: 90 } },
    { rollNumber: "21BCS003", name: "Amit Verma", marks: { Math: 90, Science: 85, English: 88, History: 82 } }
];

// API to Get Marks by Roll Number
app.get("/getMarks/:rollNumber", (req, res) => {
    const rollNumber = req.params.rollNumber;
    const student = students.find(s => s.rollNumber === rollNumber);

    if (student) {
        res.json(student);
    } else {
        res.status(404).json({ error: "No record found" });
    }
});
//api to store marks

app.post("/addStudent", async (req, res) => {
    try {
        const newStudent = new Student(req.body);
        await newStudent.save();
        res.json({ message: "✅ Student data stored successfully" });
    } catch (err) {
        res.status(400).json({ error: "❌ Failed to store student data" });
    }
});

app.get("/home",(req,res)=>{
    res.render("index.ejs");
});
app.get("/home/marks",(req,res)=>{
    res.render("marks.ejs");
});
app.get("/home/addStudent",(req,res)=>{
    res.render("addStudent.ejs");
});

app.get("/home/academic",(req,res)=>{
    res.render("academic.ejs");
});

app.get("/home/attendance",(req,res)=>{
    res.render("attendance.ejs");
});

app.get("/home/club",(req,res)=>{
    res.render("club.ejs");
});

app.get("/home/library",(req,res)=>{
    res.render("library.ejs");
});

app.get("/home/student",(req,res)=>{
    res.render("student.ejs");
});

app.listen(port,(req,res)=>{
    console.log(" app listinig on port 3000");
});