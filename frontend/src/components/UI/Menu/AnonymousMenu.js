import React from 'react';
import {Button, Grid, makeStyles, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";

const useStyles = makeStyles(theme => ({
    link: {
        color: 'inherit',
        textDecoration: 'none',
        '&:hover': {
            color: 'inherit'
        }
    },
}));

const AnonymousMenu = () => {
    const classes = useStyles();

    return (
        <Grid container alignItems="center">
            <Grid item>
                <Button
                    component={Link}
                    to="/register"
                    className={classes.link}
                >
                    Register
                </Button>
            </Grid>
            <Grid item>
                <Typography variant="subtitle1">or</Typography>
            </Grid>
            <Grid item>
                <Button
                    component={Link}
                    to="/login"
                    className={classes.link}
                >
                    Login
                </Button>
            </Grid>
        </Grid>
    );
};

export default AnonymousMenu;