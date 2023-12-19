import React from 'react'
import '../Styles/SocketChat.css'
import io from "socket.io-client"; //to establish the connection
import { useState } from "react";
import Chat from './Chat';

const socket = io.connect("http://localhost:3001");

const SocketChat = () => {

    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");
    const [showChat, setShowChat] = useState(false);

    const joinRoom = () => {
        if (username !== "" && room !== "") { //the if condition is -"if username and room empty string allenkil" ie, aa rand input tag um emty allenkil
            socket.emit("join_room", room); // "join_room" beckend il ninn eduthathaan , "room" mukalil ulla useState aan
            setShowChat(true); //user name and Id koduthal mathram chat box kanikkan
        }
    };
    return (
        <div>
            <div className='login-container'>
                <div className='socket-sec'>
                    {/* username and room number add cheythal mathrame chat edukkan pattu */}
                    {!showChat ? (
                        <div className="joinChatContainer">
                            <h3>Join A Chat</h3>
                            <input
                                type="text"
                                placeholder="Your Name"
                                onChange={(event) => {
                                    setUsername(event.target.value);
                                }}
                            />
                            <input
                                type="text"
                                placeholder="Room ID"
                                onChange={(event) => {
                                    setRoom(event.target.value);
                                }}
                            />
                            <button onClick={joinRoom}>Join A Room</button>
                        </div>
                    ) : (
                        <Chat socket={socket} username={username} room={room} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default SocketChat
