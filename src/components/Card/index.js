import React, {Fragment, useEffect, useRef} from 'react'
import PropTypes from 'prop-types'


import {
    Avatar,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia, CircularProgress,
    Collapse,
   Link,
    Typography,
    withStyles
} from '@material-ui/core';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {useDispatch, useSelector} from "react-redux";
import isEmpty from 'lodash/isEmpty';
import {fetchComment, fetchUsers, selectCard} from "./actions";
import Comment from "../Comment";


const styles = () => ({
    contentCard: {
        textAlign: 'left'
    },
    link: {
        display: 'flex',
        alignItems: 'center'
    },
    contentCollapse: {
        maxHeight: '500px',
        overflow: 'auto',
    },
    cardHeader: {
        textAlign: 'left'
    },
    contentComments: {
        padding: "40px 20px",
    }
})


/**
 * CardCustom
 */
const usePreviousValue = value => {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
};
function CardCustom(props) {
    const {classes, content, title, userId, image, postId} = props;
    const [expanded, setExpanded] = React.useState(false);
    const dispatch = useDispatch();
    const prevPost = usePreviousValue(postId);

    const cardCustom = useSelector(selectCard);
    const isMountedRef = useRef(null);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    useEffect(() => {
        dispatch(fetchComment(postId))
        if(prevPost !== postId) {
            setExpanded(false);
        }
    }, [postId, expanded])

    useEffect(() => {
        const empty = isEmpty(cardCustom?.card);
        isMountedRef.current = true;
        if (userId && empty) {
            dispatch(fetchUsers(userId))
        }
        return () => {
            isMountedRef.current = false;
        };
    }, []);
    return (
        <>
            {cardCustom?.loading && <CircularProgress />}
            <Card sx={{ maxWidth: 345 }}>
                <CardHeader
                    className={classes.cardHeader}
                    avatar={
                        <Avatar aria-label="recipe">
                            {cardCustom?.user?.name?.charAt(0)}
                        </Avatar>
                    }
                    title={title}
                    subheader={`Created by: ${cardCustom?.user?.username}`}
                />
                {image ? <CardMedia
                    component="img"
                    height="194"
                    image=""
                    alt="image"
                /> : null}
                <CardContent className={classes.contentCard}>
                    <Typography variant="body2">
                        {content}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <Link
                        className={classes.link}
                        component="button"
                        variant="body2"
                        onClick={handleExpandClick}
                    >
                        See comments  <ExpandMoreIcon />
                    </Link>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent className={classes.contentCollapse}>
                        <div className={classes.contentComments}>
                            {cardCustom?.comments ? <>
                                    {cardCustom?.comments.map(comment => <div key={comment?.id}> <Comment comment={comment}/></div>)}
                                </> : null}
                        </div>
                    </CardContent>
                </Collapse>
            </Card>
        </>
    )


}

CardCustom.propTypes = {
    classes: PropTypes.object
};


export default withStyles(styles)(CardCustom);
