import React, {useEffect, useState} from 'react';
import {Grid, makeStyles, MenuItem, Paper, Typography} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {Alert} from "@material-ui/lab";

import ButtonWithProgress from "../../components/UI/ButtonWithProgress/ButtonWithProgress";
import FileInput from "../../components/UI/FileInput/FileInput";
import FormElement from "../../components/UI/FormElement/FormElement";
import {Redirect} from "react-router-dom";
import {getCategories} from "../../store/actions/categoriesActions";
import {addItem, cleanUpItemError} from "../../store/actions/itemsActions";

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(2),
    },
    title: {
        textAlign: "center",
        marginBottom: theme.spacing(3),
    },
    alert: {
        marginTop: theme.spacing(3),
        width: "100%",
    },
}));

const initialState = {
    title: '',
    description: '',
    price: '',
    category: '',
    image: null,
};

const AddNewItem = ({history}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const error = useSelector(state => state.items.addError);
    const loading = useSelector(state => state.items.addLoading);
    const user = useSelector(state => state.users.user);
    const categories = useSelector(state => state.categories.categories);

    const [item, setItem] = useState(initialState);

    useEffect(() => {
        dispatch(cleanUpItemError());
        dispatch(getCategories());
    }, [dispatch]);

    if (!user) {
        const path = history.location.pathname + history.location.search;

        return <Redirect to={{
            pathname: "/login",
            state: {nextpath: path}
        }} />
    }

    const handleInputChange = e => {
        const {name, value} = e.target;
        setItem(prev => ({...prev, [name]: value}));
    };

    const handleFileChange = e => {
        const name = e.target.name;
        const file = e.target.files[0];
        setItem(prev => ({...prev, [name]: file}));
    };

    const handleFormSubmit = async e => {
        e.preventDefault();
        const formData = new FormData();

        Object.keys(item).forEach(key => {
            formData.append(key, item[key]);
        });

        dispatch(addItem(formData));
    };

    const getFieldError = fieldName => {
        try {
            return error.errors[fieldName].message;
        } catch (e) {
            return undefined;
        }
    };

    return (
        <Grid item>
            <Paper className={classes.root}>
                <Typography variant="h6" className={classes.title}>Add new item</Typography>
                {
                    error?.global &&
                    <Alert severity="error" className={classes.alert}>
                        {error.global}
                    </Alert>
                }
                <form onSubmit={handleFormSubmit}>
                    <Grid container direction="column" spacing={2}>
                        <FormElement
                            label="Title"
                            name="title"
                            value={item.title}
                            onChange={handleInputChange}
                            error={getFieldError('title')}
                        />
                        <FormElement
                            label="Description"
                            name="description"
                            multiline
                            rows={5}
                            value={item.description}
                            onChange={handleInputChange}
                            error={getFieldError('description')}
                        />
                        <FormElement
                            label="Price"
                            name="price"
                            value={item.price}
                            onChange={handleInputChange}
                            error={getFieldError('price')}
                        />
                        <Grid item xs>
                            <FormElement
                                select
                                label="Category"
                                name="category"
                                value={item.category || ''}
                                onChange={handleInputChange}
                                error={(getFieldError('category'))}
                                helperText={error ? 'Choose a category' : ''}
                            >
                                <MenuItem>Select a category</MenuItem>
                                {categories?.map(category => (
                                    <MenuItem
                                        key={category._id}
                                        value={category._id}
                                    >
                                        {category.title}
                                    </MenuItem>
                                ))}
                            </FormElement>
                        </Grid>
                        <Grid item xs>
                            <FileInput
                                label="Image"
                                name="image"
                                onChange={handleFileChange}
                                error={Boolean(getFieldError('image'))}
                                helperText={getFieldError('image')}
                            />
                        </Grid>
                        <Grid item>
                            <ButtonWithProgress
                                type="submit"
                                variant="contained"
                                color="primary"
                                loading={loading}
                                disabled={loading}
                            >
                                Create item
                            </ButtonWithProgress>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Grid>
    );
};

export default AddNewItem;