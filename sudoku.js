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
    if(solved(board)) {
        return board

    } else {
        const options = nextBoards(board)
        const validBoards = keepValidOnly(options)
        return findSolution(validBoards)
    }
}

function findSolution(boards) {
    if(boards.length < 1) {
        return false
    } else {
        //Backtrack search
        let frst = boards.shift()
        let tryPath = solve(frst)
        if(tryPath != false) {
            return tryPath
        } else { // Abandon and move on to next board
            return findSolution(boards)
        }
    }
}

function solved(board) {
    for(let i = 0 ; i < 9 ; i++) {
        for(let j = 0 ; j < 9 ; j++) {
            if(board[i][j] === null) {
                return false
            }
        }
    }
    return true
}

function nextBoards(board) {
    let f = []
    const empty = findEmptySqr(board)
    if(empty != undefined) {
        const y = empty[0]
        const x = empty[1]
        for(let i = 1 ; i <= 9 ; i++) {
            let newBoard = [...board]
            let row = [...newBoard[y]]
            row[x] = i
            newBoard[y] = row
            f.push(newBoard)
        }
    }
    return f
}

function findEmptySqr(board) {
    for(let i = 0 ; i < 9 ; i++) {
        for(let j = 0 ; j < 9 ; j++) {
            if(board[i][j] === null) {
                return [i,j];
            }
        }
    }
}

function keepValidOnly(boards) {
    return boards.filter((b) => validBoard(b))
}

function validBoard(board) {
    return goodRow(board) && goodCol(board) && goodInside(board)
}

function goodRow(board) {

}

function goodCol(board) {

}

function goodInside() {

}
