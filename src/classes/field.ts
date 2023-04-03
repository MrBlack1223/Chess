import { color, fieldCoordinates, fieldsTakenBy } from "../types/types";
import { Bishop } from "./bishop.js";
import { King } from "./king.js";
import { Knight } from "./knight.js";
import { Pawn } from "./pawn.js";
import { Queen } from "./queen.js";
import { Rook } from "./rook.js";

export class Field{
    private fieldCoordinates: fieldCoordinates
    private isTaken: boolean
    private takenByWhatPiece: fieldsTakenBy 
    private fieldColor: color
    private isPossibleToMoveHere: boolean
    private whoMakeItInpossibleToMoveHere: 'white' | 'black'
    private whoWasPreviousOnThisField: fieldsTakenBy 

    constructor(coordinates: fieldCoordinates, fieldColor: color, isFieldTaken?: boolean, fieldTakenByWhatPiece?: fieldsTakenBy){
        this.fieldCoordinates = coordinates
        this.fieldColor = fieldColor
        this.isPossibleToMoveHere = true
        if(coordinates.x === 2){
            this.isTaken = true
            this.takenByWhatPiece = new Pawn(this,'white')
        }else if(coordinates.x === 7){
            this.isTaken = true
            this.takenByWhatPiece = new Pawn(this,'black')
        }else if(coordinates.x === 1 && (coordinates.y === 1 || coordinates.y === 8)){
            this.isTaken = true
            this.takenByWhatPiece = new Rook(this,'white')
        }else if(coordinates.x === 8 && (coordinates.y === 1 || coordinates.y === 8)){
            this.isTaken = true
            this.takenByWhatPiece = new Rook(this,'black')
        }
        else if(coordinates.x === 1 && (coordinates.y === 2 || coordinates.y === 7)){
            this.isTaken = true
            this.takenByWhatPiece = new Knight(this,'white')
        }else if(coordinates.x === 8 && (coordinates.y === 2 || coordinates.y === 7)){
            this.isTaken = true
            this.takenByWhatPiece = new Knight(this,'black')
        }
        else if(coordinates.x === 1 && (coordinates.y === 3 || coordinates.y === 6)){
            this.isTaken = true
            this.takenByWhatPiece = new Bishop(this,'white')
        }else if(coordinates.x === 8 && (coordinates.y === 3 || coordinates.y === 6)){
            this.isTaken = true
            this.takenByWhatPiece = new Bishop(this,'black')
        }
        else if(coordinates.x === 1 && coordinates.y === 5 ){
            this.isTaken = true
            this.takenByWhatPiece = new King(this,'white')
        }else if(coordinates.x === 8 && coordinates.y === 5){
            this.isTaken = true
            this.takenByWhatPiece = new King(this,'black')
        }
        else if(coordinates.x === 1 && coordinates.y === 4 ){
            this.isTaken = true
            this.takenByWhatPiece = new Queen(this,'white')
        }else if(coordinates.x === 8 && coordinates.y === 4){
            this.isTaken = true
            this.takenByWhatPiece = new Queen(this,'black')
        }else{
            this.isTaken = false
        }
        
    }
    get getFieldCoordinates(): fieldCoordinates{
        return this.fieldCoordinates
    }
    get getWhoWasPreviousOnThisField(): fieldsTakenBy{
        return this.whoWasPreviousOnThisField
    }
    get whoMakeItinpossibleToMoveHere(): 'white' | 'black'{
        return this.whoMakeItInpossibleToMoveHere
    }
    get getFieldColor(): color{
        return this.fieldColor
    }
    get isFieldTaken(): boolean{
        return this.isTaken
    }
    get whatPieceIsOnThisField(): fieldsTakenBy {
        return this.takenByWhatPiece
    }
    get isPossibleToMoveAtThisField(): boolean{
        return this.isPossibleToMoveHere
    }
    set setIsPossibleToMoveAtThisField(b: boolean){
        this.isPossibleToMoveHere = b
    }
    set setWhoWasPreviousOnThisField(who: fieldsTakenBy){
        this.whoWasPreviousOnThisField = who
    }
    set setWhoMakeItImpossibleToMoveHere(who: 'white'|'black'){
        this.whoMakeItInpossibleToMoveHere = who
    }
    set setFieldColor(color: color){
        this.fieldColor = color
    }
    set setFieldIsTaken(taken: boolean){
        this.isTaken = taken
    }
    set setFieldIsTakenBy(takenBy: fieldsTakenBy ){
        this.takenByWhatPiece = takenBy
    }
    public areFieldsEquall(field: Field): boolean{
        return this.fieldCoordinates.x === field.fieldCoordinates.x && this.fieldCoordinates.y === field.fieldCoordinates.y
    }

}