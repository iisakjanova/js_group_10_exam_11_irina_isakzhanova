import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {Grid, makeStyles, Typography} from "@material-ui/core";

import {apiURL} from "../../config";
import Preloader from "../../components/UI/Preloader/Preloader";
import {deleteItem, getItemById} from "../../store/actions/itemsActions";
import ButtonWithProgress from "../../components/UI/ButtonWithProgress/ButtonWithProgress";

const useStyles = makeStyles(theme => ({
    imageWrapper: {
        width: '30%',
        marginRight: theme.spacing(2),
    },
    image: {
        maxHeight: '130px',
        width: 'auto',
    },
}));

const SingleItem = ({match}) => {
    const dispatch = useDispatch();
    const id = match.params.id;

    const classes = useStyles();

    useEffect(() => {
        dispatch(getItemById(id));
    }, [dispatch, id]);

    const item = useSelector(state => state.items.item);
    const loading = useSelector(state => state.items.singleLoading);
    const user = useSelector(state => state.users.user);

    const handleDelete = () => {
        dispatch(deleteItem(item._id));
    };

    let deleteBtn = null;

    if (user?._id === item?.user._id) {
        deleteBtn = (
            <ButtonWithProgress
                type="button"
                variant="contained"
                color="primary"
                loading={loading}
                disabled={loading}
                onClick={handleDelete}
            >
                Delete item
            </ButtonWithProgress>
        );
    }

    let message = null;

    if (!item) {
        message = (
            <Typography variant="h4">Item is not found.</Typography>
        );
    }

    const imageUrl = apiURL + '/' + item?.image;

    return (
        <>
            <Preloader loading={loading} />
            {message}
            {item && (
                <Grid container direction="column" spacing={3}>
                    <Grid item>
                        <Typography variant="body1">
                            Category: {item.category.title}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="h5">
                            {item.title}
                        </Typography>
                    </Grid>
                    <Grid item className={classes.imageWrapper}>
                        <img src={imageUrl} className={classes.image} alt={item.title}/>
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle1">
                            {item.description}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle1">
                            Price: <b>{item.price} USD</b>
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="h6">
                            Contacts:
                        </Typography>
                        <Typography variant="subtitle1">
                            Seller: <b>{item.user.display_name}</b>
                        </Typography>
                        <Typography variant="subtitle1">
                            Phone number: <b>{item.user.phone_number}</b>
                        </Typography>
                    </Grid>
                    <Grid item>
                        {deleteBtn}
                    </Grid>
                </Grid>
            )}
        </>
    );
};

export default SingleItem;