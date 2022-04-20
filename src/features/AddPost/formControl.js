import { useState } from "react";
import {useDispatch} from "react-redux";
import {addPost, fetchPosts} from "../posts/actions";
import {openModal} from "./actions";

const addPostData = async (
    values,
    addData,
    fetchPost,
    changeOpenModal,
    successCallback,
    errorCallback
) => {
    console.log('value', values)
    const saveData = await addData
    if (saveData?.id) {
        changeOpenModal();
        fetchPost();
        successCallback();
    }
    else errorCallback();
};

const initialFormValues = {
    title: "",
    body: "",
    formSubmitted: false,
    success: false
};

export const useFormControls = () => {
    const [values, setValues] = useState(initialFormValues);
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();

    const validate = (fieldValues = values) => {
        let temp = { ...errors };

        if ("title" in fieldValues)
            temp.title = fieldValues.title ? "" : "This field is required.";

        if ("body" in fieldValues)
            temp.body =
                fieldValues.body.length !== 0 ? "" : "This field is required.";

        setErrors({
            ...temp
        });
    };

    const handleInputValue = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        });
        validate({ [name]: value });
    };

    const handleSuccess = () => {
        setValues({
            ...initialFormValues,
            formSubmitted: true,
            success: true
        });
    };

    const handleError = () => {
        setValues({
            ...initialFormValues,
            formSubmitted: true,
            success: false
        });
    };

    const formIsValid = (fieldValues = values) => {
        const isValid =
            fieldValues.title &&
            fieldValues.body &&
            Object.values(errors).every((x) => x === "");

        return isValid;
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const isValid =
            Object.values(errors).every((x) => x === "") && formIsValid();
        if (isValid) {
            await addPostData(values, dispatch(addPost({title: values?.title, body: values?.body})), dispatch(openModal(false)),dispatch(fetchPosts()), handleSuccess, handleError);
        }
    };

    return {
        values,
        errors,
        handleInputValue,
        handleFormSubmit,
        formIsValid
    };
};
