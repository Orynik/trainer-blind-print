type formSchemaType = {
    name: string,
    label: string,
    type: string,
    placeholder?: string,
    default: string,
    options?: selectField
}

type selectField = {
    selectData: selectFieldData[]
}

type selectFieldData = {
    label: string,
    value: string
}


export {
    formSchemaType
}
