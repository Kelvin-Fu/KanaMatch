import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Countdown from "../components/Countdown";
import Health from "../components/Health";
const KanaMatch = () => {
  const location = useLocation();
  const { options, gamemode } = location.state || {};

  //0-45 Basic, 46-70 dakuon , 71-103 Yoon
  const questionBank = [
    {
      Hiragana: "あ",
      Katakana: "ア",
      Romanji: "a",
    },
    {
      Hiragana: "い",
      Katakana: "イ",
      Romanji: "i",
    },
    {
      Hiragana: "う",
      Katakana: "ウ",
      Romanji: "u",
    },
    {
      Hiragana: "え",
      Katakana: "エ",
      Romanji: "e",
    },
    {
      Hiragana: "お",
      Katakana: "オ",
      Romanji: "o",
    },
    {
      Hiragana: "か",
      Katakana: "カ",
      Romanji: "ka",
    },
    {
      Hiragana: "き",
      Katakana: "キ",
      Romanji: "ki",
    },
    {
      Hiragana: "く",
      Katakana: "ク",
      Romanji: "ku",
    },
    {
      Hiragana: "け",
      Katakana: "ケ",
      Romanji: "ke",
    },
    {
      Hiragana: "こ",
      Katakana: "コ",
      Romanji: "ko",
    },
    {
      Hiragana: "さ",
      Katakana: "サ",
      Romanji: "sa",
    },
    {
      Hiragana: "し",
      Katakana: "シ",
      Romanji: "shi",
    },
    {
      Hiragana: "す",
      Katakana: "ス",
      Romanji: "su",
    },
    {
      Hiragana: "せ",
      Katakana: "セ",
      Romanji: "se",
    },
    {
      Hiragana: "そ",
      Katakana: "ソ",
      Romanji: "so",
    },
    {
      Hiragana: "た",
      Katakana: "タ",
      Romanji: "ta",
    },
    {
      Hiragana: "ち",
      Katakana: "チ",
      Romanji: "chi",
    },
    {
      Hiragana: "つ",
      Katakana: "ツ",
      Romanji: "tsu",
    },
    {
      Hiragana: "て",
      Katakana: "テ",
      Romanji: "te",
    },
    {
      Hiragana: "と",
      Katakana: "ト",
      Romanji: "to",
    },
    {
      Hiragana: "な",
      Katakana: "ナ",
      Romanji: "na",
    },
    {
      Hiragana: "に",
      Katakana: "ニ",
      Romanji: "ni",
    },
    {
      Hiragana: "ぬ",
      Katakana: "ヌ",
      Romanji: "nu",
    },
    {
      Hiragana: "ね",
      Katakana: "ネ",
      Romanji: "ne",
    },
    {
      Hiragana: "の",
      Katakana: "ノ",
      Romanji: "no",
    },
    {
      Hiragana: "ん",
      Katakana: "ン",
      Romanji: "n",
    },
    {
      Hiragana: "は",
      Katakana: "ハ",
      Romanji: "ha",
    },
    {
      Hiragana: "ひ",
      Katakana: "ヒ",
      Romanji: "hi",
    },
    {
      Hiragana: "ふ",
      Katakana: "フ",
      Romanji: "fu",
    },
    {
      Hiragana: "へ",
      Katakana: "ヘ",
      Romanji: "he",
    },
    {
      Hiragana: "ほ",
      Katakana: "ホ",
      Romanji: "ho",
    },
    {
      Hiragana: "ま",
      Katakana: "マ",
      Romanji: "ma",
    },
    {
      Hiragana: "み",
      Katakana: "ミ",
      Romanji: "mi",
    },
    {
      Hiragana: "む",
      Katakana: "ム",
      Romanji: "mu",
    },
    {
      Hiragana: "め",
      Katakana: "メ",
      Romanji: "me",
    },
    {
      Hiragana: "も",
      Katakana: "モ",
      Romanji: "mo",
    },
    {
      Hiragana: "や",
      Katakana: "ヤ",
      Romanji: "ya",
    },
    {
      Hiragana: "ゆ",
      Katakana: "ユ",
      Romanji: "yu",
    },
    {
      Hiragana: "よ",
      Katakana: "ヨ",
      Romanji: "yo",
    },
    {
      Hiragana: "ら",
      Katakana: "ラ",
      Romanji: "ra",
    },
    {
      Hiragana: "り",
      Katakana: "リ",
      Romanji: "ri",
    },
    {
      Hiragana: "る",
      Katakana: "ル",
      Romanji: "ru",
    },
    {
      Hiragana: "れ",
      Katakana: "レ",
      Romanji: "re",
    },
    {
      Hiragana: "ろ",
      Katakana: "ロ",
      Romanji: "ro",
    },
    {
      Hiragana: "わ",
      Katakana: "ワ",
      Romanji: "wa",
    },
    {
      Hiragana: "を",
      Katakana: "ヲ",
      Romanji: "wo",
    },
    {
      Hiragana: "が",
      Katakana: "ガ",
      Romanji: "ga",
    },
    {
      Hiragana: "ぎ",
      Katakana: "ギ",
      Romanji: "gi",
    },
    {
      Hiragana: "ぐ",
      Katakana: "グ",
      Romanji: "gu",
    },
    {
      Hiragana: "げ",
      Katakana: "ゲ",
      Romanji: "ge",
    },
    {
      Hiragana: "ご",
      Katakana: "ゴ",
      Romanji: "go",
    },
    {
      Hiragana: "ざ",
      Katakana: "ザ",
      Romanji: "za",
    },
    {
      Hiragana: "じ",
      Katakana: "ジ",
      Romanji: "ji",
    },
    {
      Hiragana: "ず",
      Katakana: "ズ",
      Romanji: "zu",
    },
    {
      Hiragana: "ぜ",
      Katakana: "ゼ",
      Romanji: "ze",
    },
    {
      Hiragana: "ぞ",
      Katakana: "ゾ",
      Romanji: "zo",
    },
    {
      Hiragana: "だ",
      Katakana: "ダ",
      Romanji: "da",
    },
    {
      Hiragana: "ぢ",
      Katakana: "ヂ",
      Romanji: "ji",
    },
    {
      Hiragana: "づ",
      Katakana: "ヅ",
      Romanji: "zu",
    },
    {
      Hiragana: "で",
      Katakana: "デ",
      Romanji: "de",
    },
    {
      Hiragana: "ど",
      Katakana: "ド",
      Romanji: "do",
    },
    {
      Hiragana: "ば",
      Katakana: "バ",
      Romanji: "ba",
    },
    {
      Hiragana: "び",
      Katakana: "ビ",
      Romanji: "bi",
    },
    {
      Hiragana: "ぶ",
      Katakana: "ブ",
      Romanji: "bu",
    },
    {
      Hiragana: "べ",
      Katakana: "ベ",
      Romanji: "be",
    },
    {
      Hiragana: "ぼ",
      Katakana: "ボ",
      Romanji: "bo",
    },
    {
      Hiragana: "ぱ",
      Katakana: "パ",
      Romanji: "pa",
    },
    {
      Hiragana: "ぴ",
      Katakana: "ピ",
      Romanji: "pi",
    },
    {
      Hiragana: "ぷ",
      Katakana: "プ",
      Romanji: "pu",
    },
    {
      Hiragana: "ぺ",
      Katakana: "ペ",
      Romanji: "pe",
    },
    {
      Hiragana: "ぽ",
      Katakana: "ポ",
      Romanji: "po",
    },
    {
      Hiragana: "きゃ",
      Katakana: "キャ",
      Romanji: "kya",
    },
    {
      Hiragana: "きゅ",
      Katakana: "キュ",
      Romanji: "kyu",
    },
    {
      Hiragana: "きょ",
      Katakana: "キョ",
      Romanji: "kyo",
    },
    {
      Hiragana: "しゃ",
      Katakana: "シャ",
      Romanji: "sha",
    },
    {
      Hiragana: "しゅ",
      Katakana: "シュ",
      Romanji: "shu",
    },
    {
      Hiragana: "しょ",
      Katakana: "ショ",
      Romanji: "sho",
    },
    {
      Hiragana: "ちゃ",
      Katakana: "チャ",
      Romanji: "cha",
    },
    {
      Hiragana: "ちゅ",
      Katakana: "チュ",
      Romanji: "chu",
    },
    {
      Hiragana: "ちょ",
      Katakana: "チョ",
      Romanji: "cho",
    },
    {
      Hiragana: "にゃ",
      Katakana: "ニャ",
      Romanji: "nya",
    },
    {
      Hiragana: "にゅ",
      Katakana: "ニュ",
      Romanji: "nyu",
    },
    {
      Hiragana: "にょ",
      Katakana: "ニョ",
      Romanji: "nyo",
    },
    {
      Hiragana: "ひゃ",
      Katakana: "ヒャ",
      Romanji: "hya",
    },
    {
      Hiragana: "ひゅ",
      Katakana: "ヒュ",
      Romanji: "hyu",
    },
    {
      Hiragana: "ひょ",
      Katakana: "ヒョ",
      Romanji: "hyo",
    },
    {
      Hiragana: "みゃ",
      Katakana: "ミャ",
      Romanji: "mya",
    },
    {
      Hiragana: "みゅ",
      Katakana: "ミュ",
      Romanji: "myu",
    },
    {
      Hiragana: "みょ",
      Katakana: "ミョ",
      Romanji: "myo",
    },
    {
      Hiragana: "りゃ",
      Katakana: "リャ",
      Romanji: "rya",
    },
    {
      Hiragana: "りゅ",
      Katakana: "リュ",
      Romanji: "ryu",
    },
    {
      Hiragana: "りょ",
      Katakana: "リョ",
      Romanji: "ryo",
    },
    {
      Hiragana: "ぎゃ",
      Katakana: "ギャ",
      Romanji: "gya",
    },
    {
      Hiragana: "ぎゅ",
      Katakana: "ギュ",
      Romanji: "gyu",
    },
    {
      Hiragana: "ぎょ",
      Katakana: "ギョ",
      Romanji: "gyo",
    },
    {
      Hiragana: "じゃ",
      Katakana: "ジャ",
      Romanji: "ja",
    },
    {
      Hiragana: "じゅ",
      Katakana: "ジュ",
      Romanji: "ju",
    },
    {
      Hiragana: "じょ",
      Katakana: "ジョ",
      Romanji: "jo",
    },
    {
      Hiragana: "びゃ",
      Katakana: "ビャ",
      Romanji: "bya",
    },
    {
      Hiragana: "びゅ",
      Katakana: "ビュ",
      Romanji: "byu",
    },
    {
      Hiragana: "びょ",
      Katakana: "ビョ",
      Romanji: "byo",
    },
    {
      Hiragana: "ぴゃ",
      Katakana: "ピャ",
      Romanji: "pya",
    },
    {
      Hiragana: "ぴゅ",
      Katakana: "ピュ",
      Romanji: "pyu",
    },
    {
      Hiragana: "ぴょ",
      Katakana: "ピョ",
      Romanji: "pyo",
    },
  ];

  const [progress, setProgress] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30000);
  const [randomAns, setRandomAns] = useState([]); //generate random order answer box
  const [kanaToRo, setKanaToRo] = useState(true);
  const [hiraKana, setHiraKana] = useState(0);
  const [randomNumbers, setRandomNumbers] = useState([]); //Random numbers array to decide which question to ask
  const [maxScore, setMaxScore] = useState(46);
  const [health, setHealth] = useState(3);

  const getRandomNumbers = (count, max) => {
    // Step 1: Create an array with numbers from 0 to max
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
  //generate random number array based on selected options and set MaxScore
  useEffect(() => {
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
  }, []);

  //Generate Question everytime progress +1
  useEffect(() => {
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

  //check if correct answer are selected
  const checkAnswer = (ansIndex) => {
    if (ansIndex === randomNumbers[progress]) {
      setProgress((prevProgress) => prevProgress + 1);
      setTimeLeft(timeLeft + 3000);
    } else {
      if (health > 0) {
        setHealth(health - 1);
      }
      //lose hearts
    }
  };

  return (
    <div style={{ minHeight: "90vh" }}>
      <div className="topPart">
        <div className="question">
          <p>{currentQuestion}</p>
        </div>
        <div className="elements">
          <Health health={health} />
          <div class="progress-container">
            <div className="progress" style={{ width: `${(progress * 100) / maxScore}%` }}></div>
            <div className="progressNum">{progress}</div>
          </div>

          <Countdown timeLeft={timeLeft} setTimeLeft={setTimeLeft} />
        </div>
      </div>

      <div className="answers">
        {randomAns.map((index, idx) => (
          <button
            key={idx}
            onClick={() => {
              checkAnswer(index);
            }}
          >
            {getAnswerText(index)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default KanaMatch;
