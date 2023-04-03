import { color, fieldCoordinates } from "../types/types";
import { Field } from "./field.js";

export abstract class Piece{
    protected currentField: Field
    protected previousField: Field
    protected startingField: Field
    protected color: color
    protected name: string
    protected moveCounter: number

    constructor(field: Field, name: string, color? : color){
        this.startingField = field
        this.currentField = field
        this.previousField = field
        this.moveCounter = 0
        this.name = name
        this.color = color
    }
    public get getMoveCounter(): number{
        return this.moveCounter
    }
    public get getCurrentField(): Field{
        return this.currentField
    }
    public get getPreviousField() :Field{
        return this.previousField

    }
    public get getColor(): color{
        return this.color
    }
    public get getStartingField(): Field{
        return this.startingField
    }
    public get getName(): string{
        return this.name
    }
    public set setCurrentField(field: Field){
    if((field[0]<8 && field[0]>=0) && (field[1]<8 && field[1]>=0)){
        this.currentField = field
    }else{
        console.log(`wrong field coordinates: ${field}`)
    }
    }
    public set setMoveCounter(number: number){
        this.moveCounter = number
    }
    public abstract showAvailableFields(getGameboard: Field[]): fieldCoordinates[]
    
    public abstract whatPiecesCanTake(getGameboard: Field[]): fieldCoordinates[]
        
    public move(newField: Field): void{
        if(!this.currentField.areFieldsEquall(newField)){
            this.currentField.setFieldIsTaken= false
            this.currentField.setWhoWasPreviousOnThisField = this
            this.previousField = this.currentField
            newField.setFieldIsTaken = true
            newField.setFieldIsTakenBy = this
            this.currentField = newField
            this.setMoveCounter = this.moveCounter + 1
        }
    } 
}