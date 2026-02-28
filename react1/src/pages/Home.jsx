import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div>
            <h1>Home Page</h1>
            <Link to="/about">
                <p>go to about page</p>
            </Link>
        </div>
    )
}