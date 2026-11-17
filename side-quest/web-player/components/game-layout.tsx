import { useSearchParams } from "next/navigation"
import ChatTest from "./chat-test";

export default function GameLayout() {
    const searchParams = useSearchParams()
    const code = searchParams.get('code');

    return (
        <div>
            <ChatTest/>
        </div>
    )
}