import Link from "next/link";

export default function Header() {
    return (
        <header className="w-full h-12 c-gray">
            <div className="c-width h-full">    
                <Link href="/upload">upload</Link>
            </div>
        </header>
    );
};