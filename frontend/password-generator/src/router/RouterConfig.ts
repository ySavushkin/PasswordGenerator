import { JSX } from 'react';
import { RoutePaths } from './RoutePaths';

export interface RouterConfig {
    title: string;
    path: RoutePaths;
    element: JSX.Element;
}
