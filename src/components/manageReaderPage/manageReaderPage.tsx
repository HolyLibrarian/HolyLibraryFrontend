import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Container, TextField, Button, Grid, Typography, CssBaseline } from '@material-ui/core';

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

interface ManageReaderPageProps {
    isDisplay?: boolean;
}

const ManageReaderPage: React.FC<ManageReaderPageProps> = (props) => {
    const classes = useStyles();

    return (
        <Container component="main" maxWidth="sm" style={props.isDisplay ? {} : { display: 'none' }}>
            
        </Container>
    );
}

export default ManageReaderPage;