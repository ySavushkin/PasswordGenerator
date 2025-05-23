import { Route, Routes } from 'react-router-dom';
import { RouterConfig } from './RouterConfig';
import appRoutes from './AppRoutes';

const AppRouter = () => {
    const pageRoutes = appRoutes.map(({ path, title, element }: RouterConfig) => {
        return <Route key={title} path={`${path}`} element={element} />;
    });

    return <Routes>{pageRoutes}</Routes>;
};

export default AppRouter;
