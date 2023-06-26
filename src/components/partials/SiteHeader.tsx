"use client";

import { signIn, signOut } from "next-auth/react";
import Link from "next/link";

type SiteHeaderProps = {
    isSignedIn: boolean
}

const SiteHeader = ({ isSignedIn = false }: SiteHeaderProps): JSX.Element => {
    return (
        <header
            className="flex space-between"
        >
            <Link href = "/">
                TimeDune
            </Link>

            { (isSignedIn) ?
                <button
                    type = "button"
                    onClick = { () => signOut() }
                >
                    Sign Out
                </button> :
                <button
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