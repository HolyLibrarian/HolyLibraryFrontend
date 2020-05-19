import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Container, TextField, Button, Grid, Typography, CssBaseline } from '@material-ui/core';
import BorrowRecord, { BorrowRecordDefaultValue } from '../../interface/BorrowRecord'
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
    }
}));

interface BorrowPageProps {
    isDisplay?: boolean;
    borrowRecord?: BorrowRecord;
    returnCollectionId?: number;
    onBorrowSubmit: (borrowRecord: BorrowRecord) => void;
    onReturnSubmit: (collecctionId: string) => void;
}

const BorrowPage: React.FC<BorrowPageProps> = (props) => {
    const classes = useStyles();
    const [borrowRecord, setBorrowRecord] = useState(BorrowRecordDefaultValue);
    const [collectionId, setCollectionId] = useState("")
    const clearForm = () => {
        $('#userId').val("");
        $('#collectionId').val("");
        $('#returnCollectionId').val("");
    }

    return (
        <Container component="main" maxWidth="sm" style={props.isDisplay ? {} : { display: 'none' }}>
            <div className={classes.paper}>
                <form className={classes.form} noValidate onSubmit={
                    (event) => {
                        event.preventDefault();

                        props.onBorrowSubmit(borrowRecord);
                    }}>
                    <Typography variant="h6" gutterBottom>
                        借閱館藏
                </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="userId"
                                label="讀者識別號"
                                name="userId"
                                autoFocus
                                onChange={(event) => {
                                    setBorrowRecord({ ...borrowRecord, userId: event.target.value })
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="collectionId"
                                label="館藏條碼號"
                                type="collectionId"
                                id="collectionId"
                                onChange={(event) => {
                                    setBorrowRecord({ ...borrowRecord, collectionId: event.target.value })
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={clearForm}
                            >
                                重設
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={6} alignContent="space-around">
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                            >
                                借閱
                        </Button>
                        </Grid>
                    </Grid>
                </form>
                <form className={classes.form} noValidate onSubmit={
                    (event) => {
                        event.preventDefault();

                        props.onReturnSubmit(collectionId);
                    }}>
                    <Typography variant="h6" gutterBottom>
                        歸還館藏
                </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="collectionId"
                                label="館藏條碼號"
                                type="collectionId"
                                id="returnCollectionId"
                                onChange={(event) => {
                                    setCollectionId(event.target.value);
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={clearForm}
                            >
                                重設
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                            >
                                歸還
                        </Button>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}

export default BorrowPage;