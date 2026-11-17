'use client'

import GameLayout from "@/components/game-layout";
import { Suspense } from "react";

export default function Party() {
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <GameLayout/>
        </Suspense>
    )
}