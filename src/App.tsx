import { useEffect, useState } from "react";

export default function App() {

  const [screen, setScreen] = useState("lobby");

  const [playerName, setPlayerName] = useState("");

  const [questionIndex, setQuestionIndex] = useState(0);

  const [score, setScore] = useState(0);

  const [timeLeft, setTimeLeft] = useState(15);

  const [musicOn, setMusicOn] = useState(true);

  const [newQuestion, setNewQuestion] = useState("");

  const [newImage, setNewImage] = useState("");

  const [newChoices, setNewChoices] = useState([
    "",
    "",
    "",
    "",
  ]);

  const [newAnswer, setNewAnswer] = useState(0);

  const [questions, setQuestions] = useState([
    {
      type: "multiple",
      question: "ต้องสวม PPE เมื่อใด?",
      image:
        "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1200&auto=format&fit=crop",
      choices: [
        "ทุกครั้งที่มีความเสี่ยง",
        "เฉพาะตอนตรวจ",
        "เฉพาะหัวหน้าอยู่",
        "หลังเกิดเหตุ",
      ],
      answer: 0,
    },
  ]);

  const currentQuestion = questions[questionIndex];

  useEffect(() => {

    if (screen !== "quiz") return;

    if (timeLeft <= 0) {

      setScreen("ranking");

      return;
    }

    const timer = setTimeout(() => {

      setTimeLeft(timeLeft - 1);

    }, 1000);

    return () => clearTimeout(timer);

  }, [timeLeft, screen]);

  useEffect(() => {

    if (!musicOn) return;

    const music = new Audio(
      "https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3?filename=upbeat-11254.mp3"
    );

    music.volume = 0.15;

    music.loop = true;

    music.play().catch(() => {});

    return () => {
      music.pause();
    };

  }, [musicOn]);

  function addQuestion() {

    if (!newQuestion) return;

    const newQ = {
      type: "multiple",
      question: newQuestion,
      image: newImage,
      choices: newChoices,
      answer: newAnswer,
    };

    setQuestions([...questions, newQ]);

    setNewQuestion("");

    setNewImage("");

    setNewChoices([
      "",
      "",
      "",
      "",
    ]);

    setNewAnswer(0);

    alert("เพิ่มคำถามสำเร็จ");
  }

  function answerQuestion(index: number) {

    const correct = index === currentQuestion.answer;

    if (correct) {

      const audio = new Audio(
        "https://www.soundjay.com/buttons/sounds/button-3.mp3"
      );

      audio.play();

      setScore(score + 100);

    } else {

      const audio = new Audio(
        "https://www.soundjay.com/buttons/sounds/button-10.mp3"
      );

      audio.play();
    }

    setScreen("ranking");
  }

  function nextQuestion() {

    if (questionIndex + 1 >= questions.length) {

      setScreen("final");

      return;
    }

    setQuestionIndex(questionIndex + 1);

    setTimeLeft(15);

    setScreen("quiz");
  }

  return (

    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-100 p-6">

      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-10">

          <h1 className="text-7xl font-black">
            🛡️ TheOneSafetyTraining
          </h1>

          <p className="text-3xl text-gray-600 mt-4">
            Safety Quiz Platform
          </p>

        </div>

        {screen === "lobby" && (

          <div className="grid md:grid-cols-2 gap-6">

            <div className="bg-white rounded-3xl shadow-2xl p-8">

              <h2 className="text-5xl font-black mb-8">
                🚀 Join Game
              </h2>

              <div className="bg-yellow-100 p-5 rounded-3xl mb-6 text-center">

                <p className="text-2xl font-black mb-3">
                  📱 เข้าเล่นจากมือถือ
                </p>

                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${window.location.href}`}
                  alt="QR"
                  className="mx-auto rounded-2xl"
                />

              </div>

              <input
                type="text"
                placeholder="กรอกชื่อผู้เล่น"
                value={playerName}
                onChange={(e) =>
                  setPlayerName(e.target.value)
                }
                className="w-full p-5 rounded-2xl border text-2xl mb-5"
              />

              <button
                onClick={() => setScreen("quiz")}
                className="w-full bg-black text-white text-3xl font-black p-5 rounded-2xl"
              >
                ▶ เริ่มเกม
              </button>

              <button
                onClick={() =>
                  setMusicOn(!musicOn)
                }
                className="w-full mt-4 bg-orange-400 text-black text-2xl font-black p-4 rounded-2xl"
              >
                {musicOn ? "🔊 ปิดเพลง" : "🎵 เปิดเพลง"}
              </button>

            </div>

            <div className="bg-white rounded-3xl shadow-2xl p-8">

              <h2 className="text-4xl font-black mb-6">
                ➕ เพิ่มคำถาม
              </h2>

              <textarea
                placeholder="คำถาม"
                value={newQuestion}
                onChange={(e) =>
                  setNewQuestion(e.target.value)
                }
                className="w-full p-5 rounded-2xl border text-xl mb-4"
              />

              <input
                type="text"
                placeholder="ลิงก์รูปภาพ"
                value={newImage}
                onChange={(e) =>
                  setNewImage(e.target.value)
                }
                className="w-full p-4 rounded-2xl border text-xl mb-4"
              />

              {newChoices.map((choice, index) => (

                <input
                  key={index}
                  type="text"
                  placeholder={`ตัวเลือก ${index + 1}`}
                  value={choice}
                  onChange={(e) => {

                    const updated = [...newChoices];

                    updated[index] = e.target.value;

                    setNewChoices(updated);
                  }}
                  className="w-full p-4 rounded-2xl border text-xl mb-3"
                />

              ))}

              <select
                value={newAnswer}
                onChange={(e) =>
                  setNewAnswer(Number(e.target.value))
                }
                className="w-full p-4 rounded-2xl border text-xl mb-5"
              >

                <option value={0}>
                  ข้อ 1 ถูก
                </option>

                <option value={1}>
                  ข้อ 2 ถูก
                </option>

                <option value={2}>
                  ข้อ 3 ถูก
                </option>

                <option value={3}>
                  ข้อ 4 ถูก
                </option>

              </select>

              <button
                onClick={addQuestion}
                className="w-full bg-purple-600 text-white text-3xl font-black p-5 rounded-2xl"
              >
                ➕ บันทึกคำถาม
              </button>

            </div>

          </div>

        )}

        {screen === "quiz" && (

          <div className="bg-white rounded-3xl shadow-2xl p-10">

            <div className="flex justify-between mb-8">

              <div className="text-2xl font-black">
                ข้อ {questionIndex + 1}
              </div>

              <div className="text-2xl font-black text-red-500">
                ⏰ {timeLeft}
              </div>

              <div className="text-2xl font-black text-orange-500">
                {score} คะแนน
              </div>

            </div>

            {currentQuestion.image && (

              <img
                src={currentQuestion.image}
                alt="question"
                className="w-full h-[350px] object-cover rounded-3xl mb-8"
              />

            )}

            <h2 className="text-5xl font-black text-center mb-10">
              {currentQuestion.question}
            </h2>

            <div className="grid md:grid-cols-2 gap-5">

              {currentQuestion.choices.map(
                (choice, index) => (

                  <button
                    key={index}
                    onClick={() =>
                      answerQuestion(index)
                    }
                    className="bg-yellow-100 hover:bg-yellow-300 p-8 rounded-3xl text-2xl font-black transition hover:scale-105"
                  >
                    {choice}
                  </button>

                )
              )}

            </div>

          </div>

        )}

        {screen === "ranking" && (

          <div className="bg-white rounded-3xl shadow-2xl p-10 text-center">

            <h2 className="text-6xl font-black mb-10">
              🏆 คะแนนล่าสุด
            </h2>

            <div className="text-7xl font-black text-orange-500 mb-10">
              {score}
            </div>

            <button
              onClick={nextQuestion}
              className="bg-black text-white text-3xl font-black px-10 py-5 rounded-3xl"
            >
              ⏭ ข้อต่อไป
            </button>

          </div>

        )}

        {screen === "final" && (

          <div className="bg-white rounded-3xl shadow-2xl p-10 text-center">

            <h2 className="text-7xl font-black mb-10">
              🎉 GAME OVER
            </h2>

            <div className="text-7xl font-black text-orange-500 mb-10">
              {score}
            </div>

            <button
              onClick={() => {

                setScreen("lobby");

                setQuestionIndex(0);

                setScore(0);

                setTimeLeft(15);
              }}
              className="bg-black text-white text-3xl font-black px-10 py-5 rounded-3xl"
            >
              🔄 เล่นใหม่
            </button>

          </div>

        )}

      </div>

    </div>
  );
}