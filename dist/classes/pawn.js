import { Piece } from "./piece.js";
import { Queen } from "./queen.js";
export class Pawn extends Piece {
    constructor(field, color) {
        super(field, 'pawn', color);
    }
    showAvailableFields(getGameboard) {
        const gameboard = getGameboard;
        const fieldAddXNumber1 = this.color === 'white' ? 1 : -1;
        const fieldAddXNumber2 = this.color === 'white' ? 2 : -2;
        let field1 = gameboard.find(element => element.getFieldCoordinates.x == this.currentField.getFieldCoordinates.x + fieldAddXNumber1 && element.getFieldCoordinates.y == this.currentField.getFieldCoordinates.y);
        let field2 = gameboard.find(element => element.getFieldCoordinates.x == this.currentField.getFieldCoordinates.x + fieldAddXNumber2 && element.getFieldCoordinates.y == this.currentField.getFieldCoordinates.y);
        if (field1 === undefined) {
            field1 = this.currentField;
        }
        if (field2 === undefined) {
            field2 = this.currentField;
        }
        if (!field1.isFieldTaken && !field2.isFieldTaken && this.currentField.areFieldsEquall(this.startingField)) {
            return [field1.getFieldCoordinates, field2.getFieldCoordinates];
        }
        else if (field1.isFieldTaken) {
            return [];
        }
        else if (!field1.isFieldTaken && field2.isFieldTaken && this.currentField.areFieldsEquall(this.startingField)) {
            return [field1.getFieldCoordinates];
        }
        else if (!this.currentField.areFieldsEquall(this.startingField) && !field1.isFieldTaken) {
            return [field1.getFieldCoordinates];
        }
    }
    checkDangerousFields(getGameboard) {
        const gameboard = getGameboard();
        const fieldAddXNumber1 = this.color === 'white' ? 1 : -1;
        let field1 = gameboard.find(element => element.getFieldCoordinates.x == this.currentField.getFieldCoordinates.x + fieldAddXNumber1 && element.getFieldCoordinates.y == this.currentField.getFieldCoordinates.y + 1);
        let field2 = gameboard.find(element => element.getFieldCoordinates.x == this.currentField.getFieldCoordinates.x + fieldAddXNumber1 && element.getFieldCoordinates.y == this.currentField.getFieldCoordinates.y - 1);
        if (field1 === undefined) {
            field1 = this.currentField;
            return [field2.getFieldCoordinates];
        }
        if (field2 === undefined) {
            field2 = this.currentField;
            return [field1.getFieldCoordinates];
        }
        return [field1.getFieldCoordinates, field2.getFieldCoordinates];
    }
    whatPiecesCanTake(getGameboard) {
        const gameboard = getGameboard;
        const fieldAddXNumber1 = this.color === 'white' ? 1 : -1;
        let field1 = gameboard.find(element => element.getFieldCoordinates.x == this.currentField.getFieldCoordinates.x + fieldAddXNumber1 && element.getFieldCoordinates.y == this.currentField.getFieldCoordinates.y + 1);
        let field2 = gameboard.find(element => element.getFieldCoordinates.x == this.currentField.getFieldCoordinates.x + fieldAddXNumber1 && element.getFieldCoordinates.y == this.currentField.getFieldCoordinates.y - 1);
        if (field1 === undefined) {
            field1 = this.currentField;
        }
        if (field2 === undefined) {
            field2 = this.currentField;
        }
        if (field1.isFieldTaken && field2.isFieldTaken) {
            let firstPieceColor = field1.whatPieceIsOnThisField.getColor;
            let secondPieceColor = field2.whatPieceIsOnThisField.getColor;
            if (firstPieceColor !== this.color && secondPieceColor !== this.color) {
                return [field1.getFieldCoordinates, field2.getFieldCoordinates];
            }
            if (firstPieceColor === this.color && secondPieceColor !== this.color) {
                return [field2.getFieldCoordinates];
            }
            if (firstPieceColor !== this.color && secondPieceColor === this.color) {
                return [field1.getFieldCoordinates];
            }
            if (firstPieceColor === this.color && secondPieceColor === this.color) {
                return [];
            }
        }
        if (!field1.isFieldTaken && !field2.isFieldTaken) {
            return [];
        }
        if (field1.isFieldTaken && !field2.isFieldTaken) {
            let firstPieceColor = field1.whatPieceIsOnThisField.getColor;
            if (firstPieceColor !== this.color) {
                return [field1.getFieldCoordinates];
            }
            if (firstPieceColor === this.color) {
                return [];
            }
        }
        if (!field1.isFieldTaken && field2.isFieldTaken) {
            let firstPieceColor = field2.whatPieceIsOnThisField.getColor;
            if (firstPieceColor !== this.color) {
                return [field2.getFieldCoordinates];
            }
            if (firstPieceColor === this.color) {
                return [];
            }
        }
    }
    take(newField) {
        if (!this.currentField.areFieldsEquall(newField)) {
            this.currentField.setFieldIsTaken = false;
            this.previousField = this.currentField;
            newField.setFieldIsTaken = true;
            newField.setFieldIsTakenBy = this;
            this.currentField = newField;
            this.setMoveCounter = this.moveCounter + 1;
        }
    }
    changeToQueen() {
        if (this.color === 'white' && this.currentField.getFieldCoordinates.x === 8) {
            this.currentField.setFieldIsTakenBy = new Queen(this.currentField, "white");
        }
        else if (this.color === 'black' && this.currentField.getFieldCoordinates.x === 1) {
            this.currentField.setFieldIsTakenBy = new Queen(this.currentField, "black");
        }
    }
    isEnPassantPossible(getGameboard, matchRecord) {
        let gameboard = getGameboard;
        if ((this.currentField.getFieldCoordinates.x === 5 && this.color === 'white') || (this.currentField.getFieldCoordinates.x === 4 && this.color === 'black')) {
            const fieldAddXNumber1 = this.color === 'white' ? 1 : -1;
            let field1 = gameboard.find(element => element.getFieldCoordinates.x == this.currentField.getFieldCoordinates.x && element.getFieldCoordinates.y == this.currentField.getFieldCoordinates.y + 1);
            let field2 = gameboard.find(element => element.getFieldCoordinates.x == this.currentField.getFieldCoordinates.x && element.getFieldCoordinates.y == this.currentField.getFieldCoordinates.y - 1);
            if (field1 === undefined) {
                field1 = this.currentField;
            }
            if (field2 === undefined) {
                field2 = this.currentField;
            }
            if (field1.isFieldTaken || field2.isFieldTaken) {
                let lastMovePiece = matchRecord[matchRecord.length - 1].move.piece;
                let firstPiece = field1.whatPieceIsOnThisField;
                let secondPiece = field2.whatPieceIsOnThisField;
                console.log(lastMovePiece === firstPiece);
                console.log(lastMovePiece === secondPiece);
                if ((firstPiece !== undefined && firstPiece.getName === 'pawn' && lastMovePiece == firstPiece && firstPiece.getMoveCounter === 1)) {
                    return [{ x: field1.getFieldCoordinates.x + fieldAddXNumber1, y: field1.getFieldCoordinates.y }];
                }
                if ((secondPiece !== undefined && secondPiece.getName === 'pawn' && secondPiece.getMoveCounter === 1 && lastMovePiece == secondPiece)) {
                    return [{ x: field2.getFieldCoordinates.x + fieldAddXNumber1, y: field2.getFieldCoordinates.y }];
                }
                return [];
            }
        }
        return [];
    }
    takeByEnPassant(moveField, takeField) {
        this.take(moveField);
        takeField.setFieldIsTaken = false;
    }
}
