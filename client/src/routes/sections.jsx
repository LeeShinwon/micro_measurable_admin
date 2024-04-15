import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';
import { NodeInfoProvider } from 'src/providers/nodeInfoProviders';

import { NodeView } from 'src/sections/node/view';
import { NodeAddView } from 'src/sections/node/add';
import { NodeModifyView } from 'src/sections/node/modify';

import PrivateRoute from './privateRoute';

export const IndexPage = lazy(() => import('src/pages/app'));
export const ManagerPage = lazy(() => import('src/pages/manager'));
export const NodePage = lazy(() => import('src/pages/node'));
export const ErrorDataPage = lazy(() => import('src/pages/errorData'));
export const RawDataPage = lazy(() => import('src/pages/rawData'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));


// ----------------------------------------------------------------------

export default function Router() {


  const routes = useRoutes([
    {
      element: <PrivateRoute element= {(
        <DashboardLayout>
          <NodeInfoProvider>
            <Suspense>
              <Outlet />
            </Suspense>
          </NodeInfoProvider>
        </DashboardLayout>
      )} />,
      children: [
        { element: <IndexPage />, index: true},
        { path: 'errorData', element: <ErrorDataPage /> },
        { path: 'rawData', element: <RawDataPage /> },
        { path: 'manager', element: <ManagerPage /> },
        { 
          path: 'node', 
          element: <NodePage />, 
          children: [
            { path: '', element: <NodeView />},
            { path: 'add', element: <NodeAddView />},
            { path: 'modify', element: <NodeModifyView />},
          ]
        },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
