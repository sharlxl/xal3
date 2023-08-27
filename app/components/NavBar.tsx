import { useState } from "react";
import { Form, Link } from "@remix-run/react"
import { useOptionalUser } from "~/utils";

export const NavBar = () => {

    const user = useOptionalUser();
    const [searchInput, setSearchInput] = useState("");

    const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(e.target.value)
    }
    const onSubmitSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(searchInput)
    }
    //calssname for multiple similar css
    const LINK_STYLE = "flex rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-yellow-700 shadow-sm hover:bg-yellow-50 sm:px-8"

    return (
        <div className="flex justify-between">
        <div className="flex py-1 gap-2">
            <img className="w-11 h-11 ml-2" src="https://i.pinimg.com/originals/ed/3b/ee/ed3beefd69c83e86241a31c001dd2f1a.png" alt="cat as xal3 icon"/>
            <Link to="/" className={LINK_STYLE}>
                Home
            </Link>
            </div>
            <form className="flex py-1 gap-2" onSubmit={onSubmitSearch}>
                <input type="text" className="border px-4 text-base font-medium shadow-sm" value={searchInput} onChange={onChangeSearchInput}/>
                <button className="border rounded-md px-4 text-base font-medium text-yellow-700 shadow-sm hover:bg-yellow-50 sm:px-8" type="submit">Search!</button>
            </form>
            <div className="flex justify-self-end">
                {user ? (
                    <div className="flex py-1 gap-2">
                        <Link
                            to="/notes"
                            className={LINK_STYLE}
                        >
                            My Notes
                        </Link>
                        <Link
                            to="/mylist"
                            className={LINK_STYLE}
                        >
                            My List
                        </Link>
                        <Form action="/logout" method="post">
                            <button
                                type="submit"
                                className="rounded bg-slate-600 px-4 py-3 text-blue-100 hover:bg-blue-500 active:bg-blue-600"
                            >
                                Logout
                            </button>
                        </Form>
                    </div>
                ) : (
                    <div className="flex py-1 gap-2">
                        <Link
                            to="/join"
                            className={LINK_STYLE}
                        >
                            Sign up
                        </Link>
                        <Link
                            to="/login"
                            className="flex items-center justify-center rounded-md bg-yellow-500 px-4 py-3 font-medium text-white hover:bg-yellow-600"
                        >
                            Log In
                        </Link>
                    </div>
                )}
              </div>
        </div>
    )
}