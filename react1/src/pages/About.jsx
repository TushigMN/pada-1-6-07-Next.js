import { Link } from "react-router-dom";

export default function About() {
    return (
        <div>
            <h1>About Page</h1>
            <Link to="/">
                <p>go to home page</p>
            </Link>
        </div>
    )
}