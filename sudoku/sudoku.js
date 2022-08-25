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

//True case
const bd_easy = [ // Number 25
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
var errors = 0

window.onload = function () {
    setBoard()
}

function setBoard() {
    for (let i = 1; i <= 9; i++) {
        let number = document.createElement("div")
        number.id = i
        number.innerText = i
        number.addEventListener("click", selectNumber)
        number.classList.add("number")
        document.getElementById("digits").appendChild(number)
    }

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            let tile = document.createElement("div")
            tile.id = i.toString() + "," + j.toString()
            if(emptyBoard[i][j] != null) {
                tile.innerText = parseInt(emptyBoard[i][j])
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
            document.getElementById("boardArea").append(tile)
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

function selectTile() {
    if(numberSelected) {
        if(this.innerText != "") {
            return
        }
        this.innerText = numberSelected.id
        let coords = this.id.split(",")
        let x = parseInt(coords[0]);
        let y = parseInt(coords[1]);
        //console.log(x + "," + y)
    }

}


function Initiate() {
    let startingBoard = [[]];
    let board = document.getElementById("boardArea")
    //let f = 0
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const val = document.getElementById(i + "," + j).innerText
            //console.log(val)
            if (val == "" || val === undefined || val === null) {
                startingBoard[i][j] = null;
            } else {
                startingBoard[i][j] = Number(val);
            }
            if (i % 9 == 0 && i < 81) {
                startingBoard.push([])
                //console.log("entered")
                //f++
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
                return [i, j];
            }
        }
    }
}

function keepValid(boards){
    const res = [];
    for (let i = 0; i < boards.length; i++){
        if (validBoard(boards[i])){
            res.push(boards[i]);
        }
    }
    return res
}



function goodRow(board){
    for (let i = 0; i < 9; i++){
        const current = [];
        for (let j = 0; j < 9; j++){
            if (current.includes(board[i][j])){
                return false;
            }
            else if (board[i][j] != null){
                current.push(board[i][j]);
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
                return false;
            }
            else if (board[j][i] != null){
                current.push(board[j][i]);
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
            let cur = [];
            for (let i = 0; i < 9; i++){
                const coords = [...boxCoord[i]];
                coords[0] += y
                coords[1] += x

                if (cur.includes(board[coords[0]][coords[1]])){
                    return false;
                }
                else if (board[coords[0]][coords[1]] != null){
                    cur.push(board[coords[0]][coords[1]]);
                }
            }
        }
    }
    return true
}

function validBoard(board){
    return goodRow(board) && goodCol(board) && goodInside(board);
}



function inputIsInvalid(){
    console.log("board invalid")
}

function Update(board) {
    console.log(board)
}
