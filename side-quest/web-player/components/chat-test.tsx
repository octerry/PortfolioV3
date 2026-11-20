'use client'

import { io, Socket } from "socket.io-client";
import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";

type dataStatus = 'loading' | 'ok' | 'failed';

export default function ChatTest() {
    const socketRef = useRef<Socket | null>(null);
    const searchParams = useSearchParams();
    const code = searchParams.get('code')?.toUpperCase();

    const [connected, setConnected] = useState(false); // Quand Socket est connecté
    const [checked, setChecked] = useState(false); // Quand Socket a reçu les infos client
    const [verified, setVerified] = useState<dataStatus>('loading'); // Quand Socket a confirmé la partie
    const [username, setUsername] = useState('Anonyme');
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
        if (username !== 'Anonyme' && checkCode() && socketRef.current) { // Au cas où username se charge avant socket 
            const pack = {
                name:username,
                code:code
            }
            socketRef.current.emit('init', pack, (res:number) => {
                if (res === 200) setVerified('ok');
            })
            setChecked(true);
        }
    }, [socketRef.current, username]) 
    
    function checkCode(): boolean {
        return typeof code === 'string' && code.length === 4;
    }

    function handleSend(formData:FormData) {
        const text = formData?.get('content');
        if (checked && text?.toString().trim() !== "") socketRef.current?.emit('message', text)
    }

    return (
        <div>
            { verified === 'ok'
                ?   (<form action={handleSend}>
                        <input style={{width:"100%", fontSize:"20px"}} name="content" type="text" placeholder="message"/>
                        <button style={{width:"100%"}} type="submit">send</button>
                    </form>)
                : <h1>Mauvais code de session</h1>
            }
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