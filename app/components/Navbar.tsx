import React from 'react'
import Link from 'next/link'
import {auth, signIn, signOut} from '@/auth'
// import { signOut } from 'next-auth/react'

const Navbar = async () => {
    const session = await auth()

  return (
    <header className='px-5 py-3 shadow-sm bg-white text-black'>
        <nav className='flex justify-between items-center'>
            <Link href="/">
                <h2>Logo</h2>
            </Link>

            <div className='flex items-center gap-5'>
                {session && session?.user ? (
                    <>
                        <Link href='/startup/create'><span>Create</span></Link>

                        <form action={async () => {
                            "use server"
                            await signOut({redirectTo: '/'})}}>
                                <button type='submit'>Logout</button>
                            </form>

                        <Link href={`/user/${session?.id}`}><span>{session?.user?.name}</span></Link>
                    </>
                ) :(
                    <form action={async () => {
                        "use server"
                        await signIn('github')}}>
                            <button type='submit'>Login</button>
                        </form>
                )}
            </div>
        </nav>
    </header>
)
}

export default Navbar