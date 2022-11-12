import * as React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { postThreads } from '../api';
import { Box, Typography, TextField , Button, Link as MUILink } from "@mui/material";

const ThreadCreate = () => {
    const [title, setTitle] = React.useState("");
    const navigate = useNavigate();
    
    function handleChange(event) {
        setTitle(event.target.value);
    }

    function handleClick() {
        const promise = postThreads(title);
        promise.then((response) => {
            if (!response.ok) {
                console.log("投稿失敗");
            } else {
                console.log("投稿成功");
                return response.json();
            }
        }).then((json) => {
            navigate(`/thread/${json.threadId}`, {state: {title: json.title, id: json.threadId}});
        })
    }

    return (
        <Box sx={{marginTop: 8, display: "flex", flexDirection: "column", alignItems: "center"}}>
            <Typography component="h1" variant="h4">
                スレッド新規作成
            </Typography>
            <TextField id="title" label="スレッドタイトル" variant="outlined" value={title} onChange={(e) => handleChange(e)} />
            <Button fullWidth variant="contained" sx={{mt: 3, mb: 2}} onClick={handleClick}>投稿</Button>
            <MUILink component={Link} to={`/`}>Topに戻る</MUILink>
        </Box>
    );
}

export default ThreadCreate;