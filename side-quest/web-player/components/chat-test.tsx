'use client'

import { io, Socket } from "socket.io-client";
import { useState, useRef, useEffect } from "react";

export default function ChatTest() {
    const socketRef = useRef<Socket | null>(null);
    const [connected, setConnected] = useState(false);
    const [chat, setChat] = useState<string[]>([]);

    useEffect(() => {
        const host = window.location.hostname
        const socket = io(`ws://${host}:8080`, {
            reconnection: true,     // activé par défaut
            reconnectionAttempts: Infinity,
            reconnectionDelay: 1000,      // 1s entre les tentatives
            reconnectionDelayMax: 5000,
        }) // ${host.split(':')[0]}
        socketRef.current = socket;

        socket.on("connected", () => setConnected(true));
        socket.on("disconnected", () => setConnected(false));

        socketRef.current?.on('message', text => {
            setChat((prev) => [...prev, text])
        })

        return () => {
            socket.disconnect();
            socketRef.current = null;
        }
    }, []);
    
    function handleSend(formData:FormData) {
        const text = formData?.get('content');
        if (text?.toString().trim() !== "") socketRef.current?.emit('message', text)
    }

    return (
        <div>
            <form action={handleSend}>
                <input style={{width:"100%", fontSize:"20px"}} name="content" type="text" placeholder="message"/>
                <button style={{width:"100%"}} type="submit">send</button>
            </form>
            <ul>
                {
                    chat.map((item) => (
                        <h2 key={chat.indexOf(item)}>{item}</h2>
                    ))
                }
            </ul>
        </div>
    )
}