import { useState } from "react";

export default function useVisualMode (initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (mode, replace = false) => {
    if (replace) {
      setMode(mode);
    }
    if (!replace) {
      setMode(mode);
      setHistory((prev)=>[...prev, mode]);
    }
  };
  
  const back = () => {
    const history_copy = [...history];
    if (history_copy.length < 2) {
      setMode(history_copy[0]);
    }
    else {
      history_copy.pop()
      setHistory(history_copy);
      setMode(history_copy[history_copy.length - 1]);
    }
  };
  return { mode, transition, back };
}
  
//   function transition(mode, replace = false) { 
//     if (replace) {
//       setHistory(prev => [...prev.slice(0,prev.length-1), mode]);
//     } else {
//         setHistory(prev => [...prev, mode])
//     }
//    }
//   function back() { 
//     if (history.length < 2) {
//       return;
//     }
//     setHistory(prev => [...prev.slice(0,prev.length-1)]);
    
//   }

//   return { mode: history[history.length-1], transition, back };
  
// }