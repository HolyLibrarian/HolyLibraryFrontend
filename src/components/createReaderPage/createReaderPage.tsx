import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Container, TextField, Button, Grid, Typography, CssBaseline } from '@material-ui/core';
import Reader, { ReaderDefaultValue } from '../../interface/Reader'
import { createReader } from '../../apis/reader'
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

interface CreateReaderPageProps {
    isDisplay?: boolean;
    returnCollectionId?: number;
    goBack(): void;
}

const CreateReaderPage: React.FC<CreateReaderPageProps> = (props) => {
    const classes = useStyles();
    const [reader, setReader] = useState(ReaderDefaultValue);

    return (
        <Container component="main" maxWidth="lg" style={props.isDisplay ? {} : { display: 'none' }} >
            <div className={classes.paper}>
                <form className={classes.form} noValidate>
                    <Typography variant="h2" gutterBottom>
                        編輯讀者
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Button variant="contained" color="primary" className={classes.button} onClick={
                                (event) => {
                                    createReader(reader, (response) => {
                                        alert("存檔成功！");
                                        props.goBack();
                                    });
                                }
                            }>存檔</Button>
                            <Button variant="contained" color="primary" className={classes.button} onClick={
                                (event) => {
                                    setReader(ReaderDefaultValue);
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
                                id="account"
                                label="帳號"
                                name="account"
                                autoFocus
                                onChange={(event) => {
                                    setReader({ ...reader, account: event.target.value });
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="password"
                                label="密碼"
                                name="password"
                                type="password"
                                autoFocus
                                onChange={(event) => {
                                    setReader({ ...reader, password: event.target.value });
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="name"
                                label="姓名"
                                name="name"
                                autoFocus
                                onChange={(event) => {
                                    setReader({ ...reader, name: event.target.value });
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="phoneNumber"
                                label="手機號碼"
                                id="phoneNumber"
                                onChange={(event) => {
                                    setReader({ ...reader, phoneNumber: event.target.value })
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="email"
                                label="Email"
                                id="email"
                                onChange={(event) => {
                                    setReader({ ...reader, email: event.target.value });
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="maxBorrowNumber"
                                label="最大借閱數"
                                id="maxBorrowNumber"
                                onChange={(event) => {
                                    setReader({ ...reader, maxBorrowNumber: event.target.value });
                                }}
                            />
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}

export default CreateReaderPage;