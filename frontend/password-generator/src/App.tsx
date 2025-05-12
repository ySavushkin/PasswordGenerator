import { BrowserRouter, Link } from 'react-router-dom';
import './App.css';
import AppRouter from './router/AppRouter';
import { RoutePaths } from './router/RoutePaths';

function App() {
    return (
        <BrowserRouter>
            <AppRouter/>
            <button type="button" className="btn btn-success"><Link className="text-white" to={RoutePaths.PASSWORD_GENERATOR}> TO GENERATOR </Link></button>
        </BrowserRouter>
    );
}

export default App;
