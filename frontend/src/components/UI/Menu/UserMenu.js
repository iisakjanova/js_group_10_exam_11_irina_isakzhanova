import React from 'react';
import {Button, Grid, makeStyles} from "@material-ui/core";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";

import {logoutUser} from "../../../store/actions/usersActions";

const useStyles = makeStyles(theme => ({
    link: {
        color: 'inherit',
        textDecoration: 'none',
        '&:hover': {
            color: 'inherit'
        }
    },
}));

const UserMenu = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    return (
        <Grid container alignItems="center">
            <Grid item>
                <Button
                    component={Link}
                    to="/items/add"
                    className={classes.link}
                >
                    Add new post
                </Button>
            </Grid>
            <Grid item>
                <Button
                    onClick={() => dispatch(logoutUser())}
                    className={classes.link}
                >
                    Logout
                </Button>
            </Grid>
        </Grid>
    );
};

export default UserMenu;