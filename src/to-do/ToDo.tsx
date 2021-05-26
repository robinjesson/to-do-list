import React, { useState } from 'react';
import { InputToDo } from '../utils/input.types';
import './to-do.css';

const ToDo: React.FC<InputToDo> = (props) => {

    const [done, setDone] = useState<boolean>(props.todo.checked);

    const doDelete: () => void = () => {
        props.onDelete(props.todo.label);
    }

    const doDone: () => void = () => {
        setDone(prev => prev = !done)
        props.onDone(props.todo.label, done)
    }

    return <div className="d-flex list-group-item">
        <span onClick={() => doDone()} className={`${done ? 'done' : ''} label`}>
            {props.todo.label}
        </span>
        <span onClick={() => doDelete()} className="del">
            <i className="fas fa-trash"></i>
        </span>
    </div>
        
}

export default ToDo;