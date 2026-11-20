'use client'

import Anteroom from "@/components/anteroom";
import { Suspense } from "react";
import '@/styles/party.css'

export default function Party() {
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <Anteroom/>
        </Suspense>
    )
}