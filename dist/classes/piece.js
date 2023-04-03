export class Piece {
    constructor(field, name, color) {
        this.startingField = field;
        this.currentField = field;
        this.previousField = field;
        this.moveCounter = 0;
        this.name = name;
        this.color = color;
    }
    get getMoveCounter() {
        return this.moveCounter;
    }
    get getCurrentField() {
        return this.currentField;
    }
    get getPreviousField() {
        return this.previousField;
    }
    get getColor() {
        return this.color;
    }
    get getStartingField() {
        return this.startingField;
    }
    get getName() {
        return this.name;
    }
    set setCurrentField(field) {
        if ((field[0] < 8 && field[0] >= 0) && (field[1] < 8 && field[1] >= 0)) {
            this.currentField = field;
        }
        else {
            console.log(`wrong field coordinates: ${field}`);
        }
    }
    set setMoveCounter(number) {
        this.moveCounter = number;
    }
    move(newField) {
        if (!this.currentField.areFieldsEquall(newField)) {
            this.currentField.setFieldIsTaken = false;
            this.currentField.setWhoWasPreviousOnThisField = this;
            this.previousField = this.currentField;
            newField.setFieldIsTaken = true;
            newField.setFieldIsTakenBy = this;
            this.currentField = newField;
            this.setMoveCounter = this.moveCounter + 1;
        }
    }
}
