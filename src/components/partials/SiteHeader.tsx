"use client";

import { signIn, signOut } from "next-auth/react";
import Link from "next/link";

type SiteHeaderProps = {
    isSignedIn: boolean
}

const SiteHeader = ({ isSignedIn = false }: SiteHeaderProps): JSX.Element => {
    return (
        <header
            className="flex justify-between"
        >
            <Link href = "/" className="logo">
                TimeDune
            </Link>

            { (isSignedIn) ?
                <div className="flex justify-center">
                    <Link href = "/create"
                        className="px-4 py-4 block"
                    >
                        Create
                    </Link>
                    <button
                        type = "button"
                        onClick = { () => signOut() }
                        className="px-4 py-4 block"
                    >
                        Sign Out
                    </button> 
                </div>
                : <button
                    type = "button"
                    onClick = { () => signIn() }
                >
                    Sign In
                </button>
            }

        </header>
    );
}

export default SiteHeader;