import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Toaster, toast } from "react-hot-toast";
import Confetti from "react-confetti";
import { motion } from "framer-motion";
import {
  FaPlay,
  FaPlus,
  FaUsers,
  FaMusic,
  FaTrophy,
} from "react-icons/fa";

const socket = io("https://theonesafetytraining.onrender.com");

export default function App() {
  const [screen, setScreen] = useState("home");
  const [name, setName] = useState("");
  const [pin, setPin] = useState("");
  const [roomPin, setRoomPin] = useState("");
  const [players, setPlayers] = useState<any[]>([]);
  const [music, setMusic] = useState(false);

  const [question, setQuestion] = useState("");
  const [choice1, setChoice1] = useState("");
  const [choice2, setChoice2] = useState("");
  const [choice3, setChoice3] = useState("");
  const [choice4, setChoice4] = useState("");

  const [questions, setQuestions] = useState<any[]>([]);
  const [showRank, setShowRank] = useState(false);

  useEffect(() => {
    socket.on("room_created", (pin) => {
      setRoomPin(pin);
      setScreen("host");
      toast.success("สร้างห้องสำเร็จ");
    });

    socket.on("players_update", (data) => {
      setPlayers(data);
    });

    socket.on("room_not_found", () => {
      toast.error("ไม่พบห้อง");
    });
  }, []);

  const createRoom = () => {
    socket.emit("create_room");
  };

  const joinRoom = () => {
    if (!name || !pin) {
      toast.error("กรอกข้อมูลให้ครบ");
      return;
    }

    socket.emit("join_room", {
      pin,
      name,
    });

    setRoomPin(pin);
    setScreen("lobby");
  };

  const addQuestion = () => {
    if (!question) return;

    const newQuestion = {
      question,
      choices: [choice1, choice2, choice3, choice4],
    };

    setQuestions([...questions, newQuestion]);

    setQuestion("");
    setChoice1("");
    setChoice2("");
    setChoice3("");
    setChoice4("");

    toast.success("เพิ่มคำถามแล้ว");
  };

  const removeQuestion = (index: number) => {
    const updated = questions.filter((_, i) => i !== index);
    setQuestions(updated);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-orange-100 p-5">
      <Toaster />

      {showRank && <Confetti />}

      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-10">
          <div className="text-7xl font-black">
            🛡 TheOneSafetyTraining
          </div>

          <div className="text-3xl text-gray-600 mt-4">
            Professional Safety Quiz Platform
          </div>
        </div>

        {screen === "home" && (
          <div className="grid md:grid-cols-2 gap-10">

            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-3xl shadow-2xl p-8"
            >
              <div className="text-5xl font-black mb-8 flex items-center gap-4">
                🚀 Join Game
              </div>

              <input
                placeholder="ชื่อผู้เล่น"
                className="w-full border p-4 rounded-2xl text-2xl mb-4"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <input
                placeholder="GAME PIN"
                className="w-full border p-4 rounded-2xl text-2xl mb-4"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
              />

              <button
                onClick={joinRoom}
                className="w-full bg-black text-white p-5 rounded-2xl text-3xl font-black"
              >
                <FaPlay className="inline mr-3" />
                เข้าเกม
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-3xl shadow-2xl p-8"
            >
              <div className="text-5xl font-black mb-8">
                ➕ Create Room
              </div>

              <button
                onClick={createRoom}
                className="w-full bg-orange-500 text-white p-6 rounded-2xl text-3xl font-black"
              >
                สร้างห้องเกม
              </button>

              <div className="mt-10">
                <div className="text-3xl font-black mb-5">
                  ➕ เพิ่มคำถาม
                </div>

                <input
                  placeholder="คำถาม"
                  className="w-full border p-3 rounded-xl mb-3"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                />

                <input
                  placeholder="ตัวเลือก 1"
                  className="w-full border p-3 rounded-xl mb-3"
                  value={choice1}
                  onChange={(e) => setChoice1(e.target.value)}
                />

                <input
                  placeholder="ตัวเลือก 2"
                  className="w-full border p-3 rounded-xl mb-3"
                  value={choice2}
                  onChange={(e) => setChoice2(e.target.value)}
                />

                <input
                  placeholder="ตัวเลือก 3"
                  className="w-full border p-3 rounded-xl mb-3"
                  value={choice3}
                  onChange={(e) => setChoice3(e.target.value)}
                />

                <input
                  placeholder="ตัวเลือก 4"
                  className="w-full border p-3 rounded-xl mb-3"
                  value={choice4}
                  onChange={(e) => setChoice4(e.target.value)}
                />

                <button
                  onClick={addQuestion}
                  className="w-full bg-green-500 text-white p-4 rounded-2xl text-2xl font-black"
                >
                  <FaPlus className="inline mr-2" />
                  เพิ่มคำถาม
                </button>

                <div className="mt-8">
                  {questions.map((q, index) => (
                    <div
                      key={index}
                      className="bg-yellow-100 p-4 rounded-2xl mb-3"
                    >
                      <div className="font-black text-xl">
                        {q.question}
                      </div>

                      <button
                        onClick={() => removeQuestion(index)}
                        className="mt-3 bg-red-500 text-white px-4 py-2 rounded-xl"
                      >
                        ลบ
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {screen === "host" && (
          <div className="bg-white rounded-3xl shadow-2xl p-10 text-center">

            <div className="text-5xl font-black">
              🎮 HOST ROOM
            </div>

            <div className="text-8xl font-black text-orange-500 my-10">
              {roomPin}
            </div>

            <div className="text-3xl font-black mb-6">
              <FaUsers className="inline mr-3" />
              ผู้เล่นในห้อง
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {players.map((player, index) => (
                <div
                  key={index}
                  className="bg-yellow-100 p-5 rounded-2xl text-2xl font-black"
                >
                  🎯 {player.name}
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                setMusic(!music);
                toast.success(
                  music ? "ปิดเพลงแล้ว" : "เปิดเพลงแล้ว"
                );
              }}
              className="mt-10 bg-purple-500 text-white px-8 py-4 rounded-2xl text-2xl font-black"
            >
              <FaMusic className="inline mr-3" />
              {music ? "ปิดเพลง" : "เปิดเพลง"}
            </button>

            <button
              onClick={() => setShowRank(true)}
              className="mt-5 ml-5 bg-yellow-500 text-black px-8 py-4 rounded-2xl text-2xl font-black"
            >
              <FaTrophy className="inline mr-3" />
              แสดงอันดับ
            </button>

            {showRank && (
              <div className="mt-10 bg-black text-white rounded-3xl p-10">

                <div className="text-5xl font-black mb-10">
                  🏆 TOP 10
                </div>

                {players
                  .sort((a, b) => b.score - a.score)
                  .slice(0, 10)
                  .map((player, index) => (
                    <div
                      key={index}
                      className="text-3xl mb-5"
                    >
                      #{index + 1} — {player.name}
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}

        {screen === "lobby" && (
          <div className="bg-white rounded-3xl shadow-2xl p-10 text-center">

            <div className="text-6xl font-black">
              🚀 เข้าห้องสำเร็จ
            </div>

            <div className="text-4xl mt-8">
              ROOM PIN
            </div>

            <div className="text-8xl font-black text-orange-500 my-10">
              {roomPin}
            </div>

            <div className="text-3xl">
              รอ Host เริ่มเกม...
            </div>
          </div>
        )}
      </div>
    </div>
  );
}