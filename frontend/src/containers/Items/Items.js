import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Grid, Typography} from "@material-ui/core";

import Preloader from "../../components/UI/Preloader/Preloader";
import {getItems} from "../../store/actions/itemsActions";
import Item from "../../components/Item/Item";
import {useLocation} from "react-router-dom";
import CategoryTitle from "../CategoryTitle/CategoryTitle";

const useQuery = () => {
    const {search} = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
};

const Items = () => {
    const dispatch = useDispatch();
    const items = useSelector(state => state.items.items);
    const loading = useSelector(state => state.items.fetchLoading);

    const query = useQuery();
    const id = query.get('category');

    useEffect(() => {
        dispatch(getItems(id));
    }, [dispatch, id]);

    let itemsList = null;

    if (items && items.length > 0) {
        itemsList = (
            <Grid item container direction="row" spacing={3}>
                {items.map(item => (
                    <Item
                        key={item._id}
                        id={item._id}
                        title={item.title}
                        image={item.image}
                        price={item.price}
                    />
                ))}
            </Grid>
        );
    }

    return (
        <>
            <Preloader loading={loading} />
            <Grid container direction="column" spacing={3}>
                <Grid item>
                    <CategoryTitle id={id} />
                </Grid>
                <Grid item>
                    {itemsList || <Typography variant="h5">No items in this category</Typography>}
                </Grid>
            </Grid>
        </>
    );
};

export default Items;