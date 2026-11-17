import Image from "next/image";
import ModalJoin from "./modal-join";
import ModalCreate from "./modal-create";
import "@/styles/homepage-subsection.css";

interface Props {
    title:string
    src:string
}

export default function HomepageSubsection({ title, src }:Props) {
    return (
        <div className="homepage-subsection">
            <Image src={src}  width={500} height={500} alt={title}/>
            <h2>{title}</h2>
            <div className="subsection-modal">
                <ModalJoin/>
                <ModalCreate/>
            </div>
        </div>
    )
}