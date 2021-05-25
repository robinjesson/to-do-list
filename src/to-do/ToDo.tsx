import React, { useState } from 'react';
import { TToDo } from '../utils/types';
import './to-do.css';



const ToDo: React.FC<TToDo> = (props) => {

    const [done, setDone] = useState<boolean>(props.checked);

    const doDelete: () => void = () => {
        props.onDelete(props.label);
    }

    const doDone: () => void = () => {
        setDone(prev => prev = !done)
        props.onDone(props.label, done)
    }

    return <div className="d-flex list-group-item">
        <span onClick={() => doDone()} className={`${done ? 'done' : ''} label`}>
            {props.label}
        </span>
        <span onClick={() => doDelete()} className="del">
            <i className="fas fa-trash"></i>
        </span>
    </div>
        
}

export default ToDo;