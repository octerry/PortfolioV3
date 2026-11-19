'use client'

import "@/styles/username-modal.css"
import { useEffect, useState } from "react"

export default function UsernameModal() {
    const [username, setUsername] = useState(() => {
        const saved = localStorage.getItem('username')
        return saved ? JSON.parse(saved) : '';
    })

    useEffect(() => {
        if (username.trim() != '') {
            localStorage.setItem('username', JSON.stringify(username));
        }
    }, [username]);

    function handleSubmit(formData:FormData) {
        let text:string = formData.get('username')!.toString()

        if (text.trim() != '') { // Si l'input n'est pas vide
            setUsername(text)
        }
    }

    console.log(username!.trim() != '')

    return (
        <div id={username!.trim() != '' ? "" : "showing-modal"} className="username-modal">
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
    )
}