import React, {FC} from "react";
import classes from './FormsControls.module.css'
import cn from "classnames"
import {Field, WrappedFieldProps} from "redux-form";
import {TFieldValidator} from "../../../utilities/Validators";


//--------------simple form input field creator---------------------------------------

export function simpleInputFieldCreator<TFormDataKeys extends string> (name: TFormDataKeys,
                                                                       validate: Array<TFieldValidator> | null,
                                                                       placeholder: string) {
    return <Field name={name} component={Input} validate={validate} placeholder={placeholder}/>
}

//------------------------------------------------------------------------------------


export const Textarea: FC<WrappedFieldProps> = ({input, meta, ...props}) => {
    const hasError = meta.touched && meta.error
    return (
        <div className={cn(classes.error, {[classes.formControl]: hasError})}>
            <div>
                <textarea {...input} {...props} />
            </div>
            <div>
                {hasError && <span> {meta.error} </span>}
            </div>
        </div>
    )
}

export const Input: FC<WrappedFieldProps> = ({input, meta, ...props})  => {
    const hasError = meta.touched && meta.error
    return (
        <div className={cn(classes.error, {[classes.formControl]: hasError})}>
            <div>
                <input {...input} {...props} />
                {hasError && <span> {meta.error} </span>}
            </div>
        </div>
    )
}

export const Checkbox: FC<WrappedFieldProps> = ({input, meta, children, ...restProps}) => {
    const finalInputClassName = classes.innerCbx
    const finalBoxClassName = classes.checkboxBox
    return (
        <label className={finalBoxClassName}>
            {children && <span className={classes.spanClassName}>{children}</span>}
            <input
                type={'checkbox'}
                className={finalInputClassName}
                id="cbx"
                {...input}
                {...restProps}
            />
            <label htmlFor="cbx" className={classes.check}>
                <svg width="18px" height="18px" viewBox="0 0 18 18">
                    <path
                        d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"> </path>
                    <polyline points="1 9 7 14 15 4"> </polyline>
                </svg>
            </label>
        </label>
    )
}

