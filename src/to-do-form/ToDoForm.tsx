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

    const onEnter = (event: any) => {
        if(event.key === 'Enter'){
            if(toDoCtrl.current) {
                if(props.onAdd(toDoCtrl.current.value)) 
                    toDoCtrl.current.value = '';
            }
        }
      }

    return (
        <div className="input-group mb-3">
            <input type="text" className="form-control" aria-describedby="button-addon2" ref={toDoCtrl} onKeyPress={onEnter}/>
            <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={doAdd}>
                <i className="fas fa-plus"></i>
            </button>
        </div>
    )
}

export default ToDoForm;