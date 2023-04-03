import { color, fieldCoordinates } from "../types/types";
import { Field } from "./field.js";
import { Piece } from "./piece.js";

export class Queen extends Piece{


    constructor(field: Field, color? : color){
        super(field,'queen',color)
    }
    
    public showAvailableFields(getGameboard: Field[]): fieldCoordinates[]{
        const gameboard = getGameboard
        let fieldsCoordinatsReturnArray: fieldCoordinates[]= []
        let shouldStopAddinfField1: boolean = false
        let shouldStopAddinfField2: boolean = false
        let shouldStopAddinfField3: boolean = false
        let shouldStopAddinfField4: boolean = false
        let shouldStopAddinfField5: boolean = false
        let shouldStopAddinfField6: boolean = false
        let shouldStopAddinfField7: boolean = false
        let shouldStopAddinfField8: boolean = false
        for(let i =1;i<9;i++){
            let field1: Field = gameboard.find(element => element.getFieldCoordinates.x == this.currentField.getFieldCoordinates.x + i && element.getFieldCoordinates.y == this.currentField.getFieldCoordinates.y+ i)
            let field2: Field = gameboard.find(element => element.getFieldCoordinates.x == this.currentField.getFieldCoordinates.x -i && element.getFieldCoordinates.y == this.currentField.getFieldCoordinates.y - i)
            let field3: Field = gameboard.find(element => element.getFieldCoordinates.x == this.currentField.getFieldCoordinates.x -i && element.getFieldCoordinates.y == this.currentField.getFieldCoordinates.y + i)
            let field4: Field = gameboard.find(element => element.getFieldCoordinates.x == this.currentField.getFieldCoordinates.x +i && element.getFieldCoordinates.y == this.currentField.getFieldCoordinates.y - i)
            let field5: Field = gameboard.find(element => element.getFieldCoordinates.x == this.currentField.getFieldCoordinates.x + i && element.getFieldCoordinates.y == this.currentField.getFieldCoordinates.y)
            let field6: Field = gameboard.find(element => element.getFieldCoordinates.x == this.currentField.getFieldCoordinates.x -i && element.getFieldCoordinates.y == this.currentField.getFieldCoordinates.y)
            let field7: Field = gameboard.find(element => element.getFieldCoordinates.x == this.currentField.getFieldCoordinates.x  && element.getFieldCoordinates.y == this.currentField.getFieldCoordinates.y + i)
            let field8: Field = gameboard.find(element => element.getFieldCoordinates.x == this.currentField.getFieldCoordinates.x  && element.getFieldCoordinates.y == this.currentField.getFieldCoordinates.y - i)
            
            if(field1 !== undefined && field1.isFieldTaken){
                shouldStopAddinfField1 = true
            }
            if(field2 !== undefined && field2.isFieldTaken){
                shouldStopAddinfField2 = true
            }
            if(field3 !== undefined && field3.isFieldTaken){
                shouldStopAddinfField3 = true
            }
            if(field4 !== undefined && field4.isFieldTaken){
                shouldStopAddinfField4 = true
            }
            if(field1 !== undefined && !field1.isFieldTaken && !shouldStopAddinfField1){
                fieldsCoordinatsReturnArray.push(field1.getFieldCoordinates)
            }
            if(field2 !== undefined && !field2.isFieldTaken && !shouldStopAddinfField2){
                fieldsCoordinatsReturnArray.push(field2.getFieldCoordinates)
            }
            if(field3 !== undefined && !field3.isFieldTaken && !shouldStopAddinfField3){
                fieldsCoordinatsReturnArray.push(field3.getFieldCoordinates)
            }
            if(field4 !== undefined && !field4.isFieldTaken && !shouldStopAddinfField4){
                fieldsCoordinatsReturnArray.push(field4.getFieldCoordinates)
            }
            if(field5 !== undefined && field5.isFieldTaken){
                shouldStopAddinfField5 = true
            }
            if(field6 !== undefined && field6.isFieldTaken){
                shouldStopAddinfField6 = true
            }
            if(field7 !== undefined && field7.isFieldTaken){
                shouldStopAddinfField7 = true
            }
            if(field8 !== undefined && field8.isFieldTaken){
                shouldStopAddinfField8 = true
            }
            if(field5 !== undefined && !field5.isFieldTaken && !shouldStopAddinfField5){
                fieldsCoordinatsReturnArray.push(field5.getFieldCoordinates)
            }
            if(field6 !== undefined && !field6.isFieldTaken && !shouldStopAddinfField6){
                fieldsCoordinatsReturnArray.push(field6.getFieldCoordinates)
            }
            if(field7 !== undefined && !field7.isFieldTaken && !shouldStopAddinfField7){
                fieldsCoordinatsReturnArray.push(field7.getFieldCoordinates)
            }
            if(field8 !== undefined && !field8.isFieldTaken && !shouldStopAddinfField8){
                fieldsCoordinatsReturnArray.push(field8.getFieldCoordinates)
            }
        }
        return fieldsCoordinatsReturnArray
    }
    public whatPiecesCanTake(getGameboard: Field[]): fieldCoordinates[]{
        const gameboard = getGameboard
        let fieldsCoordinatsReturnArray: fieldCoordinates[]= []
        let shouldStopAddinfField1: boolean = false
        let shouldStopAddinfField2: boolean = false
        let shouldStopAddinfField3: boolean = false
        let shouldStopAddinfField4: boolean = false
        let shouldStopAddinfField5: boolean = false
        let shouldStopAddinfField6: boolean = false
        let shouldStopAddinfField7: boolean = false
        let shouldStopAddinfField8: boolean = false
        for(let i =1;i<9;i++){
            let field1: Field = gameboard.find(element => element.getFieldCoordinates.x == this.currentField.getFieldCoordinates.x + i && element.getFieldCoordinates.y == this.currentField.getFieldCoordinates.y+ i)
            let field2: Field = gameboard.find(element => element.getFieldCoordinates.x == this.currentField.getFieldCoordinates.x -i && element.getFieldCoordinates.y == this.currentField.getFieldCoordinates.y - i)
            let field3: Field = gameboard.find(element => element.getFieldCoordinates.x == this.currentField.getFieldCoordinates.x -i && element.getFieldCoordinates.y == this.currentField.getFieldCoordinates.y + i)
            let field4: Field = gameboard.find(element => element.getFieldCoordinates.x == this.currentField.getFieldCoordinates.x +i && element.getFieldCoordinates.y == this.currentField.getFieldCoordinates.y - i)
            let field5: Field = gameboard.find(element => element.getFieldCoordinates.x == this.currentField.getFieldCoordinates.x + i && element.getFieldCoordinates.y == this.currentField.getFieldCoordinates.y)
            let field6: Field = gameboard.find(element => element.getFieldCoordinates.x == this.currentField.getFieldCoordinates.x -i && element.getFieldCoordinates.y == this.currentField.getFieldCoordinates.y)
            let field7: Field = gameboard.find(element => element.getFieldCoordinates.x == this.currentField.getFieldCoordinates.x  && element.getFieldCoordinates.y == this.currentField.getFieldCoordinates.y + i)
            let field8: Field = gameboard.find(element => element.getFieldCoordinates.x == this.currentField.getFieldCoordinates.x  && element.getFieldCoordinates.y == this.currentField.getFieldCoordinates.y - i)
            
            if(field1 !== undefined && field1.isFieldTaken && !shouldStopAddinfField1){
                let possibleTakePiece = field1.whatPieceIsOnThisField
                shouldStopAddinfField1 = true
                if(possibleTakePiece.getColor !== this.getColor){
                    fieldsCoordinatsReturnArray.push(field1.getFieldCoordinates)
                }
            }
            if(field2 !== undefined && field2.isFieldTaken && !shouldStopAddinfField2){
                let possibleTakePiece = field2.whatPieceIsOnThisField
                shouldStopAddinfField2 = true
                if(possibleTakePiece.getColor !== this.getColor){
                    fieldsCoordinatsReturnArray.push(field2.getFieldCoordinates)
                }
            }
            if(field3 !== undefined && field3.isFieldTaken && !shouldStopAddinfField3){
                let possibleTakePiece = field3.whatPieceIsOnThisField
                shouldStopAddinfField3 = true
                if(possibleTakePiece.getColor !== this.getColor){
                    fieldsCoordinatsReturnArray.push(field3.getFieldCoordinates)
                }
            }
            if(field4 !== undefined && field4.isFieldTaken && !shouldStopAddinfField4){
                let possibleTakePiece = field4.whatPieceIsOnThisField
                shouldStopAddinfField4 = true
                if(possibleTakePiece.getColor !== this.getColor){
                    fieldsCoordinatsReturnArray.push(field4.getFieldCoordinates)
                }
            }
            if(field5 !== undefined && field5.isFieldTaken && !shouldStopAddinfField5){
                let possibleTakePiece = field5.whatPieceIsOnThisField
                shouldStopAddinfField5 = true
                if(possibleTakePiece.getColor !== this.getColor){
                    fieldsCoordinatsReturnArray.push(field5.getFieldCoordinates)
                }
            }
            if(field6 !== undefined && field6.isFieldTaken && !shouldStopAddinfField6){
                let possibleTakePiece = field6.whatPieceIsOnThisField
                shouldStopAddinfField6 = true
                if(possibleTakePiece.getColor !== this.getColor){
                    fieldsCoordinatsReturnArray.push(field6.getFieldCoordinates)
                }
            }
            if(field7 !== undefined && field7.isFieldTaken && !shouldStopAddinfField7){
                let possibleTakePiece = field7.whatPieceIsOnThisField
                shouldStopAddinfField7 = true
                if(possibleTakePiece.getColor !== this.getColor){
                    fieldsCoordinatsReturnArray.push(field7.getFieldCoordinates)
                }
            }
            if(field8 !== undefined && field8.isFieldTaken && !shouldStopAddinfField8){
                let possibleTakePiece = field8.whatPieceIsOnThisField
                shouldStopAddinfField8 = true
                if(possibleTakePiece.getColor !== this.getColor){
                    fieldsCoordinatsReturnArray.push(field8.getFieldCoordinates)
                }
            }
        }
        return fieldsCoordinatsReturnArray
    }
}