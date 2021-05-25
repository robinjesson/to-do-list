import React, { useState } from 'react';
import { timer } from 'rxjs';
import ToDoForm from '../to-do-form/ToDoForm';
import ToDo from '../to-do/ToDo';
import { TToDo } from '../utils/types';
import './ToDoList.css';

const ToDoList: React.FC<{}> = () => {

    const [toDoList, setToDoList] = useState<TToDo[]>([]);
    const [doneList, setDoneList] = useState<TToDo[]>([]);
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

    const doDone: (label: string, checked: boolean) => void = (label: string, checked: boolean) => {
        let copyToDoList: TToDo[] = [...toDoList];
        let copyDoneList: TToDo[] = [...doneList];
        if(!checked) {
            const idx: number = copyToDoList.findIndex(todo => todo.label === label);
            let todo: TToDo = copyToDoList[idx];
            setToDoList(prev => prev = copyToDoList.filter(elt => elt.label !== todo.label));
            todo.checked = true;
            copyDoneList.push(todo);
            setDoneList(prev => prev = copyDoneList);
        }
        else {
            const idx: number = copyDoneList.findIndex(todo => todo.label === label);
            let todo: TToDo = copyDoneList[idx];
            setDoneList(prev => prev = copyDoneList.filter(elt => elt.label !== todo.label));
            todo.checked = false;
            copyToDoList.push(todo);
            setToDoList(prev => prev = copyToDoList);
        }

        
            
            
        
    } 

    return (
        <React.Fragment>
            <ToDoForm onAdd={doAdd}></ToDoForm>
            {showError && messageError !== '' && <div>
                {messageError}
            </div>}
            <h1>A faire  <span className="badge bg-secondary">{toDoList.length}</span></h1>
            <div className="list-group">
                {toDoList.map(elt => (
                    <ToDo key={elt.label} label={elt.label} checked={elt.checked} onDelete={doDelete} onDone={doDone} creation={elt.creation}></ToDo>
                ))}
            </div>
            <h1>Fait <span className="badge bg-secondary">{doneList.length}</span></h1>
            <div className="list-group">
                {doneList.map(elt => (
                    <ToDo key={elt.label} label={elt.label} checked={elt.checked} onDelete={doDelete} onDone={doDone} creation={elt.creation}></ToDo>
                ))}
            </div>
        </React.Fragment>
        
    )

}

export default ToDoList;