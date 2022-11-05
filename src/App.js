import * as React from 'react';
import './App.css';

const App = () => {
  const [threadsList, setThreadsList] = React.useState(null);

  async function fetchThreadsList() {
    const response = await fetch(
      'http://railway-react-bulletin-board.herokuapp.com/threads'
    );
    const data = await response.json();
    return data;
  }

  React.useEffect(() => {
    fetchThreadsList().then((data) => {
      setThreadsList(data);
    });
  }, [])

  function reloadThreads() {
    fetchThreadsList().then((data) => {
      setThreadsList(data);
    });
  }

  return (
    <div>
      <p>掲示板</p>
      <p>スレッドを立てる</p>
      <p>新着スレッド</p>
      <ul>
        {threadsList == null ? (
          <li>更新ボタンを押してください。</li>
        ) : (
          threadsList.map((threadItem) => {
            return (
              <li>{threadItem.title}</li>
            );
          })
        )}
      </ul>
      <p>
        <button type='button' onClick={reloadThreads}>更新</button>
      </p>
    </div>
  )
}

export default App;
