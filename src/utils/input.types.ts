import { TToDo } from "./types";

export type InputToDo = {
    todo: TToDo; 
    onDelete: (label: string) => void; 
    onDone: (label: string, done: boolean) => void;
}