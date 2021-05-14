import React, { SyntheticEvent, useRef } from 'react';
import './ToDoForm.css';

const ToDoForm: React.FC<{onAdd: (label: string) => boolean}> = (props) => {
    const toDoCtrl = useRef<HTMLInputElement>(null);

    const doAdd: (event: SyntheticEvent) => void = (event: SyntheticEvent) => {
        event.preventDefault();
        if(toDoCtrl.current) {
            if(props.onAdd(toDoCtrl.current.value)) 
                toDoCtrl.current.value = '';
        }
            
    }

    return <form>
        <input className="uk-input uk-form-width-medium" ref={toDoCtrl} type="text"></input>
        <button className="uk-button uk-button-primary" onClick={doAdd} uk-icon="icon: plus"></button>
    </form>
}

export default ToDoForm;