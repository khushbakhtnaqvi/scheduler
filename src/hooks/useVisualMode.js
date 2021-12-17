import { useState } from "react";

export default function useVisualMode(initial) {
  //setting initial states
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  //transition function to transition from one mode to other
  const transition = (mode, replace = false) => {
    if (replace) {
      setMode(mode);
    };
    if (!replace) {
      setMode(mode);
      setHistory((prev) => [...prev, mode]);
    };
  };

  //back function to go to the previous state when cancel is clicked or close the error
  const back = () => {
    const history_copy = [...history];
    if (history_copy.length < 2) {
      setMode(history_copy[0]);
    } else {
      history_copy.pop()
      setHistory(history_copy);
      setMode(history_copy[history_copy.length - 1]);
    };
  };
  return { mode, transition, back };
};