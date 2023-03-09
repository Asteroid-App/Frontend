import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
// @ts-ignore-next-line
import { ChatContext } from "../context/ChatContext";
// @ts-ignore-next-line
import { db } from "../firebase";
import Message from "./Message";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  // @ts-ignore-next-line
  const { data } = useContext(ChatContext);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);

  console.log(messages)

  return (
    <div className="messages">
      {messages.map((m) => (
        // @ts-ignore-next-line
        <Message message={m} key={m.id} />
      ))}
    </div>
  );
};

export default Messages;
