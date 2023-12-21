import { Link } from 'react-router-dom';

export const Navbar = () => {
    return (
        <div>
            <Link to="/">🌎 World</Link>
            <Link to="/africa">Africa</Link>
            <Link to="/asia">Asia</Link>
            <Link to="/europe">Europe</Link>
            <Link to="/northAmerica">NorthAmerica</Link>
            <Link to="/oceania">Oceania</Link>
            <Link to="/southAmerica">South America</Link>
        </div>
    );
}

// function Navbar() {
//     return (
//         <div className="Navbar">
//             <h1 className="title">🌎 World</h1>
//             <Continent name = "North America" />
//         </div>
//     );
// }
// const Continent = (props) => {
//     return (
//         <div>
//             <h2> {props.name}</h2>
//         </div>
//     );
// };
//
// export default Navbar;