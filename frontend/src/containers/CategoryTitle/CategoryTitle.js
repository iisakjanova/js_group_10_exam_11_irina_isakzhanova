import React from 'react';
import {useSelector} from "react-redux";
import {Typography} from "@material-ui/core";

const CategoryTitle = ({id}) => {
    const categories = useSelector(state => state.categories.categories);

    let category;

    if (id) {
        category = categories.find((cat => (cat._id === id)));
    }

    return (
        <Typography variant="h5">{category ? category.title : 'All categories'}</Typography>
    );
};

export default CategoryTitle;