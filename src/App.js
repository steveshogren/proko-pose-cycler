import './App.css';
import { useState, useEffect } from 'react';
import lo from 'lodash';
import * as Util from './Util';

function App() {


  const programs = [
    {
      name: 'Guesture',
      program: [{ times: 10, seconds: 30 },
      { times: 5, seconds: 60 },
      { times: 2, seconds: 300 },
      { times: 1, seconds: 600 }]
    },
    {
      name: 'Short Warm-up',
      program: [{ times: 5, seconds: 30 },
      { times: 2, seconds: 60 },
      { times: 5, seconds: 300 },
      { times: 1, seconds: 600 }]
    }
  ];

  const [currentProgram, setCurrentProgram] = useState(programs[0].program);

  const [pictureIdToTime, setPictureIdToTime] = useState([]);

  const [history, setHistory] = useState([]);
  const [secondsIn, setSecondsIn] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [pictureId, setPictureId] = useState(0);
  const [paused, setPaused] = useState(true);
  const pictureTime = pictureIdToTime[pictureId] || 600;
  const timeRemaining = lo.sum(pictureIdToTime.slice(pictureId)) - secondsIn;

  const selectProgram = (id) => {
    setCurrentProgram(programs[parseInt(id)].program);
  };

  useEffect(() => {
      if (!paused) {
        console.log("increment: ", secondsIn)
        setSecondsIn(secondsIn + 1);
      }    
      if (secondsIn >= pictureTime) {
        setPictureId(pictureId + 1);
        setSecondsIn(1);
      }
  }, [totalTime]);

  useEffect(() => {
    setPictureIdToTime(currentProgram.flatMap(template => {
      return lo.range(template.times).map(t => template.seconds);
    }));

    setHistory(lo.range(100).map(() => Util.randomImage(0)));
    setSecondsIn(0);
    setTotalTime(0);
    setPictureId(0);
    setPaused(true);

    const timerId = setInterval(() => {
      setTotalTime(totalTime => totalTime + 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [currentProgram]);

  const goForward = () => {
    setSecondsIn(1);
    setPictureId(pictureId + 1);
  }

  const jumpTo = (pictureId) => {
    setSecondsIn(1);
    setPictureId(pictureId + 1);
  }

  const goBack = () => {
    setSecondsIn(1);
    setPictureId(pictureId > 0 ? pictureId - 1 : 0);
  }


  const percentThrough = Math.abs(100 - (secondsIn / pictureTime * 100))

  const makeTime = (time) => {
    return new Date(time * 1000).toISOString().substr(14, 5)
  }
  let checkBoxCounter = 0;

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-1">
          <select onChange={(e) => selectProgram(e.target.value)} 
                  className="form-select" aria-label="Select Program">
            {programs.map((program, id) =>
              (<option value={id}>{program.name}</option>)
            )}
          </select>

          <div className="pt-2" >
            {makeTime(timeRemaining)}
          </div>
          <div className="pt-2" >
            {makeTime(secondsIn)} / {makeTime(pictureTime)}
          </div>
          <div className="pt-3" onClick={goBack}>
            <i className={"icon bi-skip-backward-fill"}></i>
          </div>
          <div className="pt-2" onClick={() => setPaused(!paused)}>
            <i key={paused + "pp"} className={"icon playPause " + (paused ? "bi-play-fill" : "bi-pause-fill")}></i>
          </div>
          <div className="pt-2" onClick={goForward}>
            <i className={"icon bi-skip-forward-fill"}></i>
          </div>
          {
            currentProgram.map((program, idx) => {
              const putBorder = idx > 0 ? "border-top border-dark" : "pt-5";
              return (
                <div key={idx} className={"row " + putBorder}>
                  <div className='px-1'>
                    {makeTime(program.seconds)}
                  </div>
                  <div className='px-1'>
                    {
                      lo.range(program.times).map((_, k) => {
                        const currentPictureId = checkBoxCounter; // boo mutation sux
                        checkBoxCounter++;
                        const icon = (currentPictureId <= pictureId ? "bi-check-square-fill" : "bi-square");
                        return (
                          <i key={k} onClick={() => { jumpTo(currentPictureId - 1) }} className={"checkIcon " + icon}></i>
                        )
                      })
                    }
                  </div>
                </div>)
            })
          }
        </div>
        <div className="col-md-11 ">

          <div className="topbar row" style={{ width: percentThrough + "%" }}>
          </div>

          <div className="row">
            <div className="col-md-12" onClick={() => setPaused(!paused)}>
              <img className="mainImage" src={history[pictureId]}></img>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
