import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Container, TextField, Button, Grid, Typography, CssBaseline } from '@material-ui/core';
import Collection, { CollectionDefaultValue } from '../../interface/Collection'
import { updateCollection } from '../../apis/collection'
import $ from 'jquery';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    button: {
        margin: theme.spacing(1),
    }
}));

interface EditCollectionPageProps {
    isDisplay?: boolean;
    returnCollectionId?: number;
    collection: any;
    goBack(): void;
}

const EditCollectionPage: React.FC<EditCollectionPageProps> = (props) => {
    const classes = useStyles();
    const [collection, setCollection] = useState(CollectionDefaultValue);

    return (
        <Container component="main" maxWidth="lg" style={props.isDisplay ? {} : { display: 'none' }} >
            <div className={classes.paper}>
                <form className={classes.form} noValidate>
                    <Typography variant="h2" gutterBottom>
                        編輯館藏
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Button variant="contained" color="primary" className={classes.button} onClick={
                                (event) => {
                                    collection.collectionId = props.collection.id;
                                    collection.name = String($('#name').val());
                                    collection.author = String($('#author').val());
                                    collection.isbn = String($('#isbn').val());
                                    collection.location = String($('#location').val());
                                    collection.publisher = String($('#publisher').val());
                                    collection.price = String($('#price').val());
                                    updateCollection(collection, (response) => {
                                        alert("存檔成功！");
                                        props.goBack();
                                    });
                                }
                            }>存檔</Button>
                            <Button variant="contained" color="primary" className={classes.button} onClick={
                                (event) => {
                                    setCollection(CollectionDefaultValue);
                                    props.goBack();
                                }
                            }>回上一頁</Button>
                        </Grid>
                        <Grid item xs={12} sm={6}></Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="name"
                                label="名稱"
                                name="name"
                                value={collection.name === '' ? (props.collection === undefined ? "" : props.collection.name) : collection.name}
                                autoFocus
                                onChange={(event) => {
                                    setCollection({ ...collection, name: event.target.value });
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="publisher"
                                label="出版社"
                                id="publisher"
                                value={collection.publisher === '' ? (props.collection === undefined ? "" : props.collection.publisher) : collection.publisher}
                                onChange={(event) => {
                                    setCollection({ ...collection, publisher: event.target.value });
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="author"
                                label="作者"
                                id="author"
                                value={collection.author === '' ? (props.collection === undefined ? "" : props.collection.author) : collection.author}
                                onChange={(event) => {
                                    setCollection({ ...collection, author: event.target.value });
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="isbn"
                                label="ISBN"
                                id="isbn"
                                value={collection.isbn === '' ? (props.collection === undefined ? "" : props.collection.isbn) : collection.isbn}
                                onChange={(event) => {
                                    setCollection({ ...collection, isbn: event.target.value });
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="location"
                                label="書籍位置"
                                id="location"
                                value={collection.location === '' ? (props.collection === undefined ? "" : props.collection.location) : collection.location}
                                onChange={(event) => {
                                    setCollection({ ...collection, location: event.target.value });
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="price"
                                label="價錢"
                                id="price"
                                value={collection.price === '' ? (props.collection === undefined ? "" : props.collection.price) : collection.price}
                                onChange={(event) => {
                                    setCollection({ ...collection, price: event.target.value });
                                }}
                            />
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}

export default EditCollectionPage;