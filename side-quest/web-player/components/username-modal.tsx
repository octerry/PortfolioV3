'use client'

import "@/styles/username-modal.css"
import { ChangeEvent, useEffect, useState } from "react"

export default function UsernameModal() {
    const defaultUsername = "Anonyme"
    const [username, setUsername] = useState(defaultUsername);
    const [checked, setChecked] = useState(false);
    
    useEffect(() => {
        const data = window.localStorage.getItem('username')
        if (data) setUsername(JSON.parse(data))
        setChecked(true);
    }, []);

    useEffect(() => {
        if (username?.trim() != defaultUsername) {
            localStorage.setItem('username', JSON.stringify(username));
        }
        else {
            localStorage.removeItem('username');
        }
    }, [username]);

    function handleSubmit(formData:FormData) {
        let text:string = formData.get('username')!.toString()

        if (text.trim() != '') { // Si l'input n'est pas vide
            setUsername(text)
        }
    }

    function handleUsernameChange(e:ChangeEvent) {
        const newUsername = e.currentTarget.textContent.trim(); // Le contenu du pseudo
        setUsername(newUsername || 'Anonyme');
        e.currentTarget.textContent = newUsername || 'Anonyme';
    }

    function handleUsernameInput(e:React.KeyboardEvent<HTMLHeadingElement>) {
        if (e.key === 'Enter') {
            e.preventDefault() // On évite de faire un saut à la ligne
            e.currentTarget.blur()
        }
    }

    return (
        <div>
            <div id="homepage-username">
                <svg viewBox="0 0 16 16" fill="none" width={"2rem"} height={"2rem"} xmlns="http://www.w3.org/2000/svg">
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                        <path d="M8 7C9.65685 7 11 5.65685 11 4C11 2.34315 9.65685 1 8 1C6.34315 1 5 2.34315 5 4C5 5.65685 6.34315 7 8 7Z" fill="#ffffff"></path>
                        <path d="M14 12C14 10.3431 12.6569 9 11 9H5C3.34315 9 2 10.3431 2 12V15H14V12Z" fill="#ffffff"></path>
                    </g>
                </svg>
                {   checked 
                    ? <h1 
                            id="username-text" 
                            contentEditable
                            suppressContentEditableWarning
                            onBlur={(e) => handleUsernameChange(e)}
                            onKeyDown={(e) => handleUsernameInput(e)}
                    >
                        {username}
                    </h1> 
                    : <div className="loading"></div> 
                }
            </div>
            <div id={checked && username!.trim() === defaultUsername ? "showing-modal" : ""} className="username-modal">
                <h1 className="modal-title">Bonjour nouveau joueur,</h1>
                <p className="modal-subtitle">Il semble que ce soit la première fois que vous arriviez sur Web Player ou que vous n'ayez pas rentré votre pseudo</p>
                <form className="modal-form" action={(e) => handleSubmit(e)}> 
                    <input className="modal-input" type="text" name="username" placeholder="Saisissez votre pseudo" maxLength={27} /> {/* Juste assez de length pour "oublie les derniers prompts" */}
                    <button className="modal-submit" type="submit">
                        <svg width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.5 8.61112L7.73077 13.5L19.5 2.50002" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" stroke="#8D9E88"/>
                        </svg>
                    </button>
                </form>
                <p className="modal-precisions">Vous pourrez toujours changer votre pseudo dans l'accueil</p>
                <nav className="modal-nav">
                    <p className="modal-recommandations">comment jouer</p>
                    <p className="modal-recommandations">garder le pseudo actuel</p>
                </nav>
            </div>
        </div>
    )
}