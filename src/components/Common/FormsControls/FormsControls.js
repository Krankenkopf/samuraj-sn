import React from "react";
import classes from './FormsControls.module.css'

export const Textarea = ({input, meta, ...props}) => {
    const hasError = meta.touched && meta.error
    return (
        <div className={hasError && classes.formControl + ' ' + classes.error}>
            <div>
                <textarea {...input} {...props} />
            </div>
            <div>
                {hasError && <span> {meta.error} </span>}
            </div>
        </div>
    )
}

export const Input = ({input, meta, ...props}) => {
    const hasError = meta.touched && meta.error
    return (
        <div className={hasError && classes.formControl + ' ' + classes.error}>
            <div>
                <input {...input} {...props} />
                {hasError && <span> {meta.error} </span>}
            </div>
        </div>
    )
}