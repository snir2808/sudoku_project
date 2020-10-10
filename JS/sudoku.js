// // log in code

function logIn(){
    var userName = document.getElementById('usernameLogin').value
    var password = document.getElementById('passwordLogin').value
    if(userName == "abcd" && password == "1234"){
     window.location.href = "./level.html";
    }else{
        function pop(){   // window pop and give error.
            document.querySelector('.bg-modal').style.display = "flex";
        }
        pop()
    }
}
function close1(){
    document.querySelector('.bg-modal').style.display = "none";
}
var sMat1= [
    [1,4,3,5,7,8,2,6,9],
    [2,8,7,1,6,9,4,3,5],
    [5,9,6,2,3,4,1,8,7],
    [3,1,2,8,9,6,7,5,4],
    [7,5,4,3,2,1,8,9,6],
    [9,6,8,7,4,5,3,1,2],
    [4,2,1,6,5,3,9,7,8],
    [8,7,5,9,1,2,6,4,3],
    [6,3,9,4,8,7,5,2,1]
];
var sMat2= [
    [5,3,4,6,7,8,9,1,2],
    [6,7,2,1,9,5,3,4,8],
    [1,9,8,3,4,2,5,6,7],
    [8,5,9,7,6,1,4,2,3],
    [4,2,6,8,5,3,7,9,1],
    [7,1,3,9,2,4,8,5,6],
    [9,6,1,5,3,7,2,8,4],
    [2,8,7,4,1,9,6,3,5],
    [3,4,5,2,8,6,1,7,9]
];
var sMat3=[
    [5,4,2,9,8,7,6,1,3],
    [8,9,6,4,3,1,5,2,7],
    [7,3,1,6,5,2,9,8,4],
    [4,2,5,3,1,9,7,6,8],
    [1,8,3,2,7,6,4,5,9],
    [6,7,9,5,4,8,2,3,1],
    [3,1,4,7,2,5,8,9,6],
    [2,6,7,8,9,3,1,4,5],
    [9,5,8,1,6,4,3,7,2],
];
var sMat4=[
    [9,1,4,7,8,2,3,6,5],
    [3,8,5,4,1,6,7,9,2],
    [7,2,6,5,9,3,4,1,8],
    [8,9,2,6,3,7,5,4,1],
    [4,6,3,2,5,1,8,7,9],
    [5,7,1,9,4,8,2,3,6],
    [1,4,8,3,2,9,6,5,7],
    [2,5,7,1,6,4,9,8,3],
    [6,3,9,8,7,5,1,2,4],
];
var sMat5=[
    [9,5,1,8,4,3,6,7,2],
    [4,3,8,6,2,7,1,5,9],
    [2,7,6,1,9,5,8,3,4],
    [1,9,5,3,8,4,7,2,6],
    [6,2,7,5,1,9,3,4,8],
    [8,4,3,7,6,2,5,9,1],
    [7,6,2,9,5,1,4,8,3],
    [3,8,4,2,7,6,9,1,5],
    [5,1,9,4,3,8,2,6,7],
];
var sMat = 0;

// Filling and cleaning by level

function level(event) {
    if(!event) {
		return; //Function checking if the event is empty.
	}
        var value = parseInt(event.currentTarget.value); // Getting value by click on the selectted level.  
    if(value === 1) {
        var soduko_level = 20 // The selected variable changing the level by "empty" cells, minimum one cell. 
    } else if (value === 2) {
        var soduko_level = 40
    } else if (value === 3) {
        var soduko_level = 60;
    }
    else if(value != 1 ) {
        soduko_level = localStorage.getItem('soduko_level') // Geting the variable via browser memory (Local Storage) 
    }
        localStorage.setItem('time_start',performance.now())
        localStorage.setItem('soduko_level',soduko_level)  // Saving the variable into the browser memory.
 }


function cleaningByLevel(localStorage){
    function rndMat(){
        var rndNum = Math.floor(Math.random()*(6-1))+1;
        if(rndNum == 1){
            sMat = sMat1
        }
        else if(rndNum == 2){
            sMat = sMat2
        }
        else if(rndNum == 3){
            sMat = sMat3
        }
        else if(rndNum == 4){
            sMat = sMat4
        }
        else if (rndNum == 5){
            sMat = sMat5
        }
    }
    rndMat()
        let count = 0; // The counter is counting how much cells to "delete" 
        while(count <= Number(localStorage.getItem('soduko_level'))){  // The stop of the loop depends on the level you picked.
        // The Variable index and I Randomaly pick a "place" Between 0-9 to start splicing.
        let i = Math.floor(Math.random()*(9-0))+0;    
        let index = Math.floor(Math.random()*(9-0))+0; 
        sMat[i].splice(index,1,[ ]);   // Starting to splice and placing an empty cell, insted of the value in the same postion of the matrix
        count++
    }
     // The loop filling the cells after the "clean" depends on the difficulty.
    for(let i=0; i < sMat.length; i++){
        for(let j=0; j<sMat[i].length; j++){
            document.getElementById("cell-"+(i*9+j)).value = (sMat[i][j]); //i*9+j= Getting all of the cells IDs.
        }
    }
    // The loop is taking the numbers that dident "cleand up" and making them disabled with specific color of Grey to identify which numbers is "disabled" 
    for(let i=0; i < sMat.length; i++ ){
        for(let j=0; j<sMat[i].length; j++){
            let disableNum = document.getElementById("cell-"+(i*9+j)).value
           if (disableNum <= 9 && disableNum >=1) {
                document.getElementById("cell-"+(i*9+j)).disabled = true;
                document.getElementById("cell-"+(i*9+j)).style.backgroundColor = '#E2E2E2' 
           }
        }
    }
}cleaningByLevel(localStorage)
var matrix;    // Creating a global variable.
//Check if the cell value provided by system.
function isCellHardcoded(i, j) {
    return document.getElementById("cell-"+(i*9+j)).disabled;
}
// Function that checking the solution of the sudoku.
function alternativeFinish() {
    matrix = [];   //  Placing array into the matrix.  
    for(var i=0; i<9; i++) {
        matrix[i] = [];
        for(var j=0; j<9; j++) {
            matrix[i][j] = Number(document.getElementById("cell-"+(i*9+j)).value);
        }
    }
    // real state of the table
    var isBoardValid = true;
    for (var i = 0; i < matrix.length; i++) {
        for (var j = 0; j < matrix[0].length; j++) {
            const cell = document.getElementById("cell-"+(i*9+j));
            if (!isCellHardcoded(i, j) && !isCellValid(matrix, i, j)) {
                    cell.style.backgroundColor = '#ED0000';
                    setTimeout(() => {
                    cell.style.backgroundColor = '#FFFFFF';
                }, 3000);
                    isBoardValid = false;
            } else if (!isCellHardcoded(i, j)) {
                cell.style.backgroundColor = '#FFFFFF';
            }
        }
    }
    if (isBoardValid) {
        function pop(){    //if the Board is valid, pop a window with your time and return you to the select level
            document.querySelector('.bg-modal').style.display = "flex"; // Changing the CSS from none to flex.
            var statTime = localStorage.getItem('time_start')   // "Taking" the time from the local stoarage
            var endTime = Math.floor((performance.now() - statTime) / 1000); // the exact moment of the browser 
            document.getElementById("time").innerHTML = "Your time is " + endTime + " seconds";
            setInterval(function(){window.location.href = "./level.html"}, 3500)  // Moving to the select level 
        }
        pop()
    }
}
function isCellValid(matrix, i, j) {  // Function that check if the cell is valid
    var cellEmpty = !Number(document.getElementById("cell-"+(i*9+j)).value);
    var rowValid = isRowValid(matrix, i, j); 
    var colValid = isColumnValid(matrix, i, j);
    var boxValid = isBoxValid(matrix, i, j);
    return !cellEmpty && rowValid && colValid && boxValid;
}  

function isRowValid(matrix, rowIndex, columnIndex) { // Function that check if the row is valid
    var cellValue = document.getElementById("cell-"+(rowIndex*9+columnIndex)).value;
    for (var i = 0; i < matrix[0].length; i++) {
        var checkedCellValue = document.getElementById("cell-"+(rowIndex*9+i)).value;
        if (columnIndex !== i && checkedCellValue === cellValue) {
            return false;
        }
    }
    return true;
}
function isColumnValid(matrix, rowIndex, columnIndex) {   //function that check if the Column is valid
    var cellValue = document.getElementById("cell-"+(rowIndex*9+columnIndex)).value;
    for (var i = 0; i < matrix.length; i++) {
        var checkedCellValue = document.getElementById("cell-"+(i*9+columnIndex)).value;
        if (rowIndex !== i && checkedCellValue === cellValue) {
            return false;
        }
    }
    return true;
}

function isBoxValid(matrix, rowIndex, columnIndex) { //function that check if the box is valid (3 by 3)
    var boundingBox = getBoundingBox(matrix, rowIndex, columnIndex);
    var cellValue = document.getElementById("cell-"+(rowIndex*9+columnIndex)).value;
    for (var i = boundingBox[0][0]; i < boundingBox[1][0]; i++) {
        for (var j = boundingBox[0][1]; j < boundingBox[1][1]; j++) {
            var checkedCellValue = document.getElementById("cell-"+(i*9+j)).value;
            if (!(rowIndex === i && columnIndex === j) && checkedCellValue === cellValue) {
                return false;
            }
        }
    }
    return true
}
// function that take the position of the box
function getBoundingBox(matrix, i, j) { 
    var boxLength = Math.sqrt(matrix.length); 
    var boxNumberY = Math.floor(j / boxLength); 
    var boxNumberX = Math.floor(i / boxLength); 
    var boxStartY = boxNumberY * boxLength; 
    var boxStartX = boxNumberX * boxLength; 
    var boxEndY = boxNumberY + boxLength - 1; 
    var boxEndX = boxNumberX + boxLength - 1; 
    return [[boxStartX, boxStartY], [boxEndX, boxEndY]];
}
function refresh(){
    location.reload()
}
    
