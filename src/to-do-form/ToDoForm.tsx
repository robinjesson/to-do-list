import React, { SyntheticEvent, useRef, useState } from 'react';
import './ToDoForm.css';
import { timer } from 'rxjs';

const ToDoForm: React.FC<{onAdd: (label: string) => string | undefined}> = (props) => {
    const toDoCtrl = useRef<HTMLInputElement>(null);

    const [showError, setShowError] = useState<boolean>(false);
    const [messageError, setMessageError] = useState<string>('');

    const doAdd: (event: SyntheticEvent) => void = (event: SyntheticEvent) => {
        event.preventDefault();
        if(toDoCtrl.current) {
            const message: string | undefined = props.onAdd(toDoCtrl.current.value);
            if(!message) 
                toDoCtrl.current.value = '';
            else
                showErrorDiv(message);
        }    
    }

    const onEnter = (event: any) => {
        if(event.key === 'Enter'){
            if(toDoCtrl.current) {
                const message: string | undefined = props.onAdd(toDoCtrl.current.value);
                if(!message) 
                    toDoCtrl.current.value = '';
                else
                    showErrorDiv(message);
            }
        }
    }

    const showErrorDiv: (message: string) => void = (message: string) => {
        setMessageError(prev => prev = message);
        setShowError(prev => prev = true);
        timer(5000).subscribe(() => setShowError(prev => prev = false));
    }

    return (
        <div className="input-group my-3 has-validation">
            <input type="text" className={(showError && messageError ? 'is-invalid' : '') + " form-control"} aria-describedby="button-addon2" ref={toDoCtrl} onKeyPress={onEnter}/>
            <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={doAdd}>
                <i className="fas fa-plus"></i>
            </button>
            {showError && messageError !== '' && <div className="invalid-feedback">
                {messageError}
            </div>}
        </div>
    )
}

export default ToDoForm;