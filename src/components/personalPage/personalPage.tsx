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
        minWidth: 650,
    }
}));

interface PesonalPageProps {
    isDisplay?: boolean;
    isBorrowRecordDisplay?: boolean;
}

function createData(name: any, calories: any, fat: any, carbs: any, protein: any) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const PersonalPage: React.FC<PesonalPageProps> = (props) => {
    const classes = useStyles();

    return (
        <Container component="main" maxWidth="sm" style={props.isDisplay ? {} : { display: 'none' }}>
            <div className={classes.paper}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} alignContent="space-around">
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            查詢借閱紀錄
                    </Button>
                    </Grid>
                </Grid>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Dessert (100g serving)</TableCell>
                                <TableCell align="right">Calories</TableCell>
                                <TableCell align="right">Fat&nbsp;(g)</TableCell>
                                <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                                <TableCell align="right">Protein&nbsp;(g)</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow key={row.name}>
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="right">{row.calories}</TableCell>
                                    <TableCell align="right">{row.fat}</TableCell>
                                    <TableCell align="right">{row.carbs}</TableCell>
                                    <TableCell align="right">{row.protein}</TableCell>
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