import { BrowserRouter, Link } from 'react-router-dom';
import './App.css';
import AppRouter from './router/AppRouter';

function App() {
    return (
        <BrowserRouter>
            <AppRouter/>
            <button type="button" className="btn btn-success"><Link className="text-white" to="/password-generator"> TO GENERATOR </Link></button>
        </BrowserRouter>
    );
}

export default App;
