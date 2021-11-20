import React from 'react';
import {Grid} from "@material-ui/core";

import Categories from "../Categories/Categories";

const Home = () => {
    return (
        <Grid container>
            <Grid item>
                <Categories />
            </Grid>
        </Grid>
    );
};

export default Home;