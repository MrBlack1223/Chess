import { Piece } from "./piece.js";
export class Rook extends Piece {
    constructor(field, color) {
        super(field, 'rook', color);
    }
    showAvailableFields(getGameboard) {
        const gameboard = getGameboard;
        let fieldsCoordinatsReturnArray = [];
        let shouldStopAddinfField1 = false;
        let shouldStopAddinfField2 = false;
        let shouldStopAddinfField3 = false;
        let shouldStopAddinfField4 = false;
        for (let i = 1; i < 9; i++) {
            let field1 = gameboard.find(element => element.getFieldCoordinates.x == this.currentField.getFieldCoordinates.x + i && element.getFieldCoordinates.y == this.currentField.getFieldCoordinates.y);
            let field2 = gameboard.find(element => element.getFieldCoordinates.x == this.currentField.getFieldCoordinates.x - i && element.getFieldCoordinates.y == this.currentField.getFieldCoordinates.y);
            let field3 = gameboard.find(element => element.getFieldCoordinates.x == this.currentField.getFieldCoordinates.x && element.getFieldCoordinates.y == this.currentField.getFieldCoordinates.y + i);
            let field4 = gameboard.find(element => element.getFieldCoordinates.x == this.currentField.getFieldCoordinates.x && element.getFieldCoordinates.y == this.currentField.getFieldCoordinates.y - i);
            if (field1 !== undefined && field1.isFieldTaken) {
                shouldStopAddinfField1 = true;
            }
            if (field2 !== undefined && field2.isFieldTaken) {
                shouldStopAddinfField2 = true;
            }
            if (field3 !== undefined && field3.isFieldTaken) {
                shouldStopAddinfField3 = true;
            }
            if (field4 !== undefined && field4.isFieldTaken) {
                shouldStopAddinfField4 = true;
            }
            if (field1 !== undefined && !field1.isFieldTaken && !shouldStopAddinfField1) {
                field1.setIsPossibleToMoveAtThisField = false;
                fieldsCoordinatsReturnArray.push(field1.getFieldCoordinates);
            }
            if (field2 !== undefined && !field2.isFieldTaken && !shouldStopAddinfField2) {
                field2.setIsPossibleToMoveAtThisField = false;
                fieldsCoordinatsReturnArray.push(field2.getFieldCoordinates);
            }
            if (field3 !== undefined && !field3.isFieldTaken && !shouldStopAddinfField3) {
                field3.setIsPossibleToMoveAtThisField = false;
                fieldsCoordinatsReturnArray.push(field3.getFieldCoordinates);
            }
            if (field4 !== undefined && !field4.isFieldTaken && !shouldStopAddinfField4) {
                field4.setIsPossibleToMoveAtThisField = false;
                fieldsCoordinatsReturnArray.push(field4.getFieldCoordinates);
            }
        }
        return fieldsCoordinatsReturnArray;
    }
    whatPiecesCanTake(getGameboard) {
        const gameboard = getGameboard;
        let fieldsCoordinatsReturnArray = [];
        let shouldStopAddinfField1 = false;
        let shouldStopAddinfField2 = false;
        let shouldStopAddinfField3 = false;
        let shouldStopAddinfField4 = false;
        for (let i = 1; i < 9; i++) {
            let field1 = gameboard.find(element => element.getFieldCoordinates.x == this.currentField.getFieldCoordinates.x + i && element.getFieldCoordinates.y == this.currentField.getFieldCoordinates.y);
            let field2 = gameboard.find(element => element.getFieldCoordinates.x == this.currentField.getFieldCoordinates.x - i && element.getFieldCoordinates.y == this.currentField.getFieldCoordinates.y);
            let field3 = gameboard.find(element => element.getFieldCoordinates.x == this.currentField.getFieldCoordinates.x && element.getFieldCoordinates.y == this.currentField.getFieldCoordinates.y + i);
            let field4 = gameboard.find(element => element.getFieldCoordinates.x == this.currentField.getFieldCoordinates.x && element.getFieldCoordinates.y == this.currentField.getFieldCoordinates.y - i);
            if (field1 !== undefined && field1.isFieldTaken && !shouldStopAddinfField1) {
                let possibleTakePiece = field1.whatPieceIsOnThisField;
                shouldStopAddinfField1 = true;
                if (possibleTakePiece.getColor !== this.getColor) {
                    fieldsCoordinatsReturnArray.push(field1.getFieldCoordinates);
                }
            }
            if (field2 !== undefined && field2.isFieldTaken && !shouldStopAddinfField2) {
                let possibleTakePiece = field2.whatPieceIsOnThisField;
                shouldStopAddinfField2 = true;
                if (possibleTakePiece.getColor !== this.getColor) {
                    fieldsCoordinatsReturnArray.push(field2.getFieldCoordinates);
                }
            }
            if (field3 !== undefined && field3.isFieldTaken && !shouldStopAddinfField3) {
                let possibleTakePiece = field3.whatPieceIsOnThisField;
                shouldStopAddinfField3 = true;
                if (possibleTakePiece.getColor !== this.getColor) {
                    fieldsCoordinatsReturnArray.push(field3.getFieldCoordinates);
                }
            }
            if (field4 !== undefined && field4.isFieldTaken && !shouldStopAddinfField4) {
                let possibleTakePiece = field4.whatPieceIsOnThisField;
                shouldStopAddinfField4 = true;
                if (possibleTakePiece.getColor !== this.getColor) {
                    fieldsCoordinatsReturnArray.push(field4.getFieldCoordinates);
                }
            }
        }
        return fieldsCoordinatsReturnArray;
    }
}
