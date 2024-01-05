import { Spinner } from "@blueprintjs/core";
import "./App.css"

export default function LoadingPage({ className }) {
    return (
        <Spinner className={ className }/>
    );
}