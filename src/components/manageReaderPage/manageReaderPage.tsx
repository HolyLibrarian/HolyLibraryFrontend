import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {
    Container, TableContainer, Table, TableHead, TableCell, TableRow, TableBody,
    Paper, Button, Grid
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import { deleteReader, getReaderById } from '../../apis/reader'
import EditReaderPage from '../editReaderPage/editReaderPage'
import CreateReaderPage from '../createReaderPage/createReaderPage'

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
    }
}));

interface ManageReaderPageProps {
    rows: any;
    isDisplay?: boolean;
    changePage(page: string): void;
}

const ManageReaderPage: React.FC<ManageReaderPageProps> = (props) => {
    const classes = useStyles();
    const [isDisplay, setIsDisplay] = useState(true);
    const [isEditPageDisplay, setIsEditPageDisplay] = useState(false);
    const [isCreatePageDisplay, setIsCreatePageDisplay] = useState(false);
    const [reader, setReader] = useState();

    const setManagePageIsDispaly = () => {
        props.changePage("ManageReaderPage");
        setIsDisplay(true);
        setIsEditPageDisplay(false);
        setIsCreatePageDisplay(false);
    }

    const getReader = async (userId: string) => {
        var token = localStorage.getItem('token');
        if (token == null) {
            return [];
        }
        const readers = await getReaderById(token, userId) as any;

        return readers
    }

    const showEditPage = (userId: string) => {
        (async function () {
            setReader(await getReader(userId));
        })();

        setIsEditPageDisplay(true);
        setIsDisplay(false);
        setIsCreatePageDisplay(false);
    }

    const showCreatePage = () => {
        setIsCreatePageDisplay(true);
        setIsEditPageDisplay(false);
        setIsDisplay(false);
    }

    return (
        <Container component="main" maxWidth="lg">
            <Grid container spacing={2} style={isDisplay ? {} : { display: 'none' }}>
                <Grid item xs={12} sm={6}>
                    <Button variant="contained" color="primary" className={classes.button} onClick={
                        (event) => {
                            showCreatePage();
                        }
                    }>新增</Button>
                </Grid>
            </Grid>
            <TableContainer component={Paper} style={isDisplay ? {} : { display: 'none' }}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell align="right">帳號</TableCell>
                            <TableCell align="right">名稱</TableCell>
                            <TableCell align="right">Email</TableCell>
                            <TableCell align="right">手機號碼</TableCell>
                            <TableCell align="right">最大借閱數量</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.rows.map((row: any) => (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">
                                    {row.id}
                                </TableCell>
                                <TableCell align="right">{row.account}</TableCell>
                                <TableCell align="right">{row.name}</TableCell>
                                <TableCell align="right">{row.email}</TableCell>
                                <TableCell align="right">{row.phoneNumber}</TableCell>
                                <TableCell align="right">{row.maxBorrowNumber}</TableCell>
                                <TableCell align="right">
                                    <Button
                                        color="primary"
                                        startIcon={<SaveIcon />}
                                        onClick={(event) => {
                                            showEditPage(row.id);
                                        }}
                                    >
                                        編輯
                                        </Button>
                                    <Button
                                        color="primary"
                                        startIcon={<DeleteIcon />}
                                        onClick={(event) => {
                                            if (window.confirm("確定刪除讀者？")) {
                                                deleteReader(row.id, (respose) => {
                                                    alert("成功刪除！");
                                                    props.changePage("ManageReaderPage");
                                                });
                                            }
                                        }}
                                    >
                                        刪除
                                        </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <EditReaderPage
                isDisplay={isEditPageDisplay}
                reader={reader}
                goBack={setManagePageIsDispaly}
            />

            <CreateReaderPage
                isDisplay={isCreatePageDisplay}
                goBack={setManagePageIsDispaly}
            />
        </Container>
    );
}

export default ManageReaderPage;