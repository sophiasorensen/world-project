import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Navbar } from "./Navbar";
import { CountryTable } from "./CountryTable";

function App() {
    return (
        <div className="global-margin">
            <Router>
                <Navbar />
                <CountryTable />
            </Router>
        </div>
    );
}

export default App;
