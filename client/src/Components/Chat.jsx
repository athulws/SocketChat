
import '../Styles/SocketChat.css'
import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";


const Chat = ({ socket, username, room }) => {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]); //varunna message list kanikkan

    const sendMessage = async () => {
        if (currentMessage !== "") {
            const messageData = {   // "messageData" is an object
                room: room,
                author: username,
                message: currentMessage,
                time:
                    new Date(Date.now()).getHours() +   // ith javascript function aan, ayacha message nte hour
                    ":" +
                    new Date(Date.now()).getMinutes(), // ith javascript function aan, ayacha message nte minute
            };

            await socket.emit("send_message", messageData); // "messageData" il ulla datas aan send aakunnath 
            setMessageList((list) => [...list, messageData]); // ente chat ilum ayakkunna message varan
            setCurrentMessage("");
        }
    };

    // useEffect(() => {
    //     socket.on("receive_message", (data) => { 
    //         setMessageList((list) => [...list, data]);
    //     });
    // }, [socket]);
    useEffect(() => {
        const handleReceiveMessage = (data) => {
            console.log("Received message:", data);
            setMessageList((list) => [...list, data]);// "list" it is the current previous message list // "data" is the new message that recieved
        };

        socket.on("receive_message", handleReceiveMessage);

        return () => {
            // Cleanup function
            socket.off("receive_message", handleReceiveMessage);
        };
    }, [socket]);

    return (
        <div className="chat-window">
            <div className="chat-header">
                <p>Live Chat</p>
            </div>
            <div className="chat-body">
                <ScrollToBottom className="message-container">
                    {messageList.map((messageContent) => {
                        return (
                            <div
                                className="message"
                                id={username === messageContent.author ? "you" : "other"} // eth tab il ninnao type cheyyunnath aa message in green background colour and recieving message will be shown in "blue" background colour
                            >
                                <div>
                                    <div className="message-content">
                                        
                                        {/* // kodukkunna text varan */}
                                        <p>{messageContent.message}</p>
                                    </div>
                                    <div className="message-meta">
                                        <p id="time">{messageContent.time}</p>
                                        <p id="author">{messageContent.author}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </ScrollToBottom>
            </div>
            <div className="chat-footer">
                <input
                    type="text"
                    value={currentMessage}
                    placeholder="Hey..."
                    onChange={(event) => {
                        setCurrentMessage(event.target.value);
                    }}
                    onKeyPress={(event) => {
                        event.key === "Enter" && sendMessage(); //enter nte key press cheyyumbozum send aakan
                    }}
                />
                <button onClick={sendMessage}>&#9658;</button>
            </div>
        </div>
    )
}

export default Chat
