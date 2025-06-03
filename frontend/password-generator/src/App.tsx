import { BrowserRouter} from 'react-router-dom';
import './App.css';
import AppRouter from './router/AppRouter';
//import { RoutePaths } from './router/RoutePaths';

function App() {
    return (
        <BrowserRouter>
            <AppRouter/>
        </BrowserRouter>
    );
}

export default App;
