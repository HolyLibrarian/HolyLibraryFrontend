import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Typography, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

interface NavbarProps {
    isDisplay?: boolean;
    isManager?: boolean;
    isReader?:boolean;
    changePage(page:string):void;
    logout():void;
}

const Navbar: React.FC<NavbarProps> = (props) => {
    const classes = useStyles();

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    HolyLibrary
                </Typography>
                {(props.isManager ?? false) && 
                 <Button onClick={(event) =>{ props.changePage("ManageCollectionPage") }} color="inherit">館藏管理</Button>}
                {(props.isManager ?? false) && 
                 <Button onClick={(event) =>{ props.changePage("ManageReaderPage") }} color="inherit">讀者管理</Button>}
                {(props.isManager ?? false) && 
                 <Button onClick={(event) =>{ props.changePage("BorrowCollectionPage") }} color="inherit">借閱管理</Button>}
                {(props.isReader ?? false) && 
                 <Button onClick={(event) =>{ props.changePage("ReserveCollectionPage") }} color="inherit">預訂書籍</Button>}
                {(props.isReader ?? false) && 
                 <Button onClick={(event) =>{ props.changePage("PersonalPage") }} color="inherit">借閱紀錄</Button>}
                {((props.isReader ?? false) || (props.isManager ?? false)) && 
                 <Button onClick={(event) =>{ props.logout() }} color="inherit">登出</Button>}
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;