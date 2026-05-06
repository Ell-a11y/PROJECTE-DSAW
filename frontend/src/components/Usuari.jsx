export default function App() {
    if(localStorage.getItem('token')) {
        return (
            <>
                <button> Usuari </button>
            </>
        );
    }
    return;
};