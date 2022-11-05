import * as React from 'react';
import {Link, useLocation} from "react-router-dom";
import { getThreadPosts } from '../api';

const ThreadDetail = () => {
    const [postsList, setPostsList] = React.useState(null);
    const location = useLocation();
    const threadTitle = location.state.title;
    const threadId = location.state.id;
    
    React.useEffect(() => {
        getThreadPosts(threadId).then((data) => {
          setPostsList(data.posts);
        });
      }, [threadId])

    return (
        <>
            <p>{threadTitle}</p>
            {postsList == null ? (
                <p>読み込み中</p>
            ) : (
                postsList.map((post) => {
                    return (
                        <li>{post.post}</li>
                    );
                })
            )}
            <p>投稿しよう！</p>
            <p><Link to={`/`}>Topに戻る</Link></p>
            <p>投稿</p>
        </>
    );
}

export default ThreadDetail;