import { Bishop } from "./bishop.js";
import { King } from "./king.js";
import { Knight } from "./knight.js";
import { Pawn } from "./pawn.js";
import { Queen } from "./queen.js";
import { Rook } from "./rook.js";
export class Field {
    constructor(coordinates, fieldColor, isFieldTaken, fieldTakenByWhatPiece) {
        this.fieldCoordinates = coordinates;
        this.fieldColor = fieldColor;
        this.isPossibleToMoveHere = true;
        if (coordinates.x === 2) {
            this.isTaken = true;
            this.takenByWhatPiece = new Pawn(this, 'white');
        }
        else if (coordinates.x === 7) {
            this.isTaken = true;
            this.takenByWhatPiece = new Pawn(this, 'black');
        }
        else if (coordinates.x === 1 && (coordinates.y === 1 || coordinates.y === 8)) {
            this.isTaken = true;
            this.takenByWhatPiece = new Rook(this, 'white');
        }
        else if (coordinates.x === 8 && (coordinates.y === 1 || coordinates.y === 8)) {
            this.isTaken = true;
            this.takenByWhatPiece = new Rook(this, 'black');
        }
        else if (coordinates.x === 1 && (coordinates.y === 2 || coordinates.y === 7)) {
            this.isTaken = true;
            this.takenByWhatPiece = new Knight(this, 'white');
        }
        else if (coordinates.x === 8 && (coordinates.y === 2 || coordinates.y === 7)) {
            this.isTaken = true;
            this.takenByWhatPiece = new Knight(this, 'black');
        }
        else if (coordinates.x === 1 && (coordinates.y === 3 || coordinates.y === 6)) {
            this.isTaken = true;
            this.takenByWhatPiece = new Bishop(this, 'white');
        }
        else if (coordinates.x === 8 && (coordinates.y === 3 || coordinates.y === 6)) {
            this.isTaken = true;
            this.takenByWhatPiece = new Bishop(this, 'black');
        }
        else if (coordinates.x === 1 && coordinates.y === 5) {
            this.isTaken = true;
            this.takenByWhatPiece = new King(this, 'white');
        }
        else if (coordinates.x === 8 && coordinates.y === 5) {
            this.isTaken = true;
            this.takenByWhatPiece = new King(this, 'black');
        }
        else if (coordinates.x === 1 && coordinates.y === 4) {
            this.isTaken = true;
            this.takenByWhatPiece = new Queen(this, 'white');
        }
        else if (coordinates.x === 8 && coordinates.y === 4) {
            this.isTaken = true;
            this.takenByWhatPiece = new Queen(this, 'black');
        }
        else {
            this.isTaken = false;
        }
    }
    get getFieldCoordinates() {
        return this.fieldCoordinates;
    }
    get getWhoWasPreviousOnThisField() {
        return this.whoWasPreviousOnThisField;
    }
    get whoMakeItinpossibleToMoveHere() {
        return this.whoMakeItInpossibleToMoveHere;
    }
    get getFieldColor() {
        return this.fieldColor;
    }
    get isFieldTaken() {
        return this.isTaken;
    }
    get whatPieceIsOnThisField() {
        return this.takenByWhatPiece;
    }
    get isPossibleToMoveAtThisField() {
        return this.isPossibleToMoveHere;
    }
    set setIsPossibleToMoveAtThisField(b) {
        this.isPossibleToMoveHere = b;
    }
    set setWhoWasPreviousOnThisField(who) {
        this.whoWasPreviousOnThisField = who;
    }
    set setWhoMakeItImpossibleToMoveHere(who) {
        this.whoMakeItInpossibleToMoveHere = who;
    }
    set setFieldColor(color) {
        this.fieldColor = color;
    }
    set setFieldIsTaken(taken) {
        this.isTaken = taken;
    }
    set setFieldIsTakenBy(takenBy) {
        this.takenByWhatPiece = takenBy;
    }
    areFieldsEquall(field) {
        return this.fieldCoordinates.x === field.fieldCoordinates.x && this.fieldCoordinates.y === field.fieldCoordinates.y;
    }
}
