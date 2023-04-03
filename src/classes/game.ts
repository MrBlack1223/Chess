import { color, fieldCoordinates, fieldsTakenBy, matchRecord, move } from "../types/types.js"
import { Field } from "./field.js"
import { King } from "./king.js"
import { Pawn } from "./pawn.js"
import { Piece } from "./piece.js"

export class Game{
    private gameboard:{
        fields: Field[],
        moves: number
     }  = {
         fields: [],
         moves: 0
     }
     private matchRecord : matchRecord
     private activePlayer: color
     public mat: boolean
     public check: {isWhiteKingChecked: boolean, isBlackKingChecked: boolean}

     constructor(){
        this.init()
     }
    public get giveGameboard(): Field[] {
        return this.gameboard.fields
    }
    public get getActivePlayerColor():'white'|'black' {
        return this.activePlayer
    }
    get giveGameboardMoves():  number {
        return this.gameboard.moves
    }
    public init: ()=> void = ()=>{
        this.activePlayer = 'white'
        this.matchRecord = []
        this.check = {isWhiteKingChecked:false , isBlackKingChecked: false}
        this.mat = false
        this.gameboard.fields = []
        let gameboard = this.giveGameboard
        for(let i= 0 ;i<8; i++){
            for(let j = 0; j<8; j++){
                const field = new Field({x: 8-i , y: j+1},'white')
                if(i % 2 === 0){
                    j % 2 === 0 ? field.setFieldColor = "white" : field.setFieldColor = "black"
                }else{
                    j % 2 === 0 ? field.setFieldColor= "black" : field.setFieldColor= "white"
                }
                gameboard.push(field)
            }
    }}
    public render: (board: HTMLElement)=>void = (board: HTMLElement)=>{
        let chessBoard = this.giveGameboard
        for(let i = 0;i<chessBoard.length;i++){
            const visibleField = document.createElement('div')
            visibleField.classList.add('field')
            if(chessBoard[i].getFieldColor === 'white'){
                visibleField.classList.add('whiteField')
            }else if(chessBoard[i].getFieldColor === 'black'){
                visibleField.classList.add('blackField')
            }
            if(!chessBoard[i].isFieldTaken){
                visibleField.innerHTML = ''
            }
            if(chessBoard[i].isFieldTaken){
                const piece = chessBoard[i].whatPieceIsOnThisField
                if(piece.getName === 'pawn'){
                    const visibleFieldChild = document.createElement('div')
                    visibleFieldChild.draggable = true
                    piece.getColor === 'white' ? visibleFieldChild.classList.add('whitePawnOwner') : visibleFieldChild.classList.add('blackPawnOwner')
                    
                    visibleField.appendChild(visibleFieldChild)
                }else if(piece.getName === 'rook'){
                    const visibleFieldChild = document.createElement('div')
                    visibleFieldChild.draggable = true
                    piece.getColor === 'white' ? visibleFieldChild.classList.add('whiteRookOwner') : visibleFieldChild.classList.add('blackRookOwner')
                    
                    visibleField.appendChild(visibleFieldChild)
                }else if(piece.getName === 'knight'){
                    const visibleFieldChild = document.createElement('div')
                    visibleFieldChild.draggable = true
                    piece.getColor === 'white' ? visibleFieldChild.classList.add('whiteHorseOwner') : visibleFieldChild.classList.add('blackHorseOwner')
                    
                    visibleField.appendChild(visibleFieldChild)
                }else if(piece.getName === 'bishop'){
                    const visibleFieldChild = document.createElement('div')
                    visibleFieldChild.draggable = true
                    piece.getColor === 'white' ? visibleFieldChild.classList.add('whiteBishopOwner') : visibleFieldChild.classList.add('blackBishopOwner')
                    
                    visibleField.appendChild(visibleFieldChild)
                }
                else if(piece.getName === 'queen'){
                    const visibleFieldChild = document.createElement('div')
                    visibleFieldChild.draggable = true
                    piece.getColor === 'white' ? visibleFieldChild.classList.add('whiteQueenOwner') : visibleFieldChild.classList.add('blackQueenOwner')
                    
                    visibleField.appendChild(visibleFieldChild)
                }
                else if(piece.getName === 'king'){
                    const visibleFieldChild = document.createElement('div')
                    visibleFieldChild.draggable = true
                    piece.getColor === 'white' ? visibleFieldChild.classList.add('whiteKingOwner') : visibleFieldChild.classList.add('blackKingOwner')
                    
                    visibleField.appendChild(visibleFieldChild)
                }     
            }
            visibleField.setAttribute('data-coordinates',`${[chessBoard[i].getFieldCoordinates.x,chessBoard[i].getFieldCoordinates.y]}`)
            board.appendChild(visibleField)
        }
       
    }
    public checkPossibleActions: (action:string, figure: fieldsTakenBy)=>void = (action: string, figure: fieldsTakenBy)=>{
        let piece = figure 
        let moveArray = action ==='Move' ? piece.showAvailableFields(this.giveGameboard) : piece.whatPiecesCanTake(this.giveGameboard)
        if(action==='enPassant'){
            let pawn: Pawn = figure as Pawn
            moveArray = pawn.isEnPassantPossible(this.giveGameboard,this.matchRecord)
            action = 'Take'
        }
        if(action==='castle' && piece.getMoveCounter === 0){
            let king: King = figure as King
            let castleImpossible = false
            let possibleCastleField1 = document.querySelector(`[data-coordinates="${king.getCurrentField.getFieldCoordinates.x},${king.getCurrentField.getFieldCoordinates.y + 2}"`)
            let possibleCastleGameboardField1 = this.gameboard.fields.find(el=>el.getFieldCoordinates.x ===king.getCurrentField.getFieldCoordinates.x && el.getFieldCoordinates.y === king.getCurrentField.getFieldCoordinates.y + 2 )
            let possibleCastleField2 = document.querySelector(`[data-coordinates="${king.getCurrentField.getFieldCoordinates.x},${king.getCurrentField.getFieldCoordinates.y - 2}"`)
            let possibleCastleGameboardField2 = this.gameboard.fields.find(el=>el.getFieldCoordinates.x ===king.getCurrentField.getFieldCoordinates.x && el.getFieldCoordinates.y === king.getCurrentField.getFieldCoordinates.y - 2 )
        
            for(let i = 1; i<3; i++){
                let fieldContainer = eval(`possibleCastleField${i}`)
                let gameboardFieldContainer = eval(`possibleCastleGameboardField${i}`)
                if(fieldContainer !== undefined && !gameboardFieldContainer.isFieldTaken){
                    fieldContainer.classList.toggle('possibleCastleField')
                }
            }
            action = 'Castle'
        }
        for(let i=0; i<moveArray.length; i++){
            let possibleVisibleMoveField = document.querySelector(`[data-coordinates="${moveArray[i].x},${moveArray[i].y}"`)
            possibleVisibleMoveField.classList.toggle(`possible${action}Field`)
        }
    }
    public reRender: (board: HTMLElement)=>void = (board: HTMLElement)=>{
        this.cleanBoard(board)
        this.render(board)
        let activePiece
        let fields = document.querySelectorAll('.field')
        fields.forEach(field=>{
            field.addEventListener('dragstart',(e)=>{
                let gameboard = this.giveGameboard
                const clickedChildField: any = e.target
                const clickedField: any = clickedChildField.parentElement
                const coordinates: number[] = clickedField.getAttribute('data-coordinates') === null ? clickedChildField.getAttribute('data-coordinates'):  clickedField.getAttribute('data-coordinates')
                const gameField = gameboard.find(element => element.getFieldCoordinates.x == coordinates[0] && element.getFieldCoordinates.y == coordinates[2])
                if(gameField.isFieldTaken && !clickedField.classList.contains('possibleTakeField')){
                    activePiece = gameField.whatPieceIsOnThisField
                    if(activePiece.getColor === this.getActivePlayerColor){
                        fields = document.querySelectorAll('.field')
                        if(activePiece.getName === 'pawn')
                        {   
                            this.checkPossibleActions('enPassant',activePiece)
                        }
                        if(activePiece.getName === 'king')
                        {   
                            this.checkPossibleActions('castle',activePiece)
                        }
                        this.checkPossibleActions('Move',activePiece)
                        this.checkPossibleActions('Take',activePiece)
                    }
                }
            })
            field.addEventListener('dragover',(e)=>{
                e.preventDefault()
            })
            field.addEventListener('drop',(e)=>{

                let gameboard = this.giveGameboard
                const clickedChildField: any = e.target
                const clickedField: any = clickedChildField.parentElement
                const coordinates: number[] = clickedField.getAttribute('data-coordinates') === null ? clickedChildField.getAttribute('data-coordinates'):  clickedField.getAttribute('data-coordinates')
                const gameField = gameboard.find(element => element.getFieldCoordinates.x == coordinates[0] && element.getFieldCoordinates.y == coordinates[2])
                if(!gameField.isFieldTaken){
                    if(clickedChildField.classList.contains('possibleMoveField')){
                        
                        this.makeMove(gameField,activePiece,board,'move',false)
                    }
                    else if(clickedField.classList.contains('possibleTakeField')){
                        this.enPassant(gameField,activePiece as Pawn,board)
                }
                }else if(clickedField.classList.contains('possibleTakeField')){
                    this.makeMove(gameField,activePiece,board,'take',false)
                }if(clickedChildField.classList.contains('possibleCastleField')){
                    if(clickedChildField.dataset.coordinates[2] === '3'){
                        this.castle(activePiece,'left',board)
                    }else if(clickedChildField.dataset.coordinates[2] === '7'){
                        this.castle(activePiece,'right',board)
                    }
                    
                }
                if(this.mat){
                    const winningInfo: HTMLElement = document.querySelector('.winnigBoard')
                    const winningInfoMessage: HTMLElement = document.querySelector('.winningBoardInfo')
                    winningInfo.style.animation = 'showEndScreen 2s ease 0s 1 forwards'
                    winningInfoMessage.innerHTML += `<br><span class = 'message'>${this.check.isWhiteKingChecked ? 'Black' : 'White'} won</span>`
                    this.init()
                    this.reRender(board)
                }
            })
        })
    
    }
    public cleanBoard: (board: HTMLElement)=>void = (board: HTMLElement)=>{
        board.innerHTML = ""
    }
    public makeMove: (newField: Field, activePiece: fieldsTakenBy, board: HTMLElement, action: 'take'|'move', isVirtual: boolean)=>void = ( newField: Field, activePiece: fieldsTakenBy,board: HTMLElement, action: 'take'|'move', isVirtual: boolean)=>{
        if(activePiece.getColor === this.activePlayer){
            let whoWasBefore: fieldsTakenBy  = newField.whatPieceIsOnThisField
            if(activePiece.getName === 'pawn'){
                let piece: Pawn = activePiece as Pawn
                piece.move(newField)
                piece.changeToQueen()
                let move: move = {
                    piece: activePiece,
                    action: action,
                    prevField: activePiece.getPreviousField,
                    currentField: activePiece.getCurrentField,
                    isCheck: false,
                    whoWasPreviousHere: whoWasBefore
                }
                this.matchRecord.push({
                    moveNumber: this.matchRecord.length,
                    move:move
                })
            }else{
                activePiece.move(newField)
                let move: move = {
                    piece: activePiece,
                    action: action,
                    prevField: activePiece.getPreviousField,
                    currentField: activePiece.getCurrentField,
                    isCheck: false,
                    whoWasPreviousHere: whoWasBefore
                }
                this.matchRecord.push({
                    moveNumber: this.matchRecord.length,
                    move:move
                })

            }
            if(!isVirtual)this.reRender(board)
            this.lookIfCheck()
            if( this.check.isBlackKingChecked && this.check.isWhiteKingChecked && !isVirtual){
                this.check.isBlackKingChecked = false
                this.check.isWhiteKingChecked = false
                this.deleteLastMove()
                this.reRender(board)
            }
            else if( this.check.isBlackKingChecked && this.activePlayer === 'black' && !isVirtual){
                this.check.isWhiteKingChecked = false
                this.deleteLastMove()
                this.reRender(board)
            }
            else if( this.check.isWhiteKingChecked && this.activePlayer === 'white' && !isVirtual){
                this.check.isBlackKingChecked = false
                this.deleteLastMove()
                this.reRender(board)
            }else if( this.check.isBlackKingChecked && this.activePlayer === 'white' && !isVirtual){
                const lookIfMat = this.lookIfAnyMoveIsPossible(board)
                if(!lookIfMat){
                    this.mat = true
                }

            }else if( this.check.isWhiteKingChecked && this.activePlayer === 'black' && !isVirtual){
                const lookIfMat = this.lookIfAnyMoveIsPossible(board)
                if(!lookIfMat){
                    this.mat = true
                }
            }
            this.activePlayer = this.activePlayer === 'white' ? 'black' : 'white'
    }
    }
    public deleteLastMove :()=>void= ()=>{
        let lastMove = this.matchRecord[this.matchRecord.length -1].move
        let piece = lastMove.piece
        this.activePlayer = this.activePlayer === 'white' ? 'black' : 'white'
        if(lastMove.action === 'move'){
            piece.move(piece.getPreviousField)
        }else if(lastMove.action === 'take'){
            piece.move(piece.getPreviousField)
            lastMove.currentField.setFieldIsTaken = true
            lastMove.currentField.setFieldIsTakenBy = lastMove.whoWasPreviousHere
        }
        if(piece.getMoveCounter > 0)piece.setMoveCounter = piece.getMoveCounter  - 1
        this.matchRecord.pop()
    }
    public castle: (activePiece: fieldsTakenBy, dir: string, board:HTMLElement)=>void=(activePiece: fieldsTakenBy, dir: string, board:HTMLElement)=>{
        let king = activePiece as King
        if(king.getMoveCounter === 0){
            let whatsRookPosition = king.getColor === 'white' ? 1 : 8
            let whatTypeOfCastle = dir === 'right' ? 8 : 1
            let rook = this.gameboard.fields.find(el=> el.getFieldCoordinates.x === whatsRookPosition && el.getFieldCoordinates.y === whatTypeOfCastle).whatPieceIsOnThisField
            if(rook.getMoveCounter === 0){
                let ifCastleIsPossible = true
                let length = dir === 'right'? 2:3
                for(let i =0;i < length; i++){
                    let startCheckingField = dir === 'right'? 6 : 2
                    let field = this.gameboard.fields.find(el=> el.getFieldCoordinates.x === whatsRookPosition && el.getFieldCoordinates.y === startCheckingField + i)
                    king.setMoveCounter = king.getMoveCounter < 0 ? 0 : king.getMoveCounter
                    let isFieldTaken = field.isFieldTaken
                    if(!isFieldTaken){
                        let canIMoveHere = this.lookIfMoveIsPossible(field,king,board,'move')
                        this.activePlayer = this.activePlayer === 'white' ? 'black' : 'white'
                        if(!canIMoveHere || isFieldTaken){
                            ifCastleIsPossible = false
                            king.setMoveCounter = 0
                            return}
                    }else if(isFieldTaken){
                            ifCastleIsPossible = false
                            return
                    }
                }
                if(ifCastleIsPossible){
                    let kingPlace = dir === 'right' ?  7 : 3
                    let rookPlace =  dir === 'right' ?  6 : 4
                    king.move(this.gameboard.fields.find(el=> el.getFieldCoordinates.x === whatsRookPosition && el.getFieldCoordinates.y === kingPlace))
                    rook.move(this.gameboard.fields.find(el=> el.getFieldCoordinates.x === whatsRookPosition && el.getFieldCoordinates.y === rookPlace))
                    this.reRender(board)
                    if(king.getColor === 'white'){
                        this.activePlayer = 'black'
                    }else if(king.getColor === 'black')
                    {
                        this.activePlayer = 'white'
                    }
                    let move: move = {
                        piece: king,
                        action: 'move',
                        prevField: activePiece.getPreviousField,
                        currentField: activePiece.getCurrentField,
                        isCheck: false,
                    }
                    let move2: move = {
                        piece: rook,
                        action: 'move',
                        prevField: activePiece.getPreviousField,
                        currentField: activePiece.getCurrentField,
                        isCheck: false,
                    }
                    this.matchRecord.push({
                        moveNumber: this.matchRecord.length,
                        move:move
                    })
                    this.matchRecord.push({
                        moveNumber: this.matchRecord.length,
                        move:move2
                    })
                    king.setMoveCounter = 1
                    rook.setMoveCounter = 1
                }  
            }
        }
    }
    public lookIfCheck: ()=>void = ()=>{
        let arrayOfDangerousFields: fieldCoordinates[] = []
        for(let i =0;i<this.gameboard.fields.length;i++){
            let field = this.gameboard.fields[i]
            if(field.isFieldTaken ){
                if(field.whatPieceIsOnThisField.getName !== 'king'){
                    let subArray : fieldCoordinates[]= field.whatPieceIsOnThisField.whatPiecesCanTake(this.gameboard.fields)
                    arrayOfDangerousFields = arrayOfDangerousFields.concat(subArray)
                }
            }
        }
        for(let i =0;i<this.gameboard.fields.length;i++){
            let field = this.gameboard.fields[i]
            if(field.isFieldTaken){
                if(field.whatPieceIsOnThisField.getName === 'king'){
                    let king:  King = field.whatPieceIsOnThisField
                    let kingField = king.getCurrentField
                    let isKingChecked = false
                    for(let i =0;i<arrayOfDangerousFields.length;i++){
                        if(kingField.getFieldCoordinates.x === arrayOfDangerousFields[i].x && kingField.getFieldCoordinates.y === arrayOfDangerousFields[i].y){
                            isKingChecked = true
                        }
                    }
                    if(isKingChecked){
                        if(king.getColor === 'white'){
                            this.check.isWhiteKingChecked = true
                        }if(king.getColor === 'black'){
                            this.check.isBlackKingChecked = true
                        }
                    }if(!isKingChecked){
                        if(king.getColor === 'white'){
                            this.check.isWhiteKingChecked = false
                        }if(king.getColor === 'black'){
                            this.check.isBlackKingChecked = false
                        }
                    }
                }
            }
        }
    }
    public lookIfMoveIsPossible: (newField: Field, activePiece: fieldsTakenBy, board: HTMLElement, action: 'take'|'move')=>boolean = ( newField: Field, activePiece: fieldsTakenBy,board: HTMLElement, action: 'take'|'move')=>{
        let whoWasBefore = newField.whatPieceIsOnThisField
        activePiece.move(newField)
        let move: move = {
            piece: activePiece,
            action: 'move',
            prevField: activePiece.getPreviousField,
            currentField: activePiece.getCurrentField,
            isCheck: false,
            whoWasPreviousHere: whoWasBefore
        }
        this.matchRecord.push({
            moveNumber: this.matchRecord.length,
            move:move
        })
        this.lookIfCheck()
        if(!this.check.isBlackKingChecked && this.activePlayer === 'black'){
            this.deleteLastMove()
            return true
        }else if(!this.check.isWhiteKingChecked && this.activePlayer === 'white'){
            this.deleteLastMove()
            return true
        }
        this.deleteLastMove()
        return false
    }
    public lookIfAnyMoveIsPossible: (board: HTMLElement)=>boolean = (board: HTMLElement)=>{
        let isPossible: boolean = false
        let fields = this.gameboard.fields
        let whatKingIsChecked: color
        if(this.check.isBlackKingChecked){
            whatKingIsChecked = 'black'
        }else if(this.check.isWhiteKingChecked){
            whatKingIsChecked = 'white'
        }
        for(let i =0;i<fields.length;i++){
            if(fields[i].isFieldTaken && fields[i].whatPieceIsOnThisField.getColor === whatKingIsChecked ){
                let piece = fields[i].whatPieceIsOnThisField
                if(piece !== undefined){
                    let possibleMoveArray = piece.showAvailableFields(this.gameboard.fields)
                    let possibleTakeArray = piece.whatPiecesCanTake(this.gameboard.fields)
                    for(let j =0; j<possibleMoveArray.length; j++){
                        let possibleField = this.gameboard.fields.find(el=> el.getFieldCoordinates.x === possibleMoveArray[j].x && el.  getFieldCoordinates.y === possibleMoveArray[j].y)
                        let whoWasBefore = possibleField.whatPieceIsOnThisField
                        piece.move(possibleField)
                        this.activePlayer = this.activePlayer === 'white' ? 'black' : 'white'
                        let move: move = {
                            piece: piece,
                            action: 'move',
                            prevField: piece.getPreviousField,
                            currentField: piece.getCurrentField,
                            isCheck: false,
                            whoWasPreviousHere: whoWasBefore
                        }
                        this.matchRecord.push({
                            moveNumber: this.matchRecord.length,
                            move:move
                        })
                        this.lookIfCheck()
                        if(!this.check.isBlackKingChecked && this.activePlayer === 'black'){
                            this.deleteLastMove()
                            return true
                        }else if(!this.check.isWhiteKingChecked && this.activePlayer === 'white'){
                            this.deleteLastMove()
                            return true
                        }
                        this.deleteLastMove()
                    }
                    for(let j =0; j<possibleTakeArray.length; j++){
                        let possibleField = this.gameboard.fields.find(el=> el.getFieldCoordinates.x === possibleTakeArray[j].x && el.  getFieldCoordinates.y === possibleTakeArray[j].y)
                        this.activePlayer = this.activePlayer === 'white' ? 'black' : 'white'
                        let whoWasBefore = possibleField.whatPieceIsOnThisField
                        piece.move(possibleField)
                        let move: move = {
                            piece: piece,
                            action: 'take',
                            prevField: piece.getPreviousField,
                            currentField: piece.getCurrentField,
                            isCheck: false,
                            whoWasPreviousHere: whoWasBefore
                        }
                        this.matchRecord.push({
                            moveNumber: this.matchRecord.length,
                            move:move
                        })
                        this.lookIfCheck()
                        if(!this.check.isBlackKingChecked && this.activePlayer === 'black'){
                            this.deleteLastMove()
                            return true
                        }else if(!this.check.isWhiteKingChecked && this.activePlayer === 'white'){
                            this.deleteLastMove()
                            return true
                        }
                        this.deleteLastMove()
                    }
            }
            }
        }
        return false
    }

public enPassant: (newField: Field, activePiece: Pawn, board: HTMLElement)=>void = (newField, activePiece,board)=>{
    let gameboard =this.giveGameboard
    let piece: Pawn = activePiece 
    let enemyPawnField = newField.getFieldCoordinates
    const fieldAddXNumber1 = piece.getColor === 'white' ? -1 : 1
    let enemyPawn = gameboard.find(element=>element.getFieldCoordinates.x === enemyPawnField.x +fieldAddXNumber1 && element.getFieldCoordinates.y === enemyPawnField.y)
    piece.takeByEnPassant(newField,enemyPawn)
    piece.changeToQueen()
    this.activePlayer = this.activePlayer === 'white' ? 'black' : 'white'
    this.reRender(board)
    }
}