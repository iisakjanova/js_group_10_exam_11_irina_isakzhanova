import React, {useEffect} from 'react';
import {List, ListItem, ListItemText, Paper} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";

import {getCategories} from "../../store/actions/categoriesActions";
import Preloader from "../../components/UI/Preloader/Preloader";

const Categories = () => {
    const categories = useSelector(state => state.categories.categories);
    const loading = useSelector(state => state.categories.fetchLoading);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);

    return (
        <Paper>
            <Preloader loading={loading} />
            <List component="nav">
                <ListItem
                    button
                    component="a"
                    href={`/items`}
                >
                    <ListItemText primary="All items" />
                </ListItem>
                {categories?.length > 0
                    ?
                    categories.map(category => (
                        <ListItem
                            button
                            component="a"
                            href={`/items?category=${category._id}`}
                        >
                            <ListItemText primary={category.title} />
                        </ListItem>
                    ))
                    :
                    null
                }
            </List>
        </Paper>
    );
};

export default Categories;