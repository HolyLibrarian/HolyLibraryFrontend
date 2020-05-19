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

interface PesonalPageProps {
    rows: any;
    isDisplay?: boolean;
    isBorrowRecordDisplay?: boolean;
}

const PersonalPage: React.FC<PesonalPageProps> = (props) => {
    const classes = useStyles();

    return (
        <Container component="main" maxWidth="sm" style={props.isDisplay ? {} : { display: 'none' }}>
            <div className={classes.paper}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} alignContent="space-around">
                        {/* <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            查詢借閱紀錄
                        </Button> */}
                    </Grid>
                </Grid>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>書名</TableCell>
                                <TableCell align="right">作者</TableCell>
                                <TableCell align="right">出版社</TableCell>
                                <TableCell align="right">到期時間</TableCell>
                                <TableCell align="right">借閱狀態</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {props.rows.map((row: any) => (
                                <TableRow key={row.name}>
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="right">{row.author}</TableCell>
                                    <TableCell align="right">{row.publisher}</TableCell>
                                    <TableCell align="right">{row.expireTime}</TableCell>
                                    <TableCell align="right">{row.isReturned ? "已還" : "未還"}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </Container>
    );
}

export default PersonalPage;
