import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Table } from "./Table";

function App() {
    return (
        <div className="global-margin">
            <Router>
                <Navbar />
                <Table />
            </Router>
        </div>
    );
}

export default App;
