function getMarks() {
    let rollNumber = document.getElementById("rollNumber").value.trim();
    let resultDiv = document.getElementById("marksResult");

    if (rollNumber === "") {
        resultDiv.innerHTML = "❌ Please enter a roll number.";
        return;
    }

    fetch(`http://localhost:3000/getMarks/${rollNumber}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("No record found");
            }
            return response.json();
        })
        .then(data => {
            let marks = data.marks;
            resultDiv.innerHTML = `
                ✅ Name: ${data.name} <br>
                📖 Math: ${marks.Math} <br>
                📖 Science: ${marks.Science} <br>
                📖 English: ${marks.English} <br>
                📖 History: ${marks.History} <br>
            `;
        })
        .catch(error => {
            resultDiv.innerHTML = "❌ No record found!";
        });
}

