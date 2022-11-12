import * as React from 'react';
import { Link, useLocation } from "react-router-dom";
import { getThreadPosts } from '../api';
import { postThreadPosts } from '../api';
import { Box, Typography, List, ListItem, ListItemText, Button, TextField, Link as MUILink } from "@mui/material";

const ThreadDetail = () => {
    const [postsList, setPostsList] = React.useState(null);
    const [post, setPost] = React.useState("");

    const location = useLocation();
    const threadTitle = location.state.title;
    const threadId = location.state.id;
    
    React.useEffect(() => {
        getThreadPosts(threadId).then((data) => {
          setPostsList(data.posts);
        });
      }, [threadId])

    function handleChange(event) {
        setPost(event.target.value);
    }

    function reloadThreadPosts() {
        getThreadPosts(threadId).then((data) => {
            setPostsList(data.posts);
        });
    }

    function handleClick() {
        const promise = postThreadPosts(threadId, post);
        promise.then((response) => {
            if (!response.ok) {
                console.log("投稿失敗");
            } else {
                console.log("投稿成功");
                setPost("");
                reloadThreadPosts();
            }
        })
    }

    return (
        <Box sx={{marginTop: 8, display: "flex", flexDirection: "column", alignItems: "center"}}>
            <Typography component="h1" variant="h4">
                {threadTitle}
            </Typography>
            <List sx={{width: "100%", maxWidth: 360, bgcolor: "background.paper"}} component="nav">
                {postsList == null ? (
                    <ListItem divider><ListItemText primary="読み込み中" /></ListItem>
                ) : (
                    postsList.map((post) => {
                        return (
                            <ListItem key={post.id} divider>
                                <ListItemText primary={post.post} />
                            </ListItem>
                        );
                    })
                )}
            </List>
            <TextField id="post" label="投稿しよう！" variant="outlined" value={post} onChange={(e) => handleChange(e)} />
            <Button fullWidth variant="contained" sx={{mt: 3, mb: 2}} onClick={handleClick}>投稿</Button>
            <MUILink component={Link} to={`/`}>Topに戻る</MUILink>
        </Box>
    );
}

export default ThreadDetail;