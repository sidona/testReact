import React, {useEffect} from 'react'
import PropTypes from 'prop-types'


import {CircularProgress, withStyles} from '@material-ui/core';
import {useDispatch, useSelector} from "react-redux";
import {fetchPosts, selectPost} from "./actions";
import CarouselCustom from "../../components/CarouselCustom";
import AddPost from "../AddPost";


const styles = () => ({
    contentPost: {
        paddingTop: 20,
        display: 'flex',
        justifyContent: 'center',
    }
})


/**
 * Posts
 */
function Posts(props) {
    const {classes} = props;
    const post = useSelector(selectPost);
    const dispatch = useDispatch();
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    useEffect(() => {
        dispatch(fetchPosts())
    }, [])

    return (
        <div className={classes.contentPost}>
            {post?.loading &&  <CircularProgress />}
            {post?.posts?.length ? <CarouselCustom item={post?.posts[activeStep]} onHandleNext={handleNext} onHandleBack={handleBack}
                                            activeStep={activeStep} maxSteps={5}/> : null}
            <AddPost/>
        </div>
    )


}

Posts.propTypes = {
    classes: PropTypes.object
};


export default withStyles(styles)(Posts);
