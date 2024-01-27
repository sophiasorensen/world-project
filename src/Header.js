import "./App.css";

export default function Header({ updateSearchParams }) {
    function updateCountry() {
        updateSearchParams({ continent: null });
    }

    return (
        <h1 className="header spacing-margin" onClick={ updateCountry }>🌎 World Project</h1>
    );
}