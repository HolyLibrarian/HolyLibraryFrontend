
import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Container, TextField, Button, Grid, Typography, CssBaseline } from '@material-ui/core';
import Collection, { CollectionDefaultValue } from '../../interface/Collection'
import { createCollection } from '../../apis/collection'
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

interface CreateCollectionPageProps {
    isDisplay?: boolean;
    goBack(): void;
}

const CreateCollectionPage: React.FC<CreateCollectionPageProps> = (props) => {
    const classes = useStyles();
    const [collection, setCollection] = useState(CollectionDefaultValue);

    return (
        <Container component="main" maxWidth="lg" style={props.isDisplay ? {} : { display: 'none' }} >
            <div className={classes.paper}>
                <form className={classes.form} noValidate>
                    <Typography variant="h2" gutterBottom>
                        新建館藏
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Button variant="contained" color="primary" className={classes.button} onClick={
                                (event) => {
                                    createCollection(collection, (response) => {
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

export default CreateCollectionPage;