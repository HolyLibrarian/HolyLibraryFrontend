import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {
    Container, TableContainer, Table, TableHead, TableCell, TableRow, TableBody,
    Paper, Button, Grid
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import { deleteCollection, getCollectionById } from '../../apis/collection'
import EditCollectionPage from '../editCollectionPage/editCollectionPage'
import CreateCollectionPage from '../createCollectionPage/createCollectionPage'

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

interface ManageCollectionPageProps {
    rows: any;
    isDisplay?: boolean;
    changePage(page: string): void;
}

const ManageCollectionPage: React.FC<ManageCollectionPageProps> = (props) => {
    const classes = useStyles();
    const [isDisplay, setIsDisplay] = useState(true);
    const [isEditPageDisplay, setIsEditPageDisplay] = useState(false);
    const [isCreatePageDisplay, setIsCreatePageDisplay] = useState(false);
    const [collection, setCollection] = useState();

    const setManagePageIsDispaly = () => {
        props.changePage("ManageCollectionPage");
        setIsDisplay(true);
        setIsEditPageDisplay(false);
        setIsCreatePageDisplay(false);
    }

    const getCollection = async (collectionId: string) => {
        var token = localStorage.getItem('token');
        if (token == null) {
            return [];
        }
        const collection = await getCollectionById(token, collectionId) as any;

        return collection
    }

    const showEditPage = (userId: string) => {
        (async function () {
            setCollection(await getCollection(userId));
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
                                            showEditPage(row.id);
                                        }}
                                    >
                                        編輯
                                        </Button>
                                    <Button
                                        color="primary"
                                        startIcon={<DeleteIcon />}
                                        onClick={(event) => {
                                            if (window.confirm("確定刪除館藏？")) {
                                                deleteCollection(row.id, (respose) => {
                                                    alert("成功刪除！");
                                                    props.changePage("ManageCollectionPage");
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

            <EditCollectionPage
                isDisplay={isEditPageDisplay}
                collection={collection}
                goBack={setManagePageIsDispaly}
            />

            <CreateCollectionPage
                isDisplay={isCreatePageDisplay}
                goBack={setManagePageIsDispaly}
            />
        </Container>
    );
}

export default ManageCollectionPage;