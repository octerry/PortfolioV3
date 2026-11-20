'use client'

import { io, Socket } from "socket.io-client";
import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import TicTacToe from "./tictactoe";

type dataStatus = 'loading' | 'ok' | 'failed';

export default function Anteroom() {
    const socketRef = useRef<Socket | null>(null);
    const searchParams = useSearchParams();
    const code = searchParams.get('code')?.toUpperCase();

    const [checked, setChecked] = useState(false); // Quand Socket a reçu les infos client
    const [verified, setVerified] = useState<dataStatus>('loading'); // Quand Socket a confirmé la partie
    const [username, setUsername] = useState('Anonyme');
    // const [chat, setChat] = useState<string[]>([]);

    const verifiedContent = (
        <div>
            <TicTacToe/>
        </div>
    )

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

        // Init messages
        // socket.on('message', text => {
        //     setChat((prev) => [...prev, text])
        // })

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

    function renderVerifiedContent() {
        switch(verified) {
            case 'loading' : return <h1 style={{textAlign:"center"}} >Chargement...</h1>;
            case 'failed' : return <h1 style={{textAlign:"center"}} >Mauvais code de session</h1>
            case 'ok' : return verifiedContent;
            default : return
        }
    }
    
    return (
        <div>
            <Link href={'@'}>
                <svg id="topleft-icon" width="4rem" height="4rem" viewBox="0 0 92 85" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M64.993 1.9401C64.3381 2.59257 64.3408 3.65156 64.9979 4.30176L71.8309 11.0628C72.4881 11.713 72.4907 12.772 71.8358 13.4245L64.9897 20.2441C64.3364 20.895 64.3366 21.95 64.9897 22.6009L69.9572 27.5505C70.6141 28.2049 71.6807 28.2018 72.3324 27.5423L79.105 20.6852C79.7583 20.0243 80.8273 20.0221 81.4834 20.6803L88.3246 27.5439C88.9771 28.1987 90.0399 28.2013 90.6948 27.5488L92 26.2467V85H8.36364C3.74474 84.9997 1.68376e-07 81.2689 0 76.6667V0H66.9401L64.993 1.9401ZM10.6032 62.4381C10.9735 63.4994 11.5202 64.5665 12.2416 65.638C12.9615 66.7594 13.8121 67.7339 14.7915 68.5628C15.721 69.3903 17.1482 70.3333 19.0746 71.39C21 72.4968 23.1581 73.4107 25.5467 74.1309C27.935 74.8509 30.7304 75.407 33.9315 75.8008C37.1814 76.246 39.8602 76.4992 41.9668 76.5609C50.1427 76.8001 56.7562 76.4194 61.806 75.4167C66.9057 74.4155 70.6017 73.3734 72.8927 72.29C75.1836 71.2066 77.1036 69.9367 78.6525 68.4814C80.2501 67.0776 81.1821 66.1039 81.4491 65.5615C81.7662 65.0207 81.9804 64.577 82.091 64.2301L81.1256 63.7516L80.5768 64.4857C79.6871 65.7102 76.9378 67.005 72.3291 68.3708C70.0999 69.0558 66.5433 69.6522 61.6589 70.1595C56.7744 70.6668 50.6204 70.8129 43.1969 70.5957C25.691 70.0834 15.0045 67.2686 11.139 62.1533L10.6032 62.4381ZM59.0077 47.723C58.3558 47.7039 57.7714 47.9114 57.2566 48.3464C56.7906 48.8328 56.5474 49.401 56.5281 50.0505C56.5089 50.7002 56.7188 51.2574 57.157 51.7204C57.6438 52.2348 58.2135 52.5021 58.8656 52.5212C59.5177 52.5402 60.0771 52.3062 60.5433 51.8197C61.0581 51.3845 61.3245 50.8418 61.3437 50.1921C61.3628 49.5424 61.1296 48.96 60.6429 48.4456C60.2049 47.9828 59.6595 47.7422 59.0077 47.723ZM18.5993 46.6895L32.2686 50.4671L32.1886 48.0631L18.6271 45.7161L18.5993 46.6895Z" fillRule="evenodd" clipRule="evenodd" fill="white"/>
                    <path d="M92 16.6341L88.7607 13.4294C88.1001 12.7757 88.1025 11.7105 88.7656 11.0596L92 7.88737V16.6341Z" fill="white"/>
                    <path d="M81.4785 3.81673C80.8236 4.46902 79.7607 4.46659 79.1082 3.81185L75.3087 0H85.3075L81.4785 3.81673Z" fill="white"/>
                </svg>
            </Link>
            { renderVerifiedContent() }
        </div>
    )
}