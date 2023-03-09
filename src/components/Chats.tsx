import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
// @ts-ignore-next-line
import { AuthContext } from "../context/AuthContext";
// @ts-ignore-next-line
import { ChatContext } from "../context/ChatContext";
// @ts-ignore-next-line
import { db } from "../firebase";

const Chats = () => {
  const [chats, setChats] = useState([]);
// @ts-ignore-next-line
  const { currentUser } = useContext(AuthContext);
  // @ts-ignore-next-line
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        // @ts-ignore-next-line
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);
// @ts-ignore-next-line
  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  return (
    
    <div className="chats">
{/* @ts-ignore-next-line */}
      {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat) => (
        <div
          className="userChat"
          key={chat[0]}
          // @ts-ignore-next-line
          onClick={() => handleSelect(chat[1].userInfo)}
        >
          {/* @ts-ignore-next-line */}
          <img src={chat[1].userInfo.photoURL} alt="" />
          <div className="userChatInfo">
          {/* @ts-ignore-next-line */}
            <span>{chat[1].userInfo.displayName}</span>
             {/* @ts-ignore-next-line */}
            <p>{chat[1].lastMessage?.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Chats;
