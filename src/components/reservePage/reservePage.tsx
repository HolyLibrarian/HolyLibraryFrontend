import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {
    Container, TableContainer, Table, TableHead, TableCell, TableRow, TableBody,
    Paper, Button, Grid, TextField, InputBase, IconButton
} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import { reserveCollection, getReserveRecordsByToken } from '../../apis/collection'
import SearchIcon from '@material-ui/icons/Search';
import ReserveRecordPage from '../reserveRecordPage/reserveRecordPage'

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
        minWidth: 450
    },
    button: {
        margin: theme.spacing(1),
    },
    textField: {
        margin: theme.spacing(1),
        width: 200,
    },
    input: {
        margin: theme.spacing(1),
        flex: 1,
        width: "85%"
    },
    iconButton: {
        padding: 10,
    },
}));

interface ReservePageProps {
    rows: any;
    isDisplay?: boolean;
    changePage(page: string): void;
    getCollectionsByName(name: string): any;
}

const ReservePage: React.FC<ReservePageProps> = (props) => {
    const classes = useStyles();
    const [isDisplay, setIsDisplay] = useState(true);
    const [isRecordDisplay, setIsRecordDisplay] = useState(false);
    const [searchName, setSearchName] = useState("");
    const [reserveRecordsRow, setReserveRecordsRow] = useState([] as any);

    const getReserveRecords = async () => {
        var token = localStorage.getItem('token');
        if (token == null) {
            return [];
        }
        const reserveRecords = await getReserveRecordsByToken(token) as any;

        setReserveRecordsRow(
            reserveRecords.map((reserveRecord: any) => ({
                id: reserveRecord.id,
                name: reserveRecord.collection.name,
                author: reserveRecord.collection.author,
                publisher: reserveRecord.collection.publisher,
                createTime: reserveRecord.createTime,
                expireTime: reserveRecord.expireTime,
                isborrowed: reserveRecord.isborrowed,
            }))
        );
    };

    const setReservePageIsDispaly = () => {
        setIsDisplay(true);
        setIsRecordDisplay(false);
    }

    const setReserveRecordPageIsDispaly = () => {
        setIsDisplay(false);
        setIsRecordDisplay(true);
    }

    return (
        <Container component="main" maxWidth="lg">
            <Grid container spacing={2} style={isDisplay ? {} : { display: 'none' }}>
                <Grid item xs={12} sm={6}>
                    <Button variant="contained" color="primary" className={classes.button} onClick={
                        (event) => {
                            setReserveRecordPageIsDispaly();
                            getReserveRecords();
                        }
                    }>查詢預定紀錄</Button>
                </Grid>
                <Grid item xs={12} sm={6}></Grid>
                <Grid item xs={12} sm={6}>
                    <InputBase
                        color="primary"
                        className={classes.input}
                        placeholder="搜尋書籍"
                        inputProps={{ 'aria-label': 'search google maps' }}
                        onChange={
                            (event) => {
                                setSearchName(event.target.value)
                            }
                        }
                    />
                    <IconButton type="submit" className={classes.iconButton} aria-label="search" onClick={
                        (event) => {
                            props.getCollectionsByName(String(searchName));
                        }
                    }>
                        <SearchIcon />
                    </IconButton>
                </Grid>
            </Grid>
            <TableContainer component={Paper} style={isDisplay ? {} : { display: 'none' }}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell align="right">名稱</TableCell>
                            <TableCell align="right">作者</TableCell>
                            <TableCell align="right">出版社</TableCell>
                            <TableCell align="right">ISBN</TableCell>
                            <TableCell align="right">書籍位置</TableCell>
                            <TableCell align="right">價格</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.rows.map((row: any) => (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">
                                    {row.id}
                                </TableCell>
                                <TableCell align="right">{row.name}</TableCell>
                                <TableCell align="right">{row.author}</TableCell>
                                <TableCell align="right">{row.publisher}</TableCell>
                                <TableCell align="right">{row.isbn}</TableCell>
                                <TableCell align="right">{row.location}</TableCell>
                                <TableCell align="right">{row.price}</TableCell>
                                <TableCell align="right">
                                    <Button
                                        color="primary"
                                        startIcon={<SaveIcon />}
                                        onClick={(event) => {
                                            reserveCollection(row.id, (event) => {
                                                alert("預訂書籍成功！");
                                            });
                                        }}
                                    >
                                        預定
                                        </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <ReserveRecordPage
                rows={reserveRecordsRow}
                isDisplay={isRecordDisplay}
                goBack={setReservePageIsDispaly}
            />
        </Container>
    );
}

export default ReservePage;