import { Route, Routes } from 'react-router-dom';
import { RouterConfig } from './RouterConfig';
import appRoutes from './AppRoutes';
import SecurityResearch from '../pages/MathAnalysisService/SecurityResearch';
import { RoutePaths } from './RoutePaths';

const AppRouter = () => {
    const pageRoutes = appRoutes.map(({ path, title, element }: RouterConfig) => {
        return <Route key={title} path={`${path}`} element={element} />;
    });

    return <Routes>
        {pageRoutes}
        <Route path={RoutePaths.RESEARCH} element={<SecurityResearch/>} />
    </Routes>;
};

export default AppRouter;
