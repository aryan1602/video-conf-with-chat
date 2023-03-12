import React, { createContext, useState, useRef, useEffect } from "react";
import { io } from "socket.io-client";
import Peer from "simple-peer";

const SocketContext = createContext();
const socket = io("http://localhost:5000");

export const ContextProvider = ({ children }) => {
  const [stream, setStream] = useState(null);
  const [myId, setMyId] = useState("");
  const [call, setCall] = useState({});
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [callerName, setCallerName] = useState("");
  const [personToCall, setPersonToCall] = useState("");

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    async function fetchData() {
      try {
        const currentStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setStream(currentStream);
        myVideo.current.srcObject = currentStream;
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
    socket.on("me", (id) => setMyId(id));

    socket.on("calluser", ({ from, callerName, signal }) => {
      setCall({ isReceivedCall: true, from, name: callerName, signal });
    });
  }, []);

  const answerCall = () => {
    setCallAccepted(true);
    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.emit("answercall", { signal: data, caller: call.from });
    });

    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
  };

  const callUser = (id) => {
    console.log("calling");
    console.log(call.signal);

    console.log(`The id is ${id}`);
    console.log(`The id is ${personToCall}`);
    const peer = new Peer({ initiator: true, trickle: false, stream });
    peer.on("signal", (data) => {
      socket.emit("calluser", {
        userToCall: id,
        signal: data,
        from: myId,
        callerName,
      });
    });

    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });
    socket.on("callaccepted", (data) => {
      setCallAccepted(true);
      peer.signal(data);
    });

    connectionRef.current = true;
  };

  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current.destroy();

    window.location.reload();
  };

  const value = {
    call,
    callAccepted,
    myVideo,
    userVideo,
    stream,
    callerName,
    setCallerName,
    callEnded,
    myId,
    callUser,
    leaveCall,
    answerCall,
    personToCall,
    setPersonToCall
  };

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};

export default SocketContext;
