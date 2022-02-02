import React, {useState, useEffect} from 'react';
import './App.css';

import Api from './Api';

const App = () => {

  const [musicList, setMusicList] = useState([]);
  const [loading, setLoading] = useState(true);

  const getMusic = () => {
    Api.connectFetchController(
      `karaoke.json`, // path
      "GET", // method
      null, // body
      (res) => { // callback
        setMusicList(res);
        setLoading(false)
      },
      (err) => {console.error(err); } // errorCallBack    
    );

  }

  useEffect(() => {
    getMusic()
  }, [])

  return (
    <>
      {/* <Loading isLoading={loading}>로딩중...</Loading> */}
      {
        !loading && musicList.length > 0
        ? musicList.map((item, index) => {
          const {singer, title} = item || {};
          // item || {}  구조 분해 할당을 할 때 ? 대신 사용할 수 있는거
          // item?.singer 
          return (
            <>
              <h2 key={index}>[{singer}], ({title})</h2>
            </>
          )
        })
        : 
        !loading && musicList.length === 0 
        ? <p>없음</p>
        : <p>로딩중</p>
      }
    </>
  );
}

export default App;


