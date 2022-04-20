const validate = (fieldValues = values) => {
    let temp = { ...errors }

    if ("fullName" in fieldValues)
        temp.fullName = fieldValues.fullName ? "" : "This field is required."

    if ("email" in fieldValues) {
        temp.email = fieldValues.email ? "" : "This field is required."
        if (fieldValues.email)
            temp.email = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(fieldValues.email)
                ? ""
                : "Email is not valid."
    }

    if ("message" in fieldValues)
        temp.message =
            fieldValues.message ? "" : "This field is required."

    setErrors({
        ...temp
    });
}
