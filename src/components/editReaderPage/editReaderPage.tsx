import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Container, TextField, Button, Grid, Typography, CssBaseline } from '@material-ui/core';
import Reader, { ReaderDefaultValue } from '../../interface/Reader'
import { updateReader } from '../../apis/reader'
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

interface EditReaderPageProps {
    isDisplay?: boolean;
    returnCollectionId?: number;
    reader: any;
    goBack(): void;
}

const EditReaderPage: React.FC<EditReaderPageProps> = (props) => {
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
                                    reader.userId = props.reader.id;
                                    reader.name = String($('#name').val());
                                    reader.phoneNumber = String($('#phoneNumber').val());
                                    reader.email = String($('#email').val());
                                    reader.maxBorrowNumber = String($('#maxBorrowNumber').val());
                                    updateReader(reader, (response) => {
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
                                id="name"
                                label="姓名"
                                name="name"
                                value={reader.name === '' ? (props.reader === undefined ? "" : props.reader.name) : reader.name}
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
                                value={reader.phoneNumber === '' ? (props.reader === undefined ? "" : props.reader.phoneNumber) : reader.phoneNumber}
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
                                value={reader.email === '' ? (props.reader === undefined ? "" : props.reader.email) : reader.email}
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
                                value={reader.maxBorrowNumber === '' ? (props.reader === undefined ? "" : props.reader.maxBorrowNumber) : reader.maxBorrowNumber}
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

export default EditReaderPage;