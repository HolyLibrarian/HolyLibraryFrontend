import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {
    Container, TextField, Button, Grid, Typography, CssBaseline,
    TableContainer, Table, TableHead, TableCell, TableRow, TableBody,
    Paper
} from '@material-ui/core';
import { cancelReserve } from '../../apis/collection'

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
    },
    button: {
        margin: theme.spacing(1),
    },
}));

interface ReserveRecordPageProps {
    rows: any;
    isDisplay?: boolean;
    isBorrowRecordDisplay?: boolean;
    goBack():void;
}

const ReserveRecordPage: React.FC<ReserveRecordPageProps> = (props) => {
    const classes = useStyles();

    return (
        <Container component="main" maxWidth="lg" style={props.isDisplay ? {} : { display: 'none' }}>
            <div className={classes.paper}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} alignContent="space-around">
                        {<Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            onClick = {
                                (event) =>{
                                    props.goBack();
                                }
                            }
                        >
                            回上一頁
                        </Button>}
                    </Grid>
                </Grid>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>書名</TableCell>
                                <TableCell align="right">作者</TableCell>
                                <TableCell align="right">出版社</TableCell>
                                <TableCell align="right">預約到期時間</TableCell>
                                <TableCell align="right">借閱狀態</TableCell>
                                <TableCell align="right"></TableCell>
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
                                    <TableCell align="right">{row.isborrowed ? "可借閱" : "未規還"}</TableCell>
                                    <TableCell align="right">
                                        <Button 
                                         variant="contained"
                                         color="primary"
                                         className={classes.button}
                                         onClick={(event) => {
                                            cancelReserve(row.id, (response) =>{
                                                alert("成功取消預訂！");
                                                props.goBack();
                                            })
                                         }}
                                        >
                                            取消
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </Container>
    );
}

export default ReserveRecordPage;
