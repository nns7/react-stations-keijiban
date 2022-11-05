import {Link} from "react-router-dom";

const ThreadDetail = () => {
    return (
        <>
            <p>スレッド詳細</p>
            <p>投稿しよう！</p>
            <p><Link to={`/`}>Topに戻る</Link></p>
            <p>投稿</p>
        </>
    );
}

export default ThreadDetail;