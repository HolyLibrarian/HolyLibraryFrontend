import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { 
    Container, TextField, Button, Grid, Typography, CssBaseline,
    TableContainer, Table, TableHead, TableCell, TableRow, TableBody,
    Paper
 } from '@material-ui/core';

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
    table: {
        minWidth: 450,
    }
}));

interface ManageReaderPageProps {
    rows: any;
    isDisplay?: boolean;
}

const ManageReaderPage: React.FC<ManageReaderPageProps> = (props) => {
    const classes = useStyles();

    return (
        <Container component="main" maxWidth="sm" style={props.isDisplay ? {} : { display: 'none' }}>
            <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell align="right">帳號</TableCell>
                                <TableCell align="right">名稱</TableCell>
                                <TableCell align="right">Email</TableCell>
                                <TableCell align="right">手機號碼</TableCell>
                                <TableCell align="right">最大借閱數量</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {props.rows.map((row: any) => (
                                <TableRow key={row.name}>
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="right">{row.id}</TableCell>
                                    <TableCell align="right">{row.account}</TableCell>
                                    <TableCell align="right">{row.name}</TableCell>
                                    <TableCell align="right">{row.phoneNumber}</TableCell>
                                    <TableCell align="right">{row.maxBorrowNumber}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
        </Container>
    );
}

export default ManageReaderPage;