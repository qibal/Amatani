

'use client' // Error boundaries must be Client Components

import Image from 'next/image'
import { useEffect } from 'react'

export default function Error({ error, reset }) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <div>
            <h2>Aduhh Error</h2>
            <Image src={'/public/FE/error.gif'} width={200} height={100} alt="error" />
            <button
                onClick={
                    // Attempt to recover by trying to re-render the segment
                    () => reset()
                }
            >
                Try again
            </button>
        </div>
    )
}