import React from 'react'
import PropTypes from 'prop-types'


import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    withStyles
} from '@material-ui/core';
import Button from "@mui/material/Button";
import {useFormControls} from "./formControl";
import {useDispatch, useSelector} from "react-redux";
import {openModal, selectAddPost} from "./actions";


const styles = () => ({})


/**
 * AddPost
 */
const inputFieldValues = [
    {
        name: "title",
        label: "Title",
        id: "title"
    },
    {
        name: "body",
        label: "Description",
        id: "my-body",
        multiline: true,
        rows: 10
    }
];
function AddPost() {
    const {
        handleInputValue,
        handleFormSubmit,
        formIsValid,
        errors
    } = useFormControls();
    const addPost = useSelector(selectAddPost);
    const dispatch = useDispatch();
    const handleClose = () => {
        dispatch(openModal(false))
    }
    return (
        <Dialog open={addPost?.isOpenModalAdd} onClose={handleClose}>
            <form autoComplete="off" onSubmit={handleFormSubmit}>
            <DialogTitle>Create post</DialogTitle>
            <DialogContent>
                    {inputFieldValues.map((inputFieldValue, index) => {
                        return (
                            <TextField
                                key={index}
                                onChange={handleInputValue}
                                onBlur={handleInputValue}
                                name={inputFieldValue.name}
                                label={inputFieldValue.label}
                                error={errors[inputFieldValue.name]}
                                multiline={inputFieldValue.multiline ?? false}
                                fullWidth
                                rows={inputFieldValue.rows ?? 1}
                                autoComplete="none"
                                {...(errors[inputFieldValue.name] && {
                                    error: true,
                                    helperText: errors[inputFieldValue.name]
                                })}
                            />
                        );
                    })}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button variant="contained"
                        type="submit"
                        color="secondary"
                        disabled={!formIsValid()} >Add</Button>
            </DialogActions>
            </form>
        </Dialog>
    )


}

AddPost.propTypes = {
    classes: PropTypes.object
};


export default withStyles(styles)(AddPost);
