import { createContext, useContext, useEffect, useRef, useState } from "react";

export const TypeContext = createContext();

const TypeProvider = ({ children }) => {
  const [time, setTime] = useState(
    parseInt(localStorage.getItem("prevSelectTime"))
      ? parseInt(localStorage.getItem("prevSelectTime"))
      : 30
  );
  const [isGameStart, setIsGameStart] = useState(false);
  const [isGameRunning, setIsGameRunning] = useState(false);
  const [isGameEnd, setIsGameEnd] = useState(false);
  const [reset, setReset] = useState(false);
  const intervalRef = useRef(null);
  const speed = useRef(0);
  const arrayWord = useRef([]);
  const [errorWord, setErrorWord] = useState(0);
  const [correctWord, setCorrectWord] = useState(0);
  const [correctChar, setCorrectChar] = useState(0);
  const [errorChar, setErrorChar] = useState(0);
  const accuracy = useRef(0);

  const handleEndTime = () => {
    setIsGameEnd(true);
  };

  useEffect(() => {
    setIsGameEnd(false);
    setIsGameRunning(false);
    setIsGameStart(false);
    speed.current = setErrorWord(0);
    setCorrectWord(0);
    setErrorChar(0);
    setCorrectChar(0);
    arrayWord.current = [];
    accuracy.current = 0;
    clearInterval(intervalRef.current);
  }, [reset]);

  const handleTimeChange = () => {
    var temp = parseInt(localStorage.getItem("prevSelectTime"));
    temp ? setTime(temp) : setTime(30);
    setReset(!reset);
  };

  const handleStart = () => {
    if (!localStorage.getItem("prevSelectTime"))
      localStorage.setItem("prevSelectTime", time);
    speed.current = 0;
    // Clear any existing interval
    clearInterval(intervalRef.current);
    // Set up a new interval
    intervalRef.current = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 1) {
          handleEndTime();
          clearInterval(intervalRef.current);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000); // Decrement every second

    setIsGameRunning(true);
    setIsGameStart(true);
    setIsGameEnd(false);
  };

  useEffect(() => {
    // Cleanup interval on component unmount
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <TypeContext.Provider
      value={{
        speed,
        time,
        setTime,
        isGameStart,
        isGameRunning,
        isGameEnd,
        setIsGameEnd,
        setIsGameRunning,
        setIsGameStart,
        handleStart,
        handleTimeChange,
        reset,
        setReset,
        arrayWord,
        errorWord,
        correctWord,
        correctChar,
        errorChar,
        setCorrectWord,
        setCorrectChar,
        setErrorWord,
        setErrorChar,
        accuracy,
      }}
    >
      {children}
    </TypeContext.Provider>
  );
};

export const TypeState = () => {
  return useContext(TypeContext);
};

export default TypeProvider;