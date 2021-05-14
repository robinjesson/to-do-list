import React, { useState } from 'react';
import { TToDo } from '../utils/types';
import './to-do.css';



const ToDo: React.FC<TToDo> = (props) => {

    const [done, setDone] = useState<boolean>(props.checked);

    const doDelete: () => void = () => {
        props.onDelete(props.label);
    }

    const doDone: () => void = () => {
        setDone(prev => prev = !prev)
        props.onDone(props.label, done)
    }

    return <div onClick={() => doDone()} className="todo">
            <p className={`${done ? 'barre' : ''}`}>{props.label}</p>
            <span onClick={() => doDelete()} uk-icon="icon: trash"></span>
        </div>
}

export default ToDo;