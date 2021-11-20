import {Link} from "react-router-dom";
import {
    Card,
    CardActions, CardContent,
    CardHeader,
    CardMedia,
    Grid,
    IconButton,
    makeStyles, Typography,
} from "@material-ui/core";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

import {apiURL} from "../../config";

const useStyles = makeStyles({
    card: {
        height: '100%'
    },
    media: {
        height: 0,
        paddingTop: '80%',
        backgroundSize: 'contain',
    },
});

const Item = ({title, id, image, price}) => {
    const classes = useStyles();
    const cardImage = apiURL + '/' + image;

    return (
        <Grid item xs={12} sm={6} md={6} lg={4}>
            <Card className={classes.card}>
                <CardHeader title={title} />
                <CardMedia
                    image={cardImage}
                    title={title}
                    className={classes.media}
                />
                <CardContent>
                    <Typography variant="subtitle1">{price} USD</Typography>
                </CardContent>
                <CardActions>
                    <IconButton component={Link} to={`/items/${id}`}>
                        <ArrowForwardIcon />
                    </IconButton>
                </CardActions>
            </Card>
        </Grid>
    );
};

export default Item;