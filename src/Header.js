import React from "react";
import { AppBar, Toolbar, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    掲示板
                </Typography>
                <Button color="inherit" component={Link} to={`/thread/new`}>スレッドを立てる</Button>
            </Toolbar>
        </AppBar>
    );
};

export default Header;