import { Piece } from "./piece.js";
export class Knight extends Piece {
    constructor(field, color) {
        super(field, 'knight', color);
    }
    showAvailableFields(getGameboard) {
        const gameboard = getGameboard;
        let fieldsCoordinatsReturnArray = [];
        let field1 = gameboard.find(element => element.getFieldCoordinates.x == this.currentField.getFieldCoordinates.x + 2 && element.getFieldCoordinates.y == this.currentField.getFieldCoordinates.y - 1);
        let field2 = gameboard.find(element => element.getFieldCoordinates.x == this.currentField.getFieldCoordinates.x + 2 && element.getFieldCoordinates.y == this.currentField.getFieldCoordinates.y + 1);
        let field3 = gameboard.find(element => element.getFieldCoordinates.x == this.currentField.getFieldCoordinates.x - 2 && element.getFieldCoordinates.y == this.currentField.getFieldCoordinates.y + 1);
        let field4 = gameboard.find(element => element.getFieldCoordinates.x == this.currentField.getFieldCoordinates.x - 2 && element.getFieldCoordinates.y == this.currentField.getFieldCoordinates.y - 1);
        let field5 = gameboard.find(element => element.getFieldCoordinates.x == this.currentField.getFieldCoordinates.x + 1 && element.getFieldCoordinates.y == this.currentField.getFieldCoordinates.y - 2);
        let field6 = gameboard.find(element => element.getFieldCoordinates.x == this.currentField.getFieldCoordinates.x + 1 && element.getFieldCoordinates.y == this.currentField.getFieldCoordinates.y + 2);
        let field7 = gameboard.find(element => element.getFieldCoordinates.x == this.currentField.getFieldCoordinates.x - 1 && element.getFieldCoordinates.y == this.currentField.getFieldCoordinates.y + 2);
        let field8 = gameboard.find(element => element.getFieldCoordinates.x == this.currentField.getFieldCoordinates.x - 1 && element.getFieldCoordinates.y == this.currentField.getFieldCoordinates.y - 2);
        for (let i = 1; i < 9; i++) {
            let fieldContainer = eval(`field${i}`);
            if (fieldContainer !== undefined && !fieldContainer.isFieldTaken) {
                fieldsCoordinatsReturnArray.push(fieldContainer.getFieldCoordinates);
            }
        }
        return fieldsCoordinatsReturnArray;
    }
    whatPiecesCanTake(getGameboard) {
        const gameboard = getGameboard;
        let fieldsCoordinatsReturnArray = [];
        let field1 = gameboard.find(element => element.getFieldCoordinates.x == this.currentField.getFieldCoordinates.x + 2 && element.getFieldCoordinates.y == this.currentField.getFieldCoordinates.y - 1);
        let field2 = gameboard.find(element => element.getFieldCoordinates.x == this.currentField.getFieldCoordinates.x + 2 && element.getFieldCoordinates.y == this.currentField.getFieldCoordinates.y + 1);
        let field3 = gameboard.find(element => element.getFieldCoordinates.x == this.currentField.getFieldCoordinates.x - 2 && element.getFieldCoordinates.y == this.currentField.getFieldCoordinates.y + 1);
        let field4 = gameboard.find(element => element.getFieldCoordinates.x == this.currentField.getFieldCoordinates.x - 2 && element.getFieldCoordinates.y == this.currentField.getFieldCoordinates.y - 1);
        let field5 = gameboard.find(element => element.getFieldCoordinates.x == this.currentField.getFieldCoordinates.x + 1 && element.getFieldCoordinates.y == this.currentField.getFieldCoordinates.y - 2);
        let field6 = gameboard.find(element => element.getFieldCoordinates.x == this.currentField.getFieldCoordinates.x + 1 && element.getFieldCoordinates.y == this.currentField.getFieldCoordinates.y + 2);
        let field7 = gameboard.find(element => element.getFieldCoordinates.x == this.currentField.getFieldCoordinates.x - 1 && element.getFieldCoordinates.y == this.currentField.getFieldCoordinates.y + 2);
        let field8 = gameboard.find(element => element.getFieldCoordinates.x == this.currentField.getFieldCoordinates.x - 1 && element.getFieldCoordinates.y == this.currentField.getFieldCoordinates.y - 2);
        for (let i = 1; i < 9; i++) {
            let fieldContainer = eval(`field${i}`);
            if (fieldContainer !== undefined && fieldContainer.isFieldTaken && fieldContainer.whatPieceIsOnThisField.getColor !== this.color) {
                fieldsCoordinatsReturnArray.push(fieldContainer.getFieldCoordinates);
            }
        }
        return fieldsCoordinatsReturnArray;
    }
}
