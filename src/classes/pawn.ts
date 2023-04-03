import { color, fieldCoordinates, matchRecord } from "../types/types";
import { Field } from "./field.js";
import { Piece } from "./piece.js";
import { Queen } from "./queen.js";

export class Pawn extends Piece{

    constructor(field: Field, color? : color){
        super(field,'pawn',color)
    }

    public showAvailableFields(getGameboard:  Field[]): fieldCoordinates[]{
        const gameboard = getGameboard
        const fieldAddXNumber1 = this.color === 'white' ? 1 : -1
        const fieldAddXNumber2 = this.color === 'white' ? 2 : -2
        let field1: Field = gameboard.find(element => element.getFieldCoordinates.x == this.currentField.getFieldCoordinates.x + fieldAddXNumber1 && element.getFieldCoordinates.y == this.currentField.getFieldCoordinates.y )
        let field2: Field = gameboard.find(element => element.getFieldCoordinates.x == this.currentField.getFieldCoordinates.x + fieldAddXNumber2 && element.getFieldCoordinates.y == this.currentField.getFieldCoordinates.y )
        if(field1 === undefined){
            field1 = this.currentField
        }
        if(field2 === undefined){
            field2 = this.currentField
        }
        if(!field1.isFieldTaken && !field2.isFieldTaken && this.currentField.areFieldsEquall(this.startingField)){
            return [field1.getFieldCoordinates, field2.getFieldCoordinates ]
        }else if(field1.isFieldTaken){
            return []
        }else if(!field1.isFieldTaken && field2.isFieldTaken && this.currentField.areFieldsEquall(this.startingField)){
            return[field1.getFieldCoordinates]
        }else if(!this.currentField.areFieldsEquall(this.startingField) && !field1.isFieldTaken){
            return[field1.getFieldCoordinates]
        }
    }
    public checkDangerousFields (getGameboard: ()=>Field[]): fieldCoordinates[]{
        const gameboard = getGameboard()
        const fieldAddXNumber1 = this.color === 'white' ? 1 : -1
        let field1: Field = gameboard.find(element => element.getFieldCoordinates.x == this.currentField.getFieldCoordinates.x + fieldAddXNumber1 && element.getFieldCoordinates.y == this.currentField.getFieldCoordinates.y + 1)
        let field2: Field = gameboard.find(element => element.getFieldCoordinates.x == this.currentField.getFieldCoordinates.x + fieldAddXNumber1 && element.getFieldCoordinates.y == this.currentField.getFieldCoordinates.y - 1)
        if(field1 === undefined){
            field1 = this.currentField
            return [field2.getFieldCoordinates]
        }
        if(field2 === undefined){
            field2 = this.currentField
            return [field1.getFieldCoordinates]
        }
        return[field1.getFieldCoordinates,field2.getFieldCoordinates]
    }
    public whatPiecesCanTake(getGameboard: Field[]): fieldCoordinates[]{
        const gameboard = getGameboard
        const fieldAddXNumber1 = this.color === 'white' ? 1 : -1
        let field1: Field = gameboard.find(element => element.getFieldCoordinates.x == this.currentField.getFieldCoordinates.x + fieldAddXNumber1 && element.getFieldCoordinates.y == this.currentField.getFieldCoordinates.y + 1)
        let field2: Field = gameboard.find(element => element.getFieldCoordinates.x == this.currentField.getFieldCoordinates.x + fieldAddXNumber1 && element.getFieldCoordinates.y == this.currentField.getFieldCoordinates.y - 1)
        if(field1 === undefined){
            field1 = this.currentField
        }
        if(field2 === undefined){
            field2 = this.currentField
        }
        if(field1.isFieldTaken && field2.isFieldTaken){
           let firstPieceColor =  field1.whatPieceIsOnThisField.getColor
           let secondPieceColor =  field2.whatPieceIsOnThisField.getColor
           if(firstPieceColor !== this.color && secondPieceColor !== this.color){
                return [field1.getFieldCoordinates,field2.getFieldCoordinates]
           }
           if(firstPieceColor === this.color && secondPieceColor !== this.color){
            return [field2.getFieldCoordinates]
           }
           if(firstPieceColor !== this.color && secondPieceColor === this.color){
            return [field1.getFieldCoordinates]
           }
           if(firstPieceColor === this.color && secondPieceColor === this.color){
            return []
           }
        }
        if(!field1.isFieldTaken && !field2.isFieldTaken){
            return []
        }
        if(field1.isFieldTaken && !field2.isFieldTaken){
            let firstPieceColor =  field1.whatPieceIsOnThisField.getColor
            if(firstPieceColor !== this.color){
                 return [field1.getFieldCoordinates]
            }
            if(firstPieceColor === this.color ){
             return []
            }

         }
        if(!field1.isFieldTaken && field2.isFieldTaken){
            let firstPieceColor =  field2.whatPieceIsOnThisField.getColor
            if(firstPieceColor !== this.color){
                 return [field2.getFieldCoordinates]
            }
            if(firstPieceColor === this.color ){
             return []
        }}
        
        
    }
    public take(newField: Field): void{
        if(!this.currentField.areFieldsEquall(newField)){
            this.currentField.setFieldIsTaken= false
            this.previousField = this.currentField
            newField.setFieldIsTaken = true
            newField.setFieldIsTakenBy = this
            this.currentField = newField
            this.setMoveCounter= this.moveCounter+1 
        }
    }
    public changeToQueen():void{
        if(this.color === 'white' && this.currentField.getFieldCoordinates.x === 8){
            this.currentField.setFieldIsTakenBy = new Queen(this.currentField,"white")
        }else if(this.color === 'black' && this.currentField.getFieldCoordinates.x === 1){
            this.currentField.setFieldIsTakenBy = new Queen(this.currentField,"black")
        }
    }
    public isEnPassantPossible(getGameboard: Field[], matchRecord: matchRecord): fieldCoordinates[]{
        let gameboard = getGameboard
        if((this.currentField.getFieldCoordinates.x === 5 && this.color === 'white') || (this.currentField.getFieldCoordinates.x === 4 && this.color === 'black')){
            const fieldAddXNumber1 = this.color === 'white' ? 1 : -1
            let field1: Field = gameboard.find(element => element.getFieldCoordinates.x == this.currentField.getFieldCoordinates.x && element.getFieldCoordinates.y == this.currentField.getFieldCoordinates.y + 1)
            let field2: Field = gameboard.find(element => element.getFieldCoordinates.x == this.currentField.getFieldCoordinates.x && element.getFieldCoordinates.y == this.currentField.getFieldCoordinates.y - 1)
            if(field1 === undefined){
                field1 = this.currentField
            }
            if(field2 === undefined){
                field2 = this.currentField
            }
            if(field1.isFieldTaken  || field2.isFieldTaken){
               let lastMovePiece = matchRecord[matchRecord.length - 1].move.piece
               let firstPiece =  field1.whatPieceIsOnThisField as Pawn
               let secondPiece =  field2.whatPieceIsOnThisField as Pawn
               console.log(lastMovePiece === firstPiece)
               console.log(lastMovePiece === secondPiece)
               if((firstPiece !== undefined && firstPiece.getName === 'pawn' && lastMovePiece == firstPiece && firstPiece.getMoveCounter === 1)){
                return [{x: field1.getFieldCoordinates.x +fieldAddXNumber1, y: field1.getFieldCoordinates.y}]
               }
               if((secondPiece !== undefined && secondPiece.getName === 'pawn' && secondPiece.getMoveCounter === 1 && lastMovePiece == secondPiece)){
                return [{x: field2.getFieldCoordinates.x +fieldAddXNumber1, y: field2.getFieldCoordinates.y}]
               }
                return []
            }
        }
        return []
    }
    public takeByEnPassant(moveField: Field, takeField: Field){
        this.take(moveField)
        takeField.setFieldIsTaken = false
    }
}