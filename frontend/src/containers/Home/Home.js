import React from 'react';
import {Grid} from "@material-ui/core";

import Categories from "../Categories/Categories";
import Items from "../Items/Items";

const Home = () => {
    return (
        <Grid container wrap="nowrap" spacing={3}>
            <Grid item xs={3}>
                <Categories />
            </Grid>
            <Grid item xs={9}>
                <Items />
            </Grid>
        </Grid>
    );
};

export default Home;