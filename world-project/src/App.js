import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Navbar } from "./Navbar";

function App() {
    return (
        <div className="App">
            <Router>
                <Navbar />
            </Router>
        </div>
    );
}

export default App;
