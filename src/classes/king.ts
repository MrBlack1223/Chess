import { color, fieldCoordinates } from "../types/types";
import { Field } from "./field";
import { Piece } from "./piece.js";

export class King extends Piece{

    constructor(field: Field, color? : color){
       super(field,'king',color)
    }

    public showAvailableFields(getGameboard:  Field[]): fieldCoordinates[]{
        const gameboard = getGameboard
        let fieldsCoordinatsReturnArray: fieldCoordinates[]= []
        let field1: Field = gameboard.find(element => element.getFieldCoordinates.x == this.currentField.getFieldCoordinates.x + 1 && element.getFieldCoordinates.y == this.currentField.getFieldCoordinates.y )
        let field2: Field = gameboard.find(element => element.getFieldCoordinates.x == this.currentField.getFieldCoordinates.x -1 && element.getFieldCoordinates.y == this.currentField.getFieldCoordinates.y)
        let field3: Field = gameboard.find(element => element.getFieldCoordinates.x == this.currentField.getFieldCoordinates.x +1 && element.getFieldCoordinates.y == this.currentField.getFieldCoordinates.y + 1)
        let field4: Field = gameboard.find(element => element.getFieldCoordinates.x == this.currentField.getFieldCoordinates.x -1 && element.getFieldCoordinates.y == this.currentField.getFieldCoordinates.y - 1)
        let field5: Field = gameboard.find(element => element.getFieldCoordinates.x == this.currentField.getFieldCoordinates.x  && element.getFieldCoordinates.y == this.currentField.getFieldCoordinates.y -1)
        let field6: Field = gameboard.find(element => element.getFieldCoordinates.x == this.currentField.getFieldCoordinates.x && element.getFieldCoordinates.y == this.currentField.getFieldCoordinates.y+ 1)
        let field7: Field = gameboard.find(element => element.getFieldCoordinates.x == this.currentField.getFieldCoordinates.x -1 && element.getFieldCoordinates.y == this.currentField.getFieldCoordinates.y + 1)
        let field8: Field = gameboard.find(element => element.getFieldCoordinates.x == this.currentField.getFieldCoordinates.x +1 && element.getFieldCoordinates.y == this.currentField.getFieldCoordinates.y -1)
        for(let i = 1;i<9;i++){
            let fieldContainer = eval(`field${i}`)
            if(fieldContainer!== undefined && !fieldContainer.isFieldTaken){
                fieldsCoordinatsReturnArray.push(fieldContainer.getFieldCoordinates)
            }
        }
        return fieldsCoordinatsReturnArray
    }
    public whatPiecesCanTake(getGameboard: Field[]): fieldCoordinates[]{
        const gameboard = getGameboard
        let fieldsCoordinatsReturnArray: fieldCoordinates[]= []
        let field1: Field = gameboard.find(element => element.getFieldCoordinates.x == this.currentField.getFieldCoordinates.x + 1 && element.getFieldCoordinates.y == this.currentField.getFieldCoordinates.y )
        let field2: Field = gameboard.find(element => element.getFieldCoordinates.x == this.currentField.getFieldCoordinates.x -1 && element.getFieldCoordinates.y == this.currentField.getFieldCoordinates.y)
        let field3: Field = gameboard.find(element => element.getFieldCoordinates.x == this.currentField.getFieldCoordinates.x +1 && element.getFieldCoordinates.y == this.currentField.getFieldCoordinates.y + 1)
        let field4: Field = gameboard.find(element => element.getFieldCoordinates.x == this.currentField.getFieldCoordinates.x -1 && element.getFieldCoordinates.y == this.currentField.getFieldCoordinates.y - 1)
        let field5: Field = gameboard.find(element => element.getFieldCoordinates.x == this.currentField.getFieldCoordinates.x  && element.getFieldCoordinates.y == this.currentField.getFieldCoordinates.y -1)
        let field6: Field = gameboard.find(element => element.getFieldCoordinates.x == this.currentField.getFieldCoordinates.x && element.getFieldCoordinates.y == this.currentField.getFieldCoordinates.y+ 1)
        let field7: Field = gameboard.find(element => element.getFieldCoordinates.x == this.currentField.getFieldCoordinates.x -1 && element.getFieldCoordinates.y == this.currentField.getFieldCoordinates.y + 1)
        let field8: Field = gameboard.find(element => element.getFieldCoordinates.x == this.currentField.getFieldCoordinates.x +1 && element.getFieldCoordinates.y == this.currentField.getFieldCoordinates.y -1)    
        for(let i = 1;i<9;i++){
            let fieldContainer = eval(`field${i}`)
            if(fieldContainer!== undefined && fieldContainer.isFieldTaken && fieldContainer.whatPieceIsOnThisField.getColor !== this.color){
                fieldsCoordinatsReturnArray.push(fieldContainer.getFieldCoordinates)
            }
        }
        return fieldsCoordinatsReturnArray
    } 

    
}