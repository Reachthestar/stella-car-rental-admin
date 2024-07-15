import { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import adminIcon from "../assets/images/admin.png";
import customerIcon from "../assets/images/user.png";
import { IoMdClose } from "react-icons/io";
import { FaList } from "react-icons/fa6";
import { useAuth } from "../contexts/auth-context";

const socket = io("http://localhost:8888");

const Chat = () => {
  const { admin } = useAuth();
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [chatRoomId, setChatRoomId] = useState(null);
  const [activeChatRoomId, setActiveChatRoomId] = useState(null);
  const adminId = admin?.id;
  const [chatRooms, setChatRooms] = useState([]);
  const [onlineCustomers, setOnlineCustomers] = useState(new Set());

  // เมื่อกด send ให้เลื่อนลงมาล่างสุด
  const chatContainerRef = useRef(null);
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      // console.dir(chatContainerRef.current);
      const { scrollHeight, clientHeight } = chatContainerRef.current;
      chatContainerRef.current.scrollTo({
        top: scrollHeight - clientHeight,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  //

  useEffect(() => {
    // Fetch chat rooms when the component mounts
    socket.emit("getChatRooms");

    if (chatRoomId) {
      socket.emit("joinRoom", { chatRoomId });
      socket.on("roomMessages", (msgs) => {
        setMessages(msgs);
      });
    }
  }, [chatRoomId]);

  useEffect(() => {
    //รับ message
    socket.on("message", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);

      // Move the chat room to the top when a new message is received
      setChatRooms((prevRooms) => {
        const roomIndex = prevRooms.findIndex(
          (room) => room.id === msg.chatRoomId
        );
        if (roomIndex !== -1) {
          const updatedRooms = [...prevRooms];
          const [movedRoom] = updatedRooms.splice(roomIndex, 1);
          return [movedRoom, ...updatedRooms];
        }
        return prevRooms;
      });
    });
    //เมื่อลูกค้าทักเข้ามา ให้set chatRooms เพิ่ม

    socket.on("initiateChat", (chatRoom) => {
      setChatRooms((prevRooms) => {
        const roomExists = prevRooms.some((room) => room.id === chatRoom.id);
        if (!roomExists) {
          return [chatRoom, ...prevRooms];
        }
        return prevRooms;
      });
    });

    socket.on("chatRooms", (rooms) => {
      // console.log("Chat rooms from server:", rooms);
      setChatRooms(rooms);
    });

    socket.on("customerStatus", ({ customerId, status }) => {
      setOnlineCustomers((prev) => {
        const newSet = new Set(prev);
        if (status === "online") {
          newSet.add(customerId);
        } else {
          newSet.delete(customerId);
        }
        return newSet;
      });
    });

    return () => {
      socket.off("message");
      socket.off("initiateChat");
      socket.off("chatRooms");
      socket.off("customerStatus");
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!message || !chatRoomId) return;

    const newMessage = {
      chatRoomId,
      senderId: adminId,
      senderType: "Admin",
      message,
    };

    socket.emit("message", newMessage);
    setMessage("");
  };

  const isCustomerOnline = (customerId) => onlineCustomers.has(customerId);

  const handleChatRoomClick = (roomId) => {
    setChatRoomId(roomId);
    setActiveChatRoomId(roomId);
  };

  return (
    <div className="px-2 lg:px-7 py-5">
      <div className="w-full bg-secondary-color px-4 py-4 rounded-md h-[calc(100vh-140px)]">
        <div className="flex w-full h-full relative ">
          <div
            className={`w-[280px] h-full absolute z-10 gap-2 ${
              show ? "-left-[16px]" : "-left-[600px]"
            } md:left-0 md:relative transition-all `}
          >
            <div className="w-full h-[calc(100vh-177px)] bg-secondary-color md:bg-transparent overflow-y-auto space-y-3 ">
              <div className="flex  text-xl justify-between items-center p-4 md:p-0 md:px-3 md:pb-3 text-white ">
                <h2>Admin</h2>
                <span
                  onClick={() => setShow(!show)}
                  className="block cursor-pointer md:hidden"
                >
                  <IoMdClose />
                </span>
              </div>
              {chatRooms.map((room) => (
                <div
                  key={room.id}
                  className={`h-[60px] flex justify-start gap-2 items-center text-white px-2 py-2 rounded-md cursor-pointer ${
                    activeChatRoomId === room.id
                      ? "bg-[#61b761]"
                      : "bg-[#b6b6b6]"
                  }`}
                  onClick={() => handleChatRoomClick(room.id)}
                >
                  <div className="relative">
                    <img
                      className={`w-[38px] h-[38px] ${
                        isCustomerOnline(room.customerId)
                          ? "border-green-500"
                          : "border-white"
                      } border-2 max-w-[38px] p-[2px] rounded-full`}
                      src={customerIcon}
                      alt=""
                    />
                    <div
                      className={`w-[10px] h-[10px] ${
                        isCustomerOnline(room.customerId)
                          ? "bg-green-500"
                          : "bg-gray-400"
                      } rounded-full absolute bottom-0 right-0`}
                    ></div>
                  </div>
                  <div className="flex justify-center items-start flex-col w-full ">
                    <div className=" flex justify-between items-center w-full">
                      <h2 className="text-base font-semibold">{room.name}</h2>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full md:w-[calc(100%-200px)] md:pl-4 ">
            <div className="flex justify-between items-center">
              <div
                onClick={() => setShow(!show)}
                className="w-[35px] flex md:hidden h-[35px] rounded-sm bg-blue-500 shadow-lg hover:shadow-blue-500/50 justify-center cursor-pointer items-center text-white"
              >
                <span>
                  <FaList className="text-xl" />
                </span>
              </div>
            </div>

            <div className="py-4">
              <div
                className="bg-[#475569] h-[calc(100vh-290px)] rounded-md p-3 overflow-y-auto"
                ref={chatContainerRef}
              >
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`w-full flex ${
                      msg.senderType === "Admin"
                        ? "justify-end"
                        : "justify-start"
                    } items-center`}
                  >
                    <div className="flex justify-start items-start gap-2 md:px-3 py-2 max-w-full lg:max-w-[85%]">
                      {msg.senderType !== "Admin" && (
                        <div>
                          <img
                            src={customerIcon}
                            alt=""
                            className={`w-[38px] h-[38px] border-2 ${
                              isCustomerOnline(msg.senderId)
                                ? "border-green-500"
                                : "bg-gray-400"
                            }  rounded-full max-w-[38px] p-[3px]`}
                          />
                        </div>
                      )}
                      <div
                        className={`flex justify-center items-start flex-col w-full ${
                          msg.senderType === "Admin"
                            ? "bg-red-500"
                            : "bg-blue-500"
                        } shadow-lg text-white py-1 px-2 rounded-sm`}
                      >
                        <span>{msg.message}</span>
                      </div>
                      {msg.senderType === "Admin" && (
                        <div>
                          <img
                            src={adminIcon}
                            alt=""
                            className="w-[38px] h-[38px] border-2 border-white rounded-full max-w-[38px] p-[3px]"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <form className="flex gap-3" onSubmit={sendMessage}>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full flex justify-between px-2 border border-slate-700 items-center py-[5px] focus:border-blue-500 rounded-md outline-none bg-transparent text-[#d0d2d6]"
                placeholder="Input your message"
              />
              <button className="shadow-lg bg-[#06b6d4] hover:shadow-cyan-500/50 text-semibold w-[75px] h-[35px] rounded-md text-white flex justify-center items-center">
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
