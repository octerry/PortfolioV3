"use client"

import Form from "next/form"

export default function ModalJoin() {
    return (
        <div className="subsection-modal-join">
            <h3 className="modal-join-title">Rejoindre</h3>
            <Form action="/party">
                <input className="modal-join-input" name="code" type="text" maxLength={4}/>
            </Form>
        </div>
    )
}