
import { Suspense } from "react";
import Movies from "./components/Movies";

export default async function HomePage() {


    return (
        <div className="c-width">
            <Suspense fallback="loading...">
                <Movies />
            </Suspense>
        </div>
    );
}