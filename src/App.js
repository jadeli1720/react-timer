import React, { useState, useEffect } from 'react';
import './App.scss';

function App() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // Hook that allows us to do things some of the time --> a side effect
  // First argument in useEffect hook is a callback function and the second is an array
  useEffect(() => {
    // console.log("first render", seconds);
    //when ever you do things that talk to the outside world put them in a useEffect
    if (isRunning) {
      const id = window.setInterval(() => {
        // console.log("tick", seconds)
        setSeconds(seconds => seconds + 1)//callback
      }, 1000);
      return () => window.clearInterval(id)//cleaner function that is optional but nice to have
    }
  }, [isRunning]);
  //This is a dependency array => React looks at this array to see if any data has changed. If it has, then React will execute the fallback function and update the data.
  //Empty-dependency array can't change allowing this effect to run once on page load. 


  return (
    <div className="app">
      {/* <button onClick={() => setSeconds(seconds + 1)} > inc seconds</button> */}
      <div className='time-circle'>
        <div className="time">
          {seconds}
        </div>
      </div>
      <div className="buttons">
        {isRunning
          ? (
            <button className="play-pause" 
            onClick={() => setIsRunning(false)}>
              <i className="fa fa-pause fa-2x" />
            </button>
          ) : (
            <button className="play-pause" 
            onClick={() => setIsRunning(true)}>
              <i className="fa fa-play fa-2x" />
            </button>
          )
        }
        <button 
          disabled={!isRunning}
          className="reset" onClick={() => {
          setIsRunning(false);
          setSeconds(0)
        }}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default App;
