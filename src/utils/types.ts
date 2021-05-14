import React from 'react';

export type UpdateFunction<T> = (value: React.SetStateAction<T>) => void;

export type TToDo = {
    label: string;
    checked: boolean;
    onDelete: (label: string) => void;
    /** Switch to do state */
    onDone: (label: string, done: boolean) => void;
    creation: Date;
}
