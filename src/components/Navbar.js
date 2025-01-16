'use client'

import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
    const { data: session } = useSession()

    return (
        <nav className="bg-blue-800 text-white shadow-lg">
            <div className="container flex justify-between items-center p-4 mx-auto">
                <h1 className="text-2xl font-bold">i-Spardha</h1>
                {session ? (
                    <button
                        onClick={() => signOut()}
                        className="bg-yellow-500 hover:bg-yellow-400 text-black px-4 py-2 rounded-md"
                    >
                        Logout
                    </button>
                ) : (
                    <div></div>
                    // <Link
                    //   to="/"
                    //   className="hidden md:block bg-yellow-500 hover:bg-yellow-400 text-black px-4 py-2 rounded-md"
                    // >
                    //   Login
                    // </Link>
                )}
            </div>
        </nav>
    );
}
