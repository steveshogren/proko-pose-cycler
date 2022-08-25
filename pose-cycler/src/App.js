import './App.css';
import { useState, useEffect } from 'react';
import lo from 'lodash';
import * as Util from './Util';

function App() {

  const defaultProgram = [{ times: 2, seconds: 5 },
  { times: 20, seconds: 6 },
  { times: 16, seconds: 300 },
  { times: 20, seconds: 600 }];

  const [history, _] = useState(lo.range(100).map(() => Util.randomImage()));

  const [bracketId, setBracketId] = useState(0);
  const [timesDone, setTimesDone] = useState(0);
  const [secondsIn, setSecondsIn] = useState(0);

  const currentBracket = defaultProgram[bracketId];
  const [pictureId, setPictureId] = useState(0);
  const [paused, setPaused] = useState(true);


  useEffect(() => {
    const timerId = setInterval(() => {
      if(!paused) {
        setSecondsIn(secondsIn + 1);
      }
      if (secondsIn >= currentBracket.seconds) {
        if (timesDone+1 >= currentBracket.times) {
          setBracketId(bracketId + 1);
          setTimesDone(0);
        } else {
          setTimesDone(timesDone + 1);
        }
        setPictureId(pictureId+1);
        setSecondsIn(1);
      }
    }, 1000);

    return () => clearInterval(timerId);
  });

  console.log("outer", secondsIn, timesDone, bracketId, "pictureId:"+pictureId);

  const topOffset = (pictureId * -100) + (((secondsIn) / currentBracket.seconds) * -100);
  console.log("topoffset: ", topOffset)


  const makePoseUrl = (h) => "..\\Poses\\" + h;
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-1">
          <div className="sidebarMask">
            <div className="h-100 p-0 sidebar" style={{ backgroundColor: 'green', top: topOffset }}>
              <ul className="p-0">
                {
                  history.map((h, k) => (<li className="thumbContainer " key={k}><img className="thumb" src={makePoseUrl(h)}></img></li>))
                }
              </ul>
            </div>
          </div>
          </div>
          <div className="col-md-11 " style={{ backgroundColor: 'blue' }}>

            <div className="topbar row" style={{ backgroundColor: 'red' }}>
              {paused?"paused":"playing"} {secondsIn}
            </div>

            <div className="row">
            <div className="col-md-"></div>
            <div className="col-md-12" onClick={()=> setPaused(!paused)}>
              <img className="w-100 h-100" src={makePoseUrl(history[pictureId])}></img>
            </div>
            <div className="col-md-"></div>
            </div>
          </div>
        </div>
    </div>
  );
}

export default App;
