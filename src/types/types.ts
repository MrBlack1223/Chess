import { Bishop } from "../classes/bishop.js"
import { Field } from "../classes/field.js"
import { King } from "../classes/king.js"
import { Knight } from "../classes/knight.js"
import { Pawn } from "../classes/pawn.js"
import { Piece } from "../classes/piece.js"
import { Queen } from "../classes/queen.js"
import { Rook } from "../classes/rook.js"

export type fieldCoordinates ={
    x: number,
    y: number,
}
export type color = 'white' | 'black'
export type piece = 'rook' | 'pawn' | 'knight' | 'bishop' | 'queen' | 'king'
export type fieldsTakenBy =  Pawn | Rook | Knight | Bishop | King | Queen | Piece
export type move = {piece: fieldsTakenBy, action: "move"|"take", prevField: Field, currentField: Field, isCheck: boolean, whoWasPreviousHere?: fieldsTakenBy}
export type matchRecord = {moveNumber: number, move: move}[]