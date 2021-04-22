export type TFieldValidator = (value: string) => string | undefined

export const requiredField: TFieldValidator = (value) => {
    if (value) return undefined
    else {
/*        alert('Field is required')*/
        return 'Field is required'
    }

}

export const maxLengthCreator = (maxLength: number): TFieldValidator => (value) => {
    if (value && value.length < maxLength) return undefined
    else {
/*        alert('MaxLength exceeded')*/
        return `Max length is ${maxLength} symbols`
    }
}