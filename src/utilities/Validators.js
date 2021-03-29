
export const requiredField = (value) => {
    if (value) return undefined
    else {
/*        alert('Field is required')*/
        return 'Field is required'
    }


}

export const maxLengthCreator = (maxLength) => (value) => {
    if (value && value.length < maxLength) return undefined
    else {
/*        alert('MaxLength exceeded')*/
        return `Max length is ${maxLength} symbols`
    }
}