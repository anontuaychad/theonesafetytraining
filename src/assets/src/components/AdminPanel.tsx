import { useState } from "react";
import { FaPlus, FaTrash, FaPlay } from "react-icons/fa";

export default function AdminPanel({
  questions,
  setQuestions,
  startGame,
}: any) {

  const [password, setPassword] = useState("");

  const [loggedIn, setLoggedIn] = useState(false);

  const [question, setQuestion] = useState("");

  const [choice1, setChoice1] = useState("");

  const [choice2, setChoice2] = useState("");

  const [choice3, setChoice3] = useState("");

  const [choice4, setChoice4] = useState("");

  const [correct, setCorrect] = useState(0);

  const ADMIN_PASSWORD = "1234";

  const login = () => {

    if (password === ADMIN_PASSWORD) {

      setLoggedIn(true);

      return;
    }

    alert("รหัสผ่านผิด");
  };

  const addQuestion = () => {

    if (!question) return;

    const newQuestion = {
      question,
      choices: [
        choice1,
        choice2,
        choice3,
        choice4,
      ],
      answer: correct,
    };

    setQuestions([
      ...questions,
      newQuestion,
    ]);

    setQuestion("");

    setChoice1("");

    setChoice2("");

    setChoice3("");

    setChoice4("");

    setCorrect(0);
  };

  const removeQuestion = (index: number) => {

    const updated =
      questions.filter(
        (_: any, i: number) => i !== index
      );

    setQuestions(updated);
  };

  if (!loggedIn) {

    return (

      <div className="bg-white rounded-3xl shadow-2xl p-10">

        <div className="text-5xl font-black mb-8">
          🔐 ADMIN LOGIN
        </div>

        <input
          type="password"
          placeholder="รหัสผ่าน"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="w-full border p-5 rounded-2xl text-2xl mb-5"
        />

        <button
          onClick={login}
          className="w-full bg-black text-white p-5 rounded-2xl text-3xl font-black"
        >
          เข้าสู่ระบบ
        </button>

      </div>
    );
  }

  return (

    <div className="bg-white rounded-3xl shadow-2xl p-10">

      <div className="text-5xl font-black mb-8">
        👑 ADMIN PANEL
      </div>

      <input
        placeholder="คำถาม"
        value={question}
        onChange={(e) =>
          setQuestion(e.target.value)
        }
        className="w-full border p-4 rounded-2xl mb-4 text-xl"
      />

      <input
        placeholder="ตัวเลือก 1"
        value={choice1}
        onChange={(e) =>
          setChoice1(e.target.value)
        }
        className="w-full border p-4 rounded-2xl mb-4"
      />

      <input
        placeholder="ตัวเลือก 2"
        value={choice2}
        onChange={(e) =>
          setChoice2(e.target.value)
        }
        className="w-full border p-4 rounded-2xl mb-4"
      />

      <input
        placeholder="ตัวเลือก 3"
        value={choice3}
        onChange={(e) =>
          setChoice3(e.target.value)
        }
        className="w-full border p-4 rounded-2xl mb-4"
      />

      <input
        placeholder="ตัวเลือก 4"
        value={choice4}
        onChange={(e) =>
          setChoice4(e.target.value)
        }
        className="w-full border p-4 rounded-2xl mb-4"
      />

      <select
        value={correct}
        onChange={(e) =>
          setCorrect(Number(e.target.value))
        }
        className="w-full border p-4 rounded-2xl mb-5"
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
        className="w-full bg-green-500 text-white p-5 rounded-2xl text-2xl font-black"
      >
        <FaPlus className="inline mr-3" />
        เพิ่มคำถาม
      </button>

      <div className="mt-10">

        {questions.map(
          (q: any, index: number) => (

            <div
              key={index}
              className="bg-yellow-100 rounded-2xl p-5 mb-4"
            >

              <div className="text-2xl font-black">
                {q.question}
              </div>

              <button
                onClick={() =>
                  removeQuestion(index)
                }
                className="mt-4 bg-red-500 text-white px-5 py-3 rounded-xl"
              >
                <FaTrash className="inline mr-2" />
                ลบ
              </button>

            </div>

          )
        )}

      </div>

      <button
        onClick={startGame}
        className="w-full mt-10 bg-orange-500 text-white p-6 rounded-2xl text-3xl font-black"
      >
        <FaPlay className="inline mr-3" />
        เริ่มเกม
      </button>

    </div>
  );
}