import * as React from 'react';
import { Link, useLocation } from "react-router-dom";
import { getThreadPosts } from '../api';
import { postThreadPosts } from '../api';
import { Box, Typography, List, ListItem, ListItemText, Button, TextField, Link as MUILink } from "@mui/material";

const ThreadDetail = () => {
    const [postsList, setPostsList] = React.useState(null);
    const [post, setPost] = React.useState("");
    const [offset, setOffset] = React.useState(0);

    const location = useLocation();
    const threadTitle = location.state.title;
    const threadId = location.state.id;
    
    React.useEffect(() => {
        getThreadPosts(threadId, {offset: offset}).then((data) => {
          setPostsList(data.posts);
        });
      }, [threadId, offset])

    function handleChange(event) {
        setPost(event.target.value);
    }

    function handleBack() {
        setOffset(offset - 10);
        reloadThreadPosts();
      }
    
      function handleNext() {
        setOffset(offset + 10);
        reloadThreadPosts();
      }

    function reloadThreadPosts() {
        getThreadPosts(threadId, {offset: offset}).then((data) => {
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
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button
                disabled={offset === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
                >
                    ＜前の10件
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button onClick={handleNext}>
                    次の10件＞
                </Button>
            </Box>
            <TextField id="post" label="投稿しよう！" variant="outlined" value={post} onChange={(e) => handleChange(e)} />
            <Button fullWidth variant="contained" sx={{mt: 3, mb: 2}} onClick={handleClick}>投稿</Button>
            <MUILink component={Link} to={`/`}>Topに戻る</MUILink>
        </Box>
    );
}

export default ThreadDetail;