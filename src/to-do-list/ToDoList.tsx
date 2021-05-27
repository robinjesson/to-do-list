import React, { useState } from "react";
import ToDoForm from "../to-do-form/ToDoForm";
import ToDo from "../to-do/ToDo";
import { ListType } from "../utils/enum";
import { TToDo } from "../utils/types";
import "./ToDoList.css";

const ToDoList: React.FC<{}> = () => {
  const [toDoList, setToDoList] = useState<TToDo[]>([]);
  const [doneList, setDoneList] = useState<TToDo[]>([]);

  const doAdd: (label: string) => string | undefined = (label: string) => {
    if (label === "") {
      return "L'élément est vide.";
    } else if (toDoList.some((todo) => todo.label === label)) {
      return "L'élément à ajouter existe déjà.";
    } else {
      setToDoList(
        (prev) =>
          (prev = prev.concat([
            {
              label: label,
              checked: false,
              creation: new Date(),
            },
          ]))
      );
      return undefined;
    }
  };

  const doDelete: (label: string, listType: ListType) => void = (
    label: string,
    listType: ListType
  ) => {
    switch (listType) {
      case ListType.TODO_LIST:
        setToDoList(
          (prev) => (prev = prev.filter((todo) => todo.label !== label))
        );
        break;
      case ListType.DONE_LIST:
        setDoneList(
          (prev) => (prev = prev.filter((todo) => todo.label !== label))
        );
        break;
    }
  };

  const doDone: (label: string, checked: boolean) => void = (
    label: string,
    checked: boolean
  ) => {
    let copyToDoList: TToDo[] = [...toDoList];
    let copyDoneList: TToDo[] = [...doneList];
    if (!checked) {
      const idx: number = copyToDoList.findIndex(
        (todo) => todo.label === label
      );
      let todo: TToDo = copyToDoList[idx];
      setToDoList(
        (prev) =>
          (prev = copyToDoList.filter((elt) => elt.label !== todo.label))
      );
      todo.checked = true;
      copyDoneList.push(todo);
      setDoneList((prev) => (prev = copyDoneList));
    } else {
      const idx: number = copyDoneList.findIndex(
        (todo) => todo.label === label
      );
      let todo: TToDo = copyDoneList[idx];
      setDoneList(
        (prev) =>
          (prev = copyDoneList.filter((elt) => elt.label !== todo.label))
      );
      todo.checked = false;
      copyToDoList.push(todo);
      setToDoList((prev) => (prev = copyToDoList));
    }
  };

  return (
    <React.Fragment>
      <div className="my-2">
        <ToDoForm onAdd={doAdd}></ToDoForm>
      </div>

      <div className="accordion" id="accordionExample">
        {toDoList.length > 0 && (
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingOne">
              <button
                className="accordion-button collapsed d-flex"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                <span className="flex-grow-1">A faire</span>
                <span className="badge bg-secondary mx-1">{toDoList.length}</span>
              </button>
            </h2>
            <div
              id="collapseOne"
              className="accordion-collapse collapse"
              aria-labelledby="headingOne"
              data-bs-parent="#accordionExample"
            > 
              <div className="accordion-body">
                <div className="list-group">
                  {toDoList.map((elt) => (
                    <ToDo
                      key={elt.label}
                      todo={elt}
                      onDelete={(label: string) => {
                        doDelete(label, ListType.TODO_LIST);
                      }}
                      onDone={doDone}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        {doneList.length > 0 && (
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingTwo">
              <button
                className="accordion-button collapsed d-flex"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
                aria-expanded="false"
                aria-controls="collapseTwo"
              >
                <span className="flex-grow-1">Fait</span>
                <span className="badge bg-secondary mx-1">{doneList.length}</span>
              </button>
            </h2>
            <div
              id="collapseTwo"
              className="accordion-collapse collapse"
              aria-labelledby="headingTwo"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <div className="list-group">
                  {doneList.map((elt) => (
                    <ToDo
                      key={elt.label}
                      todo={elt}
                      onDelete={(label: string) => {
                        doDelete(label, ListType.DONE_LIST);
                      }}
                      onDone={doDone}
                    ></ToDo>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default ToDoList;
