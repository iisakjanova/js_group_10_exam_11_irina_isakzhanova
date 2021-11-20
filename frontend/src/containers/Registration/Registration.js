import React, {useEffect, useState} from 'react';
import {Link as RouterLink} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {
    Avatar,
    Container,
    Grid, Link,
    makeStyles,
    Typography
} from "@material-ui/core";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {Alert} from "@material-ui/lab";

import FormElement from "../../components/UI/FormElement/FormElement";
import {cleanUpError, registerUser} from "../../store/actions/usersActions";
import ButtonWithProgress from "../../components/UI/ButtonWithProgress/ButtonWithProgress";

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    alert: {
        marginTop: theme.spacing(3),
        width: "100%",
    },
}));

const Registration = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const error = useSelector(state => state.users.registerError);
    const loading = useSelector(state => state.users.registerLoading);

    const [user, setUser] = useState({
        username: '',
        password: '',
        displayName: '',
        phoneNumber: '',
    });

    useEffect(() => {
        dispatch(cleanUpError());
    }, [dispatch]);

    const inputChangeHandler = e => {
        const {name, value} = e.target;
        setUser(prevState => ({...prevState, [name]: value}));
    };

    const submitFormHandler = e => {
        e.preventDefault();
        dispatch(registerUser({...user}));
    };

    const getFieldError = fieldName => {
        try {
            return error.errors[fieldName].message;
        } catch (e) {
            return undefined;
        }
    };

    return (
        <Container component="section" maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h6">
                    Register
                </Typography>
                {
                    error?.global &&
                    <Alert severity="error" className={classes.alert}>
                        {error.global}
                    </Alert>
                }
                <Grid
                    component="form"
                    container
                    className={classes.form}
                    onSubmit={submitFormHandler}
                    spacing={2}
                >
                    <FormElement
                        type="text"
                        autoComplete="new-username"
                        label="Username"
                        name="username"
                        value={user.username}
                        onChange={inputChangeHandler}
                        error={getFieldError('username')}
                    />
                    <FormElement
                        type="password"
                        autoComplete="new-password"
                        label="Password"
                        name="password"
                        value={user.password}
                        onChange={inputChangeHandler}
                        error={getFieldError('password')}
                    />
                    <FormElement
                        type="text"
                        autoComplete="new-displayName"
                        label="Display name"
                        name="displayName"
                        value={user.displayName}
                        onChange={inputChangeHandler}
                        error={getFieldError('display_name')}
                    />
                    <FormElement
                        type="text"
                        autoComplete="new-displayName"
                        label="Phone number"
                        name="phoneNumber"
                        value={user.phoneNumber}
                        onChange={inputChangeHandler}
                        error={getFieldError('phone_number')}
                    />
                    <Grid item xs={12}>
                        <ButtonWithProgress
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            loading={loading}
                            disabled={loading}
                        >
                            Register
                        </ButtonWithProgress>
                    </Grid>
                    <Grid item container justifyContent="flex-end">
                        <Link component={RouterLink} variant="body2" to="/login">
                            Already have an account? Login
                        </Link>
                    </Grid>
                </Grid>
            </div>
        </Container>
    );
};

export default Registration;