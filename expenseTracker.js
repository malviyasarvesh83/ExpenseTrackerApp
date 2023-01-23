var row = null;
function Submit() {
    var dataSubmit = retrieveData();
    var readData = readingDataFromLocalStorage(dataSubmit);
    if (dataSubmit == false) {
        msg.innerHTML = `<h3 style="color: red;">All Fields are required</h3>`;
    } else {
        if (row == null) {
          insert(readData);
          msg.innerHTML = `<h3 style="color: green;">Data Inserted..!</h3>`;
        } else {
          update();
          msg.innerHTML = `<h3 style="color: orange;">Data Updated..!</h3>`;
        }
        document.getElementById("form").reset();
    }
}

function retrieveData() {
    var amount = document.getElementById("amount").value;
    var desc = document.getElementById("desc").value;
    var cat = document.getElementById("cat").value;

    var arr = [amount, desc, cat];
    if (arr.includes("")) {
        return false;
    } else {
        return arr;
    }
}

function readingDataFromLocalStorage(dataSubmit) {
    // setting value in local storage
    var amount = localStorage.setItem("Amount", dataSubmit[0]);
    var desc = localStorage.setItem("Desc", dataSubmit[1]);
    var cat = localStorage.setItem("Cat", dataSubmit[2]);

    // getting value from local storage
    var amount = localStorage.getItem("Amount", amount);
    var desc = localStorage.getItem("Desc", desc);
    var cat = localStorage.getItem("Cat", cat);

    var arr = [amount, desc, cat];
    return arr;
}

function insert(readData) {
    var row = table.insertRow();
    var cell1 = row.insertCell(0).innerHTML = readData[0];
    var cell2 = row.insertCell(1).innerHTML = readData[1];
    var cell3 = row.insertCell(2).innerHTML = readData[2];

    row.insertCell(3).innerHTML = `<button style="background: orange; margin-right: 10px; padding: 10px; font-weight: bold;" onclick = edit(this)>Edit</button><button style="background: red; padding: 10px; font-size: bold;" onclick = remove(this)>Delete</button>`;
}

// Edit

function edit(td) {
    row = td.parentElement.parentElement;
    document.getElementById("amount").value = row.cells[0].innerHTML;
    document.getElementById("desc").value = row.cells[1].innerHTML;
    document.getElementById("cat").value = row.cells[2].innerHTML;
}

// Update

function update() {
    row.cells[0].innerHTML = document.getElementById("amount").value;
    row.cells[1].innerHTML = document.getElementById("desc").value;
    row.cells[2].innerHTML = document.getElementById("cat").value;
    row = null;
}

// Delete

function remove(td) {
    var ans = confirm("Are you sure to delete this record");
    if (ans == true) {
        row = td.parentElement.parentElement;
        document.getElementById("table").deleteRow(row.rowIndex);
        msg.innerHTML=`<h3 style="color: red;">Data Deleted..!</h3>`
    }
}