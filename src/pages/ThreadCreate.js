import {Link} from "react-router-dom";

const ThreadCreate = () => {
    return (
        <>
            <p>スレッド新規作成</p>
            <p>スレッドタイトル</p>
            <p><Link to={`/`}>Topに戻る</Link></p>
            <p>作成</p>
        </>
    );
}

export default ThreadCreate;