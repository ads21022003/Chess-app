const positionBoard = {
    "player1": {
        "pawn1": '21',
        "pawn2": '22',
        "pawn3": '23',
        "pawn4": '24',
        "pawn5": '25',
        "pawn6": '26',
        "pawn7": '27',
        "pawn8": '28',
        "rook1": '11',
        "rook2": '18',
        "knight1": '12',
        "knight2": '17',
        "bishop1": '13',
        "bishop2": '16',
        "queen1": '14',
        "king1": '15'
    },
    "player2": {
        "pawn1": '71',
        "pawn2": '72',
        "pawn3": '73',
        "pawn4": '74',
        "pawn5": '75',
        "pawn6": '76',
        "pawn7": '77',
        "pawn8": '78',
        "rook1": '81',
        "rook2": '88',
        "knight1": '82',
        "knight2": '87',
        "bishop1": '83',
        "bishop2": '86',
        "queen1": '84',
        "king1": '85'
    }
}
const image = {
    "player1": {
        "bishop": "512h/w_bishop_png_512px.png",
        "rook": "512h/w_rook_png_512px.png",
        "pawn": "512h/w_pawn_png_512px.png",
        "knight": "512h/w_knight_png_512px.png",
        "queen": "512h/w_queen_png_512px.png",
        "king": "512h/w_king_png_512px.png"
    },
    "player2": {
        "bishop": "512h/b_bishop_png_512px.png",
        "rook": "512h/b_rook_png_512px.png",
        "pawn": "512h/b_pawn_png_512px.png",
        "knight": "512h/b_knight_png_512px.png",
        "queen": "512h/b_queen_png_512px.png",
        "king": "512h/b_king_png_512px.png"
    }

}
//creating class move
class Piece {
    constructor(name, player) {
        this.name = name;
        this.player = player;
        this.position = positionBoard[this.player][this.name]

    }
    straight() {
        const position = this.position;
        let vertiup = []
        let vertidown = []
        for (let i = parseInt(position[0]) + 1; i <= 8; i++) {
            vertiup.push(i + position[1])
        }
        for (let i = parseInt(position[0]) - 1; i > 0; i--) {
            vertidown.push(i + position[1])
        }
        const verti = {
            "vertiup": vertiup,
            'vertidown': vertidown
        }
        let horiright = []
        let horileft = []
        for (let i = parseInt(position[1]) + 1; i <= 8; i++) {
            horiright.push(position[0] + i)
        }
        for (let i = parseInt(position[1]) - 1; i > 0; i--) {
            horileft.push(position[0] + i)
        }
        const hori = {
            "horileft": horileft,
            'horiright': horiright
        }
        const straight = {
            'hori': hori,
            'verti': verti
        }
        let straightArr = [horileft, horiright, vertiup, vertidown]
        return straightArr

    }
    diagnol() {
        let rightup = []
        let rightdown = []
        const position = this.position;
        let j = parseInt(position[0])
        for (let i = parseInt(position[1]) + 1; i <= 8 && j < 8; i++) {
            j++
            if (j > 0 && j < 9 && i > 0 && i <= 8)
                rightup.push(`${j}${i}`)
        }
        j = parseInt(position[0])
        for (let i = parseInt(position[1]) - 1; i > 0 && j > 1; i--) {
            j--
            if (j > 0 && j < 9 && i > 0 && i <= 8)
                rightdown.push(`${j}${i}`)
        }
        const right = {
            'rightup': rightup,
            'rightdown': rightdown,
        }
        let leftup = []
        let leftdown = []
        j = parseInt(position[0])
        for (let i = parseInt(position[1]) - 1; i < 9 && i > 0 && j > 0; i--) {
            j++
            if (j > 0 && j < 9 && i > 0 && i <= 8)
                leftup.push(`${j}${i}`)

        }
        j = parseInt(position[0])
        for (let i = parseInt(position[1]) + 1; i > 0 && j > 1; i++) {
            j--
            if (j > 0 && j < 9 && i > 0 && i <= 8)
                leftdown.push(`${j}${i}`)
        }
        const left = {
            'leftup': leftup,
            'leftdown': leftdown,
        }
        const diagnol = {
            'left': left,
            'right': right
        }
        let diagnolArr = [leftup, leftdown, rightup, rightdown]
        return diagnolArr
    }
    twohalf() {
        let twohalf = []
        const position = this.position
        let i = parseInt(position[0])
        let j = parseInt(position[1])
        if (j + 1 > 0 && j + 1 < 9 && i - 2 > 0 && i - 2 <= 8)
            twohalf.push(`${i - 2}${j + 1}`)
        if (j - 1 > 0 && j - 1 < 9 && i - 2 > 0 && i - 2 <= 8)
            twohalf.push(`${i - 2}${j - 1}`)
        if (j - 1 > 0 && j - 1 < 9 && i + 2 > 0 && i + 2 <= 8)
            twohalf.push(`${i + 2}${j - 1}`)
        if (j + 1 > 0 && j + 1 < 9 && i + 2 > 0 && i + 2 <= 8)
            twohalf.push(`${i + 2}${j + 1}`)
        if (j + 2 > 0 && j + 2 < 9 && i + 1 > 0 && i + 1 <= 8)
            twohalf.push(`${i + 1}${j + 2}`)
        if (j + 2 > 0 && j + 2 < 9 && i - 1 > 0 && i - 1 <= 8)
            twohalf.push(`${i - 1}${j + 2}`)
        if (j - 2 > 0 && j - 2 < 9 && i + 1 > 0 && i + 1 <= 8)
            twohalf.push(`${i + 1}${j - 2}`)
        if (j - 2 > 0 && j - 2 < 9 && i - 1 > 0 && i - 1 <= 8)
            twohalf.push(`${i - 1}${j - 2}`)
        return twohalf
    }
    single() {
        let single = []
        const position = this.position
        let i = parseInt(position[0])
        let j = parseInt(position[1])
        for (let y = -1; y < 2; y++) {
            for (let x = -1; x < 2; x++) {
                if (x != 0 || y != 0)
                    single.push(`${i + y}${j + x}`)
            }
        }
        if (this.name.slice(0, this.name.length - 1) == 'pawn') {
            if (this.player == 'player1') {
                single = single.slice(single.length - 3);
                if (positionBoard.player1[this.name][0] == '2') {
                    single[1] = [single[1], `${parseInt(single[1][0]) + 1}${single[1][1]}`]
                }

            } else if (this.player == 'player2') {
                single = single.slice(0, 3)
                if (positionBoard.player2[this.name][0] == '7') {
                    single[1] = [single[1], `${parseInt(single[1][0]) - 1}${single[1][1]}`]
                }
            }
        }
        let validSingle = []
        for (let p of single) {
            if (typeof (p) == typeof (validSingle)) {
                validSingle.push(p)
            } else { }
            let i = parseInt(p[0])
            let j = parseInt(p[1])
            if ((j > 0 && j < 9 && i > 0 && i <= 8))
                validSingle.push(`${i}${j}`)
        }
        return validSingle
    }
    linearChecker(moves) {
        let final = []
        let x = positionBoard[`player1`]
        let y = positionBoard[`player2`]
        if (this.player == 'player2') {
            x = positionBoard[`player2`]
            y = positionBoard[`player1`]
        }
        for (let move of moves) {
            for (let j of Object.keys(x)) {
                if (x[j] == move) {
                    final.push(false)
                    break
                }
            }
            if (final[final.length - 1] == false) {
                break
            } else {
                final.push(move)
            }
        }
        if (final[final.length - 1] == false) {
            return final.slice(0, final.length - 1)
        } else {
            final = []
            for (let move of moves) {
                for (let j of Object.keys(y)) {
                    if (y[j] == move) {
                        final.push([move, true, j])
                        break
                    }
                }
                if (typeof (final[final.length - 1]) == typeof (final)) {
                    break
                } else {
                    final.push(move)
                }
            }
            return final
        }
    }
    singleCheck(move) {
        let x = positionBoard[`player1`]
        let y = positionBoard[`player2`]
        if (this.player == 'player2') {
            x = positionBoard[`player2`]
            y = positionBoard[`player1`]
        }
        for (let i of Object.keys(x)) {
            if (x[i] == move)
                return null
        }
        for (let i of Object.keys(y)) {
            if (y[i] == move)
                return [move, true, i]

        }
        return move
    }
    batchCheck(arr) {
        let output = []
        for (let i of arr) {
            if (typeof (i) == 'string') {
                let x = this.singleCheck(i)
                if (x !== null) {
                    output.push(x)
                }
            } else {
                let x = this.linearChecker(i)
                if (x.length != 0) {
                    output = output.concat(x)
                }
            }
        }
        return output
    }

    flatner(arr) {
        let output = []
        for (let i of arr) {
            if (typeof (i) == 'string') {
                output.push(i)
            }
            else {
                output = output.concat(i)
            }

        }
        return output
    }
    toggleOn(arr, player,y) {
        const piece = this
        for (let i of arr) {
            if (typeof (i) == 'string') {
                let q = document.querySelector(`#a${i}`)
                if (q.classList.length == 0) {
                    q.classList.add('select')
                    q.addEventListener('click',async function () {
                        game.removeButton(piece.player)
                        piece.toggleOff(arr)
                        await game.imgMove(piece.position,i,piece.player,piece.name)
                        piece.position = i
                        turn = true
                        positionBoard[piece.player][piece.name] = i
                        game.removeButton(piece.player)
                        switchOn =[]
                    })
                }
            } else {
                let q = document.querySelector(`#a${i}`)
                if (q.classList.length == 0) {
                    q.classList.add('kill')
                    q.addEventListener('click', function () {
                        game.removeButton(piece.player)
                        game.imgMove(piece.position,i[0],piece.player,piece.name)
                        piece.position = i[0]
                        player[i[2]].position = null
                        positionBoard[y][i[2]] = null
                        piece.toggleOff(arr)
                        positionBoard[piece.player][piece.name] = i[0]
                        turn = true
                        game.removeButton(piece.player)
                        switchOn =[]
                    })
                }
            }
        }
    }
    toggleOff(arr) {
        for (let i of arr) {
            if (typeof (i) == 'string') {
                let q = document.querySelector(`#a${i}`)
                q.classList.remove('select')
                q.replaceWith(q.cloneNode(true));
            } else {
                let q = document.querySelector(`#a${i}`)
                q.classList.remove('kill')
                q.replaceWith(q.cloneNode(true));
            }
        }
    }
}
class Queen extends Piece {
    constructor(name, player) {
        super(name, player)
    }
    move() {
        let move = []
        move = move.concat(this.diagnol(), this.straight())
        move = this.batchCheck(move)
        return move
    }


}
class Rook extends Piece {
    constructor(name, player) {
        super(name, player)
    }
    move() {
        let move = []
        move = move.concat(this.straight())
        let legalMove = this.batchCheck(move)
        return legalMove
    }


}
class Bishop extends Piece {
    constructor(name, player) {
        super(name, player)
    }
    move() {
        let move = []
        move = move.concat(this.diagnol())
        move = this.batchCheck(move)
        return move
    }


}
class Knight extends Piece {
    constructor(name, player) {
        super(name, player)
    }
    move() {
        let move = []
        move = move.concat(this.twohalf())
        move = this.batchCheck(move)
        return move
    }


}
class King extends Piece {
    constructor(name, player) {

        super(name, player)
    }
    move() {
        let move = []
        move = move.concat(this.single())
        move = this.batchCheck(move)
        return move
    }


}
class Pawn extends Piece {
    constructor(name, player) {
        super(name, player)
    }
    move() {
        let move = []
        let output = []
        move = move.concat(this.single())
        move = this.batchCheck(move)
        for (let i of move) {
            if (typeof (i) != 'string') {
                if (i[0][1] !=this.position[1]){
                    output.push(i)
                } 
                }
            else {
                if (i[1] == positionBoard[this.player][this.name][1]) {
                    output.push(i)
                }
            }
        }
        return output
    }
}
class Game {
    constructor(x) {
        this.x = x;
    }
    start() {
        let piece = {}
        for (let i of Object.keys(positionBoard)) {
            piece[i] = {}
            for (let j of Object.keys(positionBoard[i])) {
                switch (j.slice(0, j.length - 1)) {
                    case 'pawn':
                        piece[i][j] = new Pawn(j, i)
                        break;
                    case 'rook':
                        piece[i][j] = new Rook(j, i)
                        break;
                    case 'knight':
                        piece[i][j] = new Knight(j, i)
                        break;
                    case 'bishop':
                        piece[i][j] = new Bishop(j, i)
                        break;
                    case 'king':
                        piece[i][j] = new King(j, i)
                        break;
                    case 'queen':
                        piece[i][j] = new Queen(j, i)
                        break;


                }
            }

        }
        return piece
    }
    button(x, y) {
        let player = piece[x]
        let oppPlayer = piece[y]
        for (let i of Object.keys(player)) {
            let pos = player[i].position
            if (pos != null) {
                const b = document.querySelector(`#a${pos}`)
                let move = player[i].move()
                let state = true
                b.addEventListener('click', function () {
                    if (state) {
                        if (switchOn.length==0){
                            switchOn =[pos]
                        }else{
                            document.querySelector(`#a${switchOn[0]}`).click()
                            switchOn =[pos]
                        }
                        player[i].toggleOn(move, oppPlayer,y)
                        state = false

                    } else {
                        player[i].toggleOff(move)
                        state = true
                        switchOn=[]
                    }
                })
            }
        }
    }
    removeButton(x) {
        let player = piece[x]
        for (let i of Object.keys(player)) {
            let pos = player[i].position
            if (pos != null) {
                let q = document.querySelector(`#a${pos}`)
                threatMap[player[i].name]= player[i].move()
                q.replaceWith(q.cloneNode(true));
            }
        }
    }
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    async wait() {
        while (true) {
            if (turn == true) {
                return 'yess'
            } else {
                await this.sleep(100)
            }
        }
    }
    image() {
        for (let i of Object.keys(piece)) {
            for (let j of Object.keys(piece[i])) {
                const imgSelect = document.querySelector(`#a${piece[i][j].position}`)
                const img = document.createElement('img')
                img.src = image[i][j.slice(0, j.length - 1)]
                img.alt = `${piece[i][j].name}_${piece[i][j].player}`
                imgSelect.append(img)
            }
        }
    }
    async imgMove(origPos, newPos, player, name) {
        let x = parseInt(newPos[1]) - parseInt(origPos[1])
        let y = parseInt(newPos[0]) - parseInt(origPos[0])
        let img = document.querySelector(`img[alt=${name}_${player}]`)
        let imgCopy =img.cloneNode(true)
        img.offsetHeight
        img.style.translate = `${x * 7}vh ${-(y * 7)}vh`
        img.style.transition = '0.75s'
        await game.sleep(750)
        let newimg =document.querySelector(`#a${newPos}`)
        newimg.innerHTML=''
        newimg.append(imgCopy)
        img.remove()
    }
}
 let game = new Game(1)
 let piece = game.start()
 let img = game.image()
 let playing = 'player1'
 let opponent = 'player2'
 let turn = false
 let switchOn =[]
 let threatMap = {}
 //joining everything together here we goooooo!!!!!!!!!!!!!!!!!
 async function match() {
     while (true) {
         game.button(playing, opponent)
         let x = playing
         await game.wait()
         playing = opponent
         opponent = x
         turn = false
     }
 }
 match()