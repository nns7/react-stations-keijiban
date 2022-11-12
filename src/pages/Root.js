import * as React from 'react';
import { Link } from "react-router-dom";
import { getThreads } from "../api";
import { Box, Typography, List, ListItem, ListItemText, Button } from "@mui/material";

const RootPage = () => {
  const [threadsList, setThreadsList] = React.useState(null);
  const skeletons = [...Array(10)].map((value, index) => <ListItem key={index} button divider><ListItemText primary="　" /></ListItem>)

  React.useEffect(() => {
    getThreads().then((data) => {
      setThreadsList(data);
    });
  }, [])

  function reloadThreads() {
    getThreads().then((data) => {
      setThreadsList(data);
    });
  }

  return (
    <Box sx={{marginTop: 8, display: "flex", flexDirection: "column", alignItems: "center"}}>
      <Typography component="h1" variant="h4">
        新着スレッド
      </Typography>
      <List sx={{width: "100%", maxWidth: 360, bgcolor: "background.paper"}} component="nav">
        {threadsList == null ? (
          skeletons
        ) : (
          threadsList.map((threadItem) => {
            return (
              <ListItem key={threadItem.id} button divider component={Link} to={`/thread/${threadItem.id}`} state={{title: threadItem.title, id: threadItem.id}}>
                  <ListItemText primary={threadItem.title} />
              </ListItem>
            );
          })
        )}
      </List>
      <Button fullWidth variant="contained" sx={{mt: 3, mb: 2}} onClick={reloadThreads}>更新</Button>
    </Box>
  )
}

export default RootPage;
