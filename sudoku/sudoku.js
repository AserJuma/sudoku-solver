const e = null

const emptyBoard = [
    [e,e,e  ,e,e,e, e,e,e],
    [e,e,e  ,e,e,e, e,e,e],
    [e,e,e  ,e,e,e, e,e,e],

    [e,e,e  ,e,e,e, e,e,e],
    [e,e,e  ,e,e,e, e,e,e],
    [e,e,e  ,e,e,e, e,e,e],

    [e,e,e  ,e,e,e, e,e,e],
    [e,e,e  ,e,e,e, e,e,e],
    [e,e,e  ,e,e,e, e,e,e]
]

const Easy = [ // Number 25
    [e,e,4  ,1,e,3, 7,5,e],
    [e,e,3  ,8,e,6, 2,e,e],
    [1,e,2  ,e,5,e, e,e,6],

    [e,e,7  ,5,4,8, e,6,e],
    [e,3,9  ,e,6,e, e,e,e],
    [e,e,e  ,e,3,2, e,e,5],

    [e,6,e  ,3,e,4, 5,e,e],
    [e,e,e  ,e,e,e, e,1,8],
    [4,9,e  ,e,1,5, e,e,7]
]

const Intermediate = [ // Number 50
    [6,e,e  ,e,e,e, 7,e,e],
    [e,e,1  ,e,e,2, e,e,e],
    [e,3,e  ,e,e,4, 5,e,e],

    [e,e,4  ,7,e,6, e,e,e],
    [e,e,e  ,e,e,e, e,e,e],
    [e,e,e  ,8,1,e, 3,6,e],

    [e,e,5  ,9,e,e, e,e,7],
    [e,8,e  ,e,2,e, e,3,e],
    [7,e,e  ,e,e,8, e,1,5]
]

const Advanced = [ // NUmber 50
    [e,e,7  ,e,e,1, e,8,9],
    [e,1,e  ,e,e,2, 5,e,7],
    [9,4,e  ,e,e,e, e,2,e],
    [2,e,1  ,7,e,e, 8,e,e],
    [e,6,e  ,e,e,e, e,e,e],
    [8,e,5  ,6,e,e, 1,e,e],
    [e,e,e  ,e,e,8, e,e,3],
    [e,9,e  ,e,e,e, e,e,e],
    [e,e,e  ,e,5,e, e,4,e]
]

//False case
const bd_f = [
    [1,2,3  ,4,5,6, 7,8,e],
    [e,e,e  ,e,e,e, e,e,2],
    [e,e,e  ,e,e,e, e,e,3],

    [e,e,e  ,e,e,e, e,e,4],
    [e,e,e  ,e,e,e, e,e,5],
    [e,e,e  ,e,e,e, e,e,6],

    [e,e,e  ,e,e,e, e,e,7],
    [e,e,e  ,e,e,e, e,e,8],
    [e,e,e  ,e,e,e, e,e,9]
]

var numberSelected = null
var tileSelected = null
var diffSelected = null
var errors = 0

window.onload = function () {
    setBoard()
}

//const new_game_btn = document.createElement("button")

function setBoard() {

    let Title = document.getElementById('title')
    Title.innerText = "Sudoku Solver";

    let btnss = document.createElement("div")

    document.getElementById("btn-area").append(btnss)

    let difficulty = ["Easy", "Intermediate", "Advanced"]

    for (let i = 0; i < difficulty.length; i++) {
        let label = document.createElement('button')
        //let input = document.createElement('input')
        //btn.id = difficulty[i]
        label.value = difficulty[i]
        label.innerText = difficulty[i]
        label.classList.add("btn")
        label.classList.add("btn-secondary")
        label.classList.add("btn-light")
        //input.type="radio"
        //label.append(input)
        btnss.append(label)
    }

    let new_game_btn = document.createElement("button")
    new_game_btn.value = "Easy"
    new_game_btn.innerText = "New Game"
    new_game_btn.classList.add("btn")
    new_game_btn.classList.add("btn-primary")

    //new_game_btn.type = "submit"
    //new_game_btn.id = 'new-game'
    btnss.append(new_game_btn)


    btnss.addEventListener('click', (e) => {
        new_game_btn.value = e.target.value;

        //console.log(e.target.value)
    })

    new_game_btn.addEventListener('click', (e) => {
        //console.log(e.target.value)
        cleanBoard()
        switch (new_game_btn.value) {
            case "Easy":
                Update(Easy);
                break;
            case "Intermediate":
                Update(Intermediate);
                break;
            case "Advanced":
                Update(Advanced);
                break;
            default:
                return;
        }
    })

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            let tile = document.createElement("div")
            tile.id = i.toString() + "," + j.toString()
            if(emptyBoard[i][j] != null) {
                tile.innerText = emptyBoard[i][j]
                tile.classList.add("tile-start")
            }
            if( i == 2 || i == 5) {
                tile.classList.add("horiz-line")
            }
            if( j == 2 || j == 5) {
                tile.classList.add("vert-line")
            }
            tile.addEventListener("click", selectTile)
            tile.classList.add("tile")
            document.getElementById("board-area").append(tile)
        }
    }

    for (let i = 1; i <= 9; i++) {
        let number = document.createElement("div")
        number.id = i
        number.innerText = i
        number.addEventListener("click", selectNumber)
        number.classList.add("number")
        document.getElementById("digits-area").appendChild(number)
    }

}

function cleanBoard() {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            document.getElementById(i + "," + j).classList.remove("tile-selected")
        }
    }
}


function selectNumber() {
    if(numberSelected != null) {
        numberSelected.classList.remove("number-selected")
    }
    numberSelected = this
    numberSelected.classList.add("number-selected")
}
/*
function selectDifficulty() {
    if(diffSelected != null) {
        diffSelected.classList.add("diff-selected")
    }
    diffSelected = this
    diffSelected.classList.add("diff-selected")
}*/

function selectTile() {
    if(numberSelected) {
        if(this.innerText != "") {
            return
        }
        this.innerText = numberSelected.id
        //let coords = this.id.split(",")
        //let x = parseInt(coords[0]);
        //let y = parseInt(coords[1]);
        //console.log(x + "," + y)
        tileSelected = this
        tileSelected.classList.add("tile-selected")
    }

}


function Initiate() {
    let startingBoard = [[]];
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const val = document.getElementById(i + "," + j).innerText
            //console.log(val)
            if (val == "" || val === undefined || val === null) {
                startingBoard[i][j] = null
            } else {
                startingBoard[i][j] = Number(val)
            }
            if (i % 9 == 0 && i < 81) {
                startingBoard.push([])
            }
        }
    }
    startingBoard.pop()
    console.log(startingBoard)
    const inputValid = validBoard(startingBoard)
    if (!inputValid) {
        inputIsInvalid()
    } else {
        const answer = solve(startingBoard)
        Update(answer, inputValid)
    }

}

function solve(board) {
    if (solved(board)) {
        return board
    }
    else {
        const possibilities = nextBoards(board)
        const validBoards = keepValid(possibilities)
        return findSolution(validBoards)
    }
}

function findSolution(boards){
    if (boards.length < 1){
        return false
    }
    else {
        const first = boards.shift()
        const tryPath = solve(first)
        if (tryPath != false){
            return tryPath
        }
        else{
            return findSolution(boards)
        }
    }
}

function solved(board){
    for (let i = 0; i < 9; i++){
        for (let j = 0; j < 9; j++){
            if (board[i][j] == null){
                return false
            }
        }
    }
    return true
}

function nextBoards(board){
    const foo = [];
    const firstEmpty = findEmptySqr(board)
    if (firstEmpty != undefined){
        const y = firstEmpty[0]
        const x = firstEmpty[1]
        for (let i = 1; i <= 9; i++){
            const newBoard = [...board]
            const row = [...newBoard[y]]
            row[x] = i
            newBoard[y] = row
            foo.push(newBoard)
        }
    }
    return foo
}

function findEmptySqr(board){
    for (let i = 0; i < 9; i++){
        for (let j = 0; j < 9; j++){
            if (board[i][j] == null) {
                return [i, j]
            }
        }
    }
}

function keepValid(boards){
    const res = [];
    for (let i = 0; i < boards.length; i++){
        if (validBoard(boards[i])){
            res.push(boards[i])
        }
    }
    return res
}



function goodRow(board){
    for (let i = 0; i < 9; i++){
        const current = [];
        for (let j = 0; j < 9; j++){
            if (current.includes(board[i][j])){
                return false
            }
            else if (board[i][j] != null){
                current.push(board[i][j])
            }
        }
    }
    return true
}

function goodCol(board){
    for (let i = 0; i < 9; i++){
        const current = [];
        for (let j = 0; j < 9; j++){
            if (current.includes(board[j][i])){
                return false
            }
            else if (board[j][i] != null){
                current.push(board[j][i])
            }
        }
    }
    return true
}


function goodInside(board){
    const boxCoord = [
        [0, 0], [0, 1], [0, 2],
        [1, 0], [1, 1], [1, 2],
        [2, 0], [2, 1], [2, 2]
    ]
    for (let y = 0; y < 9; y += 3){
        for (let x = 0; x < 9; x += 3){
            let cur = []
            for (let i = 0; i < 9; i++){
                const coords = [...boxCoord[i]];
                coords[0] += y
                coords[1] += x

                if (cur.includes(board[coords[0]][coords[1]])){
                    return false
                }
                else if (board[coords[0]][coords[1]] != null){
                    cur.push(board[coords[0]][coords[1]])
                }
            }
        }
    }
    return true
}

function validBoard(board){
    return goodRow(board) && goodCol(board) && goodInside(board)
}



function inputIsInvalid(){
    document.getElementById("error-area").innerText = "Invalid Board"
    /*console.log("Board invalid")*/
}

function Update(board) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            document.getElementById(i + "," + j).innerText = board[i][j]
        }
    }
}

/*
//const btn = document.getElementById('new-game');

function sendData(data) {
    const XHR = new XMLHttpRequest();
    const FD = new FormData();

    // Push our data into our FormData object
    for (const [name, value] of Object.entries(data)) {
        FD.append(name, value);
    }

    // Define what happens on successful data submission
    XHR.addEventListener('load', (event) => {
        alert('Yeah! Data sent and response loaded.');
    });

    // Define what happens in case of error
    XHR.addEventListener('error', (event) => {
        alert('Oops! Something went wrong.');
    });

    // Set up our request
    XHR.open('POST', 'http://localhost:63342/SudokuSolver/index.html?');

    // Send our FormData object; HTTP headers are set automatically
    XHR.send(FD);
    XHR.onload = () => console.log(XHR.response);
}

new_game_btn.addEventListener('click', (event) => {
    event.preventDefault();
    sendData({ test: 'ok' });

});

*/
