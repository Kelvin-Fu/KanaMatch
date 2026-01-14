import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Countdown from "../components/Countdown";
import Health from "../components/Health";
import questionBank from "../questionBank";
import heart from "../images/heart (1).png";

const KanaMatch = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const questionBoxRef = useRef(null);
  const answerRefs = useRef([]);
  
  // Guard against direct navigation without state
  const { options, gamemode } = location.state || {};
  
  React.useEffect(() => {
    if (!options || !gamemode) {
      navigate('/');
    }
  }, [options, gamemode, navigate]);

  const [progress, setProgress] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30000);
  const [randomAns, setRandomAns] = useState([]); //generate random order answer box
  const [kanaToRo, setKanaToRo] = useState(true);
  const [hiraKana, setHiraKana] = useState(0);
  const [randomNumbers, setRandomNumbers] = useState([]); //Random numbers array to decide which question to ask
  const [maxScore, setMaxScore] = useState(46);
  const [health, setHealth] = useState(3);
  const [showPopup, setShowPopup] = useState(false);
  const [addSecond, setAddSecond] = useState(false);

  const getRandomAnswer = (count, max, ans, min = 0) => {
    const numbers = Array.from({ length: max - min + 1 }, (_, index) => index + min);
    const filteredNumbers = numbers.filter((num) => num !== ans);
    for (let i = filteredNumbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [filteredNumbers[i], filteredNumbers[j]] = [filteredNumbers[j], filteredNumbers[i]];
    }
    const selectedNumbers = filteredNumbers.slice(0, count - 1);
    selectedNumbers.push(ans);
    for (let i = selectedNumbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [selectedNumbers[i], selectedNumbers[j]] = [selectedNumbers[j], selectedNumbers[i]];
    }
    return selectedNumbers;
  };

  const generateRandomArray = () => {
    // Options: [Hiragana, Katakana, Dakuon, Yōon]
    // Question bank ranges: Basic (0-45), Dakuon (46-70), Yōon (71-103)
    let questionIndices = [];
    
    // Determine which categories to include
    const includeDakuon = options[2] === 1;
    const includeYoon = options[3] === 1;
    
    // If neither Dakuon nor Yōon is selected, use basic kana (0-45)
    // If only Dakuon, use only Dakuon (46-70)
    // If only Yōon, use only Yōon (71-103)
    // If both, combine them
    // If Dakuon/Yōon with neither Hira/Kata explicitly selected, still show whichever categories are picked
    
    if (!includeDakuon && !includeYoon) {
      // Only basic kana
      for (let i = 0; i <= 45; i++) questionIndices.push(i);
    } else {
      if (includeDakuon) {
        // Dakuon: indices 46-70
        for (let i = 46; i <= 70; i++) questionIndices.push(i);
      }
      if (includeYoon) {
        // Yōon: indices 71-103
        for (let i = 71; i <= 103; i++) questionIndices.push(i);
      }
    }
    
    // Shuffle the array using Fisher-Yates algorithm
    for (let i = questionIndices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [questionIndices[i], questionIndices[j]] = [questionIndices[j], questionIndices[i]];
    }
    
    setRandomNumbers(questionIndices);
    setMaxScore(questionIndices.length);
  };
  //generate random number array based on selected options and set MaxScore
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    generateRandomArray();
  }, []);

  //Generate Question everytime progress +1
  useEffect(() => {
    if (progress === maxScore) {
      setShowPopup(true);
    }
    if (randomNumbers.length > 0 && progress < randomNumbers.length) {
      const questionIndex = randomNumbers[progress];
      let kaToRo = true;
      //decide the gamemode and hira/kata
      if ((gamemode === 1 && Math.floor(Math.random() * 2) === 1) || gamemode === 2) {
        setKanaToRo(true);
        kaToRo = true;
      } else {
        setKanaToRo(false);
        kaToRo = false;
      }

      if (questionIndex < questionBank.length) {
        //decide hiragana or katakana or romanji as question based on selected options
        if (kaToRo) {
          // options[0] = Hiragana, options[1] = Katakana
          if (options[0] === -1 && options[1] === 1) {
            setCurrentQuestion(questionBank[questionIndex].Katakana);
          } else if (options[0] === 1 && options[1] === 1) {
            let randomNum = Math.floor(Math.random() * 2);
            setHiraKana(randomNum);
            randomNum === 1 ? setCurrentQuestion(questionBank[questionIndex].Hiragana) : setCurrentQuestion(questionBank[questionIndex].Katakana);
          } else {
            // Default to Hiragana if nothing selected or only Hiragana
            setCurrentQuestion(questionBank[questionIndex].Hiragana);
          }
        } else {
          setCurrentQuestion(questionBank[questionIndex].Romanji);
        }

        // Get answer options from appropriate range based on question category
        const maxRange = questionIndex < 46 ? 45 : (questionIndex < 71 ? 70 : 103);
        const minRange = questionIndex < 46 ? 0 : (questionIndex < 71 ? 46 : 71);
        const randomAnswer = getRandomAnswer(4, maxRange, questionIndex, minRange);
        setRandomAns(randomAnswer);
      } else {
        console.error("Question index is out of range");
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [randomNumbers, progress]);

  useEffect(() => {
    if (timeLeft <= 0 || health === 0) {
      setShowPopup(true);
      return;
    }
  }, [timeLeft, health]);

  //decides if its kana to romanji or romanji to kana
  const getAnswerText = (index) => {
    // options[0] = Hiragana, options[1] = Katakana
    if (options[0] === -1 && options[1] === 1) {
      return kanaToRo ? questionBank[index].Romanji : questionBank[index].Katakana;
    } else if (options[0] === 1 && options[1] === 1) {
      if (kanaToRo) {
        return questionBank[index].Romanji;
      } else {
        return hiraKana === 0 ? questionBank[index].Hiragana : questionBank[index].Katakana;
      }
    } else {
      // Default to Hiragana
      return kanaToRo ? questionBank[index].Romanji : questionBank[index].Hiragana;
    }
  };

  const formatTime = (time) => {
    const minutes = String(Math.floor(time / 60000)).padStart(2, "0");
    const seconds = String(Math.floor((time % 60000) / 1000)).padStart(2, "0");
    const milliseconds = String(Math.floor((time % 1000) / 10)).padStart(2, "0");
    return `${minutes}:${seconds}:${milliseconds}`;
  };

  const reset = () => {
    setTimeout(() => {
      Object.values(answerRefs.current).forEach((el) => {
        if (el) {
          el.style.border = "3px solid black";
          el.style.backgroundColor = "";
          el.style.color = "black";
        }
      });
    }, 300);
  };

  //check if correct answer are selected
  const checkAnswer = (ansIndex, e) => {
    // Prevent interaction if game is over
    if (timeLeft <= 0 || health <= 0) return;

    if (ansIndex === randomNumbers[progress]) {
      animateQuestionBoxToAnswer(ansIndex);
      setProgress((prevProgress) => prevProgress + 1);
      setTimeLeft(timeLeft + 3000);
      setAddSecond(true);
      setTimeout(() => {
        setAddSecond(false);
      }, 1000);
      e.target.style.color = "green";
      e.target.style.border = "3px solid green";
      e.target.style.backgroundColor = "rgb(214, 242, 215)";
      reset();
    } else {
      animateQuestionBoxToAnswer(ansIndex);
      shake(ansIndex);
      e.target.style.border = "3px solid red";
      e.target.style.color = "red";
      if (health > 0) {
        setHealth(health - 1);
      }
    }
  };

  const shake = (index) => {
    const answerBox = answerRefs.current[index];
    answerBox.classList.add("shake");
    setTimeout(() => {
      answerBox.classList.remove("shake");
    }, 500);
  };

  const animateQuestionBoxToAnswer = (answerIdx) => {
    const questionBox = questionBoxRef.current;
    const answerBox = answerRefs.current[answerIdx];

    const questionRect = questionBox.getBoundingClientRect();
    const answerRect = answerBox.getBoundingClientRect();

    // Create clone
    const clone = questionBox.cloneNode(true);
    document.body.appendChild(clone);

    // Set initial styles for clone
    Object.assign(clone.style, {
      position: "absolute",
      top: `${questionRect.top}px`,
      left: `${questionRect.left}px`,
      width: `${questionRect.width}px`,
      height: `${questionRect.height}px`,
      margin: 0,
      zIndex: 1000,
      transition: "all 0.3s ease-in-out",
    });

    // Force reflow to ensure the transition will happen
    clone.getBoundingClientRect();

    // Set final styles for clone to animate
    Object.assign(clone.style, {
      top: `${answerRect.top}px`,
      left: `${answerRect.left}px`,
      width: `18vh`,
      height: `18vh`,
      opacity: 0,
      transform: "scale(1)",
    });

    // Remove clone after animation
    setTimeout(() => {
      document.body.removeChild(clone);
    }, 500);
  };

  const msgbox = () => {
    if (timeLeft <= 0) {
      return (
        <React.Fragment>
          <h1>Times Up!</h1>
          <hr></hr>
          <p>The clock ran out, but hey, who’s counting? (Oh wait, we were...)</p>
          <p>
            You've completed <strong style={{ color: "green" }}>{progress}</strong> out of <strong style={{ color: "green" }}>{maxScore}</strong> question with <strong style={{ color: "red" }}>{health}</strong> <img src={heart} alt="heart" width={"15px"} /> remaining.
          </p>
          <p>Wanna give it another go?</p>
        </React.Fragment>
      );
    } else if (health === 0) {
      return (
        <React.Fragment>
          <h1>Game Over!</h1>
          <hr></hr>
          <p>But hey, at least you don’t have to wait in line to play again.</p>
          <p>
            You've completed <strong style={{ color: "green" }}>{progress}</strong> out of <strong style={{ color: "green" }}>{maxScore}</strong> question with <strong style={{ color: "blue" }}>{formatTime(timeLeft)}</strong> remaining.
          </p>
          <p>Up for another round?</p>
        </React.Fragment>
      );
    } else if (progress === maxScore) {
      return (
        <React.Fragment>
          <h1>Congrats, You Did It!</h1>
          <hr></hr>
          <p>Congratulations! You beat the game! </p>
          <p>
            You've completed <strong style={{ color: "green" }}>{progress}</strong> out of <strong style={{ color: "green" }}>{maxScore}</strong> question with <strong style={{ color: "blue" }}>{formatTime(timeLeft)}</strong> and <strong style={{ color: "red" }}>{health}</strong> <img src={heart} alt="heart" width={"15px"} /> remaining.
          </p>
          <p>Now, what will you do with all this free time?</p>
        </React.Fragment>
      );
    } else {
      return "something went wrong. Please try again.";
    }
  };

  return (
    <div>
      <div className="topPart">
        <div className="healthprogress">
          <Health health={health} />
          <div className="progress-container">
            <div className="progress" style={{ width: `${(progress * 100) / maxScore}%` }}></div>
            <div className="progressNum">{progress}</div>
          </div>
        </div>
        <div className="question" ref={questionBoxRef}>
          <p>{currentQuestion}</p>
        </div>
        <Countdown timeLeft={timeLeft} setTimeLeft={setTimeLeft} formatTime={formatTime} addSecond={addSecond} health={health} progress={progress} maxScore={maxScore} />
      </div>
      <div className="answers">
        {randomAns.map((index, idx) => (
          <button
            key={idx}
            id={`answer-${index}`}
            ref={(el) => (answerRefs.current[index] = el)}
            onClick={(e) => {
              checkAnswer(index, e);
            }}
          >
            {getAnswerText(index)}
          </button>
        ))}
      </div>
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <div>{msgbox()}</div>
            <button
              onClick={() => {
                setShowPopup(false);
                setProgress(0);
                generateRandomArray();
                setTimeLeft(30000);
                setHealth(3);
                reset();
              }}
            >
              Try Again
            </button>
            <button
              onClick={() => {
                setShowPopup(false);
                navigate("/");
              }}
              style={{ backgroundColor: "rgb(210, 60, 60)" }}
            >
              Quit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default KanaMatch;
