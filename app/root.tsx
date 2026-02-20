import {
    Link,
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
} from "@remix-run/react";
import "./index.css";

export function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <Meta />
                <Links />
            </head>
            <body>
                <nav className="navbar">
                    <div className="container">
                        <Link to="/" className="logo">Smart Portal</Link>
                        <div className="nav-links">
                            <Link to="/">Dashboard</Link>
                            <Link to="/requests/new">New Request</Link>
                            <Link to="/login" className="login-btn">Login</Link>
                        </div>
                    </div>
                </nav>
                <main className="container">
                    {children}
                </main>
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    );
}

export default function App() {
    return <Outlet />;
}
