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
  const { options, gamemode } = location.state || {};
  const answerRefs = useRef([]);

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

  const getRandomNumbers = (count, max) => {
    const numbers = Array.from({ length: max + 1 }, (_, index) => index);

    // Step 2: Shuffle the array using Fisher-Yates algorithm
    for (let i = numbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]]; // Swap elements
    }

    // Step 3: Select the first 'count' numbers from the shuffled array
    return numbers.slice(0, count);
  };

  const getRandomAnswer = (count, max, ans) => {
    const numbers = Array.from({ length: max + 1 }, (_, index) => index);
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
    if (options[2] === -1 && options[3] === -1) {
      setRandomNumbers(getRandomNumbers(46, 45));
    } else if (options[2] === 1 && options[3] === 1) {
      setRandomNumbers(getRandomNumbers(104, 103));
      setMaxScore(104);
    } else if (options[2] === 1 && options[3] === -1) {
      setRandomNumbers(getRandomNumbers(71, 70));
      setMaxScore(71);
    } else if (options[2] === -1 && options[3] === 1) {
      let firstHalf = getRandomNumbers(46, 45);
      let secondHalf = getRandomNumbers(33, 32).map((value) => (value += 71));
      let sumArr = firstHalf.concat(secondHalf);
      for (let i = sumArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [sumArr[i], sumArr[j]] = [sumArr[j], sumArr[i]]; // Swap elements
      }
      setRandomNumbers(sumArr);
      setMaxScore(79);
    }
  };
  //generate random number array based on selected options and set MaxScore
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
          if (options[0] === -1 && options[1] === 1) {
            setCurrentQuestion(questionBank[questionIndex].Katakana);
          } else if (options[0] === 1 && options[1] === 1) {
            let randomNum = Math.floor(Math.random() * 2);
            setHiraKana(randomNum);
            randomNum === 1 ? setCurrentQuestion(questionBank[questionIndex].Hiragana) : setCurrentQuestion(questionBank[questionIndex].Katakana);
          } else {
            setCurrentQuestion(questionBank[questionIndex].Hiragana);
          }
        } else {
          setCurrentQuestion(questionBank[questionIndex].Romanji);
        }

        const randomAnswer = getRandomAnswer(4, 45, questionIndex);
        setRandomAns(randomAnswer);
      } else {
        console.error("Question index is out of range");
      }
    }
  }, [randomNumbers, progress]);

  useEffect(() => {
    if (timeLeft <= 0 || health === 0) {
      setShowPopup(true);
      return;
    }
  }, [timeLeft, health]);

  //decides if its kana to romanji or romanji to kana
  const getAnswerText = (index) => {
    if (options[0] === -1 && options[1] === 1) {
      return kanaToRo ? questionBank[index].Romanji : questionBank[index].Katakana;
    } else if (options[0] === 1 && options[1] === 1) {
      if (kanaToRo) {
        return questionBank[index].Romanji;
      } else {
        return hiraKana === 0 ? questionBank[index].Hiragana : questionBank[index].Katakana;
      }
    } else {
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
    const answerDivs = document.querySelectorAll(".answers button");
    setTimeout(() => {
      answerDivs.forEach((div) => {
        div.style.border = "3px solid black";
        div.style.backgroundColor = "";
        div.style.color = "black";
      });
    }, 300);
  };

  //check if correct answer are selected
  const checkAnswer = (ansIndex, e) => {
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
