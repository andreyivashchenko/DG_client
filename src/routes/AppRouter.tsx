import {Link, Route, Routes} from 'react-router-dom';
import {useAppSelector} from '../hooks/useAppSelector';
import Layout from '../pages/layout';
import ClientLayout from '../components/client/layout';
import {publicRoutes, adminRoutes, driverRoutes, clientRoutes} from './routerPath';
import type {Roles} from '../types/User';

const AppRouter = () => {
    const {user} = useAppSelector((store) => store.auth);
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                {publicRoutes.map((route) => (
                    <Route path={route.path} element={route.element} key={route.path} />
                ))}

                {/* FIXME: после теста добавить проверку приватности админа */}
                {true
                    ? adminRoutes.map((route) => <Route path={route.path} element={route.element} key={route.path} />)
                    : adminRoutes.map((route) => (
                          <Route
                              path={route.path}
                              element={
                                  <div>
                                      У вас нет доступа к странице админа!
                                      <Link to={'/'}>Вернуться на главную</Link>
                                  </div>
                              }
                              key={route.path}
                          />
                      ))}

                {/* FIXME: после теста добавить проверку приватности водителя */}
                {true
                    ? driverRoutes.map((route) => <Route path={route.path} element={route.element} key={route.path} />)
                    : driverRoutes.map((route) => (
                          <Route
                              path={route.path}
                              element={
                                  <div>
                                      У вас нет доступа к странице водителя!
                                      <Link to={'/'}>Вернуться на главную</Link>
                                  </div>
                              }
                              key={route.path}
                          />
                      ))}

                {/* FIXME: после теста добавить проверку приватности клиента */}
                {true ? (
                    <Route path="/client" element={<ClientLayout />}>
                        {clientRoutes.map((route) => (
                            <Route path={route.path} element={route.element} key={route.path} />
                        ))}
                    </Route>
                ) : (
                    clientRoutes.map((route) => (
                        <Route
                            path={route.path}
                            element={
                                <div>
                                    У вас нет доступа к странице клиента!
                                    <Link to={'/'}>Вернуться на главную</Link>
                                </div>
                            }
                            key={route.path}
                        />
                    ))
                )}
            </Route>

            <Route
                path="*"
                element={
                    <div>
                        Not Found
                        <br />
                        <Link to={'/'}>Вернуться на главную</Link>
                    </div>
                }
            />
        </Routes>
    );
};

export default AppRouter;
