import React, { useContext, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
// @ts-ignore-next-line
import { db } from "../firebase";
// @ts-ignore-next-line
import { AuthContext } from "../context/AuthContext";
const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);
// @ts-ignore-next-line
  const { currentUser } = useContext(AuthContext);

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // @ts-ignore-next-line
        setUser(doc.data());
      });
    } catch (err) {
      setErr(true);
    }
  };
// @ts-ignore-next-line
  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
    // @ts-ignore-next-line
      currentUser.uid > user.uid
      // @ts-ignore-next-line
        ? currentUser.uid + user.uid
        // @ts-ignore-next-line
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            // @ts-ignore-next-line
            uid: user.uid,
            // @ts-ignore-next-line
            displayName: user.displayName,
            // @ts-ignore-next-line
            photoURL: user.photoURL,

          },
          [combinedId + ".date"]: serverTimestamp(),
        });
// @ts-ignore-next-line
        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {}

    setUser(null);
    setUsername("")
  };
  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Find a user"
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </div>
      {err && <span>User not found!</span>}
      {user && (
        <div className="userChat" onClick={handleSelect}>
          {/* @ts-ignore-next-line */}
          <img src={user.photoURL} alt="" />
          <div className="userChatInfo">
          {/* @ts-ignore-next-line */}
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
