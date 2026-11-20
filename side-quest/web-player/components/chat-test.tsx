'use client'

import { io, Socket } from "socket.io-client";
import { useState, useRef, useEffect } from "react";

export default function ChatTest() {
    const socketRef = useRef<Socket | null>(null);
    const [connected, setConnected] = useState(false);
    const [username, setUsername] = useState('Anonyme');
    const [checked, setChecked] = useState(false);
    const [chat, setChat] = useState<string[]>([]);

    useEffect(() => {
        // Get localstorage username
        const usernameData = window.localStorage.getItem('username')
        const tempName = usernameData ? JSON.parse(usernameData) : 'Anonyme'
        setUsername(tempName)

        // Enable Socket.io connexion
        const host = window.location.hostname // domaine actuel => adresse.com ou localhost
        const socket = io(`ws://${host}:8080`, {
            reconnection: true,
            reconnectionAttempts: Infinity,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 5000,
        })
        socketRef.current = socket;

        socket.on("connected", () => setConnected(true));
        socket.on("disconnected", () => setConnected(false));

        // Init messages
        socket.on('message', text => {
            setChat((prev) => [...prev, text])
        })

        return () => {
            socket.disconnect();
            socketRef.current = null;
        }
    }, []);

    // Init identity
    useEffect(() => {
        if (username !== 'Anonyme' && socketRef.current) { // Au cas où username se charge avant socket 
            const pack = {
                name:username
            }
            socketRef.current?.emit('init', JSON.stringify(pack))
            setChecked(true);
        }
    }, [socketRef.current, username]) 
    
    function handleSend(formData:FormData) {
        const text = formData?.get('content');
        if (checked && text?.toString().trim() !== "") socketRef.current?.emit('message', text)
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