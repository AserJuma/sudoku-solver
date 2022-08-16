const e = null

const alpha = [
    [e,e,e,e,e,e,e,e,e],
    [e,e,e,e,e,e,e,e,e],
    [e,e,e,e,e,e,e,e,e],
    [e,e,e,e,e,e,e,e,e],
    [e,e,e,e,e,e,e,e,e],
    [e,e,e,e,e,e,e,e,e],
    [e,e,e,e,e,e,e,e,e],
    [e,e,e,e,e,e,e,e,e],
    [e,e,e,e,e,e,e,e,e]
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
        const first = boards.shift();
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
            const newBoard = [...board];
            const row = [...newBoard[y]];
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
        [2, 0], [2, 1], [2, 2]]
    for (let y = 0; y < 9; y += 3){
        for (let x = 0; x < 9; x += 3){
            let cur = [];
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

console.log(solve(bd_f))
