import { Bishop } from "./classes/bishop.js"
import { Field } from "./classes/field.js"
import { Game } from "./classes/game.js"
import { King } from "./classes/king.js"
import { Knight } from "./classes/knight.js"
import { Pawn } from "./classes/pawn.js"
import { Queen } from "./classes/queen.js"
import { Rook } from "./classes/rook.js"
import { fieldsTakenBy } from "./types/types.js"

const board: HTMLElement = document.querySelector('.chessBoard')
const info: HTMLElement = document.querySelector('.infoContainer')
const click: HTMLElement = document.querySelector('.click')
const winningInfo: HTMLElement = document.querySelector('.winnigBoard')
const winningInfoMessage: HTMLElement = document.querySelector('.winningBoardInfo')
let game = new Game()
let activePiece: fieldsTakenBy
game.render(board)
let fields = document.querySelectorAll('.field')


board.addEventListener('click',(e)=>{
    let gameboard = game.giveGameboard
    const clickedChildField: any = e.target
    const clickedField: any = clickedChildField.parentElement
    const coordinates: number[] = clickedField.getAttribute('data-coordinates') === null ? clickedChildField.getAttribute('data-coordinates'): clickedField.getAttribute('data-coordinates')
    const gameField = gameboard.find(element => element.getFieldCoordinates.x == coordinates[0] && element.getFieldCoordinates.y == coordinates[2])
    
    if(gameField.isFieldTaken && !clickedField.classList.contains('possibleTakeField')){
        activePiece = gameField.whatPieceIsOnThisField
        if(activePiece.getColor === game.getActivePlayerColor){
            game.reRender(board)
            if(activePiece.getName === 'pawn')
            {   
                game.checkPossibleActions('enPassant',activePiece)
            }
            if(activePiece.getName === 'king')
            {   
                game.checkPossibleActions('castle',activePiece)
            }
            game.checkPossibleActions('Move',activePiece)
            game.checkPossibleActions('Take',activePiece)
        }
    }else if(!gameField.isFieldTaken){
        if(clickedChildField.classList.contains('possibleMoveField')){
            
            game.makeMove(gameField,activePiece,board,'move',false)
        }
        else if(clickedField.classList.contains('possibleTakeField')){
            game.enPassant(gameField,activePiece as Pawn,board)
    }
    }else if(clickedField.classList.contains('possibleTakeField')){
        game.makeMove(gameField,activePiece,board,'take',false)
    }if(clickedChildField.classList.contains('possibleCastleField')){
        if(clickedChildField.dataset.coordinates[2] === '3'){
            game.castle(activePiece,'left',board)
        }else if(clickedChildField.dataset.coordinates[2] === '7'){
            game.castle(activePiece,'right',board)
        }
    }
    if(game.mat){
       winningInfo.style.animation = 'showEndScreen 2s ease 0s 1 forwards'
       winningInfoMessage.innerHTML += `<br><span class = 'message'>${game.check.isWhiteKingChecked ? 'Black' : 'White'} won</span>`
       game.init()
       game.reRender(board)
    }
})
winningInfo.addEventListener('click',(e)=>{
    const click = e.target as HTMLElement
    if(click.classList.contains('playAgain'))
    {
        setTimeout(()=>{
            winningInfoMessage.innerHTML = '<button class="playAgain">Play again</button>'
        },500)
        winningInfo.style.animation = 'hideEndScreen 0.5s linear 0s 1 forwards'
    }
    
})

fields.forEach(field => {
    field.addEventListener('dragstart',(e)=>{
        let gameboard = game.giveGameboard
        const clickedChildField: any = e.target
        const clickedField: any = clickedChildField.parentElement
        const coordinates: number[] = clickedField.getAttribute('data-coordinates') === null ? clickedChildField.getAttribute('data-coordinates'):  clickedField.getAttribute('data-coordinates')
        const gameField = gameboard.find(element => element.getFieldCoordinates.x == coordinates[0] && element.getFieldCoordinates.y == coordinates[2])
    
        if(gameField.isFieldTaken && !clickedField.classList.contains('possibleTakeField')){
            activePiece = gameField.whatPieceIsOnThisField
            if(activePiece.getColor === game.getActivePlayerColor){
                fields = document.querySelectorAll('.field')
                if(activePiece.getName === 'pawn')
                {   
                    game.checkPossibleActions('enPassant',activePiece)
                }
                if(activePiece.getName === 'king')
                {   
                    game.checkPossibleActions('castle',activePiece)
                }
                game.checkPossibleActions('Move',activePiece)
                game.checkPossibleActions('Take',activePiece)
            }
        }
    })
    field.addEventListener('dragover',(e)=>{
        e.preventDefault()
    })
    field.addEventListener('drop',(e)=>{
        let gameboard = game.giveGameboard
        const clickedChildField: any = e.target
        const clickedField: any = clickedChildField.parentElement
        const coordinates: number[] = clickedField.getAttribute('data-coordinates') === null ? clickedChildField.getAttribute('data-coordinates'):  clickedField.getAttribute('data-coordinates')
        const gameField = gameboard.find(element => element.getFieldCoordinates.x == coordinates[0] && element.getFieldCoordinates.y == coordinates[2])
        console.log(clickedField)
        if(!gameField.isFieldTaken){
            if(clickedChildField.classList.contains('possibleMoveField')){
                
                game.makeMove(gameField,activePiece,board,'move',false)
            }
            else if(clickedField.classList.contains('possibleTakeField')){
                game.enPassant(gameField,activePiece as Pawn,board)
        }
        }
        if(game.mat){
           winningInfo.style.animation = 'showEndScreen 2s ease 0s 1 forwards'
           winningInfoMessage.innerHTML += `<br><span class = 'message'>${game.check.isWhiteKingChecked ? 'Black' : 'White'} won</span>`
           game.init()
           game.reRender(board)
        }
    })
})