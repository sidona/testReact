import React from 'react'
import PropTypes from 'prop-types'


import {Avatar, Grid} from '@material-ui/core';
import {Divider} from "@mui/material";



/**
 * Comment
 */
function Comment(props) {
    const {comment} = props;


    return (
            <Grid container wrap="nowrap" spacing={2}>
                <Grid item>
                    <Avatar alt="user" src={''} />
                </Grid>
                <Grid justifyContent="left" item xs zeroMinWidth>
                    <h4 style={{ margin: 0, textAlign: "left" }}>{comment?.name}</h4>
                    <p style={{ textAlign: "left", color: "gray" }}>
                        {comment?.email}
                    </p>
                    <p style={{ textAlign: "left" }}>
                        {comment?.body}
                    </p>
                    <Divider />
                </Grid>
            </Grid>
    )


}

Comment.propTypes = {
    classes: PropTypes.object
};


export default (Comment);
