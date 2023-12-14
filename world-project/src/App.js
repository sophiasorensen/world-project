import './App.css';

function App() {
  return (
    <div className="App">
        <h1 className="title"> World</h1>
        <Continent name = "North America" />
    </div>
  );
}
const Continent = (props) => {
    return (
      <div>
          <h2> {props.name}</h2>
      </div>
    );
};

export default App;
