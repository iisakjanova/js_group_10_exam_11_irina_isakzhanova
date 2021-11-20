import React from 'react';
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {
    AppBar,
    Grid,
    makeStyles,
    Toolbar,
    Typography
} from "@material-ui/core";

import UserMenu from "../Menu/UserMenu";
import AnonymousMenu from "../Menu/AnonymousMenu";

const useStyles = makeStyles(theme => ({
    link: {
        color: 'inherit',
        textDecoration: 'none',
        '&:hover': {
            color: 'inherit'
        }
    },
    staticToolbar: {
        marginBottom: theme.spacing(2)
    }
}));

const AppToolbar = () => {
    const classes = useStyles();
    const user = useSelector(state => state.users.user);

    return (
        <>
            <AppBar position="fixed">
                <Toolbar>
                    <Grid container direction="row" alignItems="center" justifyContent="space-between">
                        <Grid item>
                            <Typography variant="h6">
                                <Link to="/" className={classes.link}>Flea market</Link>
                            </Typography>
                        </Grid>
                        <Grid item>
                            {user ? <UserMenu /> : <AnonymousMenu />}
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Toolbar className={classes.staticToolbar}/>
        </>
    );
};

export default AppToolbar;