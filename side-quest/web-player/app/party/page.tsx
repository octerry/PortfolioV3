'use client'

import { useSearchParams } from "next/navigation"

export default function Party() {
    const searchParams = useSearchParams()
    const code = searchParams.get('code');

    return (
        <h1>{code}</h1>
    )
}