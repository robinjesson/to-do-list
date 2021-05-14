import React, { useState } from 'react';
import { timer } from 'rxjs';
import ToDoForm from '../to-do-form/ToDoForm';
import ToDo from '../to-do/ToDo';
import { TToDo } from '../utils/types';



const ToDoList: React.FC<{}> = () => {

    const [toDoList, setToDoList] = useState<TToDo[]>([]);
    const [showError, setShowError] = useState<boolean>(false);
    const [messageError, setMessageError] = useState<string>('');

    const doAdd: (label: string) => boolean = (label: string) => {

        if(label === '') {
            showErrorDiv('L\'élément est vide.');
            return false;
        }
        else if(toDoList.some(todo => todo.label === label)) {
            showErrorDiv('L\'élément à ajouter existe déjà.');
            return false;
        }
        else {
            setToDoList(prev => prev = prev.concat([{label: label, checked: false, onDelete: doDelete, onDone: doDone, creation: new Date()}]));
            return true;
        }
    }

    const showErrorDiv: (message: string) => void = (message: string) => {
        setMessageError(prev => prev = message);
        setShowError(prev => prev = true);
        timer(5000).subscribe(() => setShowError(prev => prev = false));
    }

    const doDelete: (label: string) => void = (label: string) => {
        setToDoList(prev => prev = prev.filter(todo => todo.label !== label));
    }

    const doDone: (label: string) => void = (label: string, checked = true) => {
        const idx: number = toDoList.findIndex(todo => todo.label === label);
        let copy: TToDo[] = [...toDoList];
        copy[idx].checked = checked;
        setToDoList(prev => prev = copy);
    } 

    return (
        <React.Fragment>
            {toDoList.map(elt => (
                <ToDo key={elt.label} label={elt.label} checked={elt.checked} onDelete={doDelete} onDone={doDone} creation={elt.creation}></ToDo>
            ))}
            <ToDoForm onAdd={doAdd}></ToDoForm>
            {showError && messageError !== '' && <div>
                {messageError}
            </div>}
        </React.Fragment>
        
    )

}

export default ToDoList;