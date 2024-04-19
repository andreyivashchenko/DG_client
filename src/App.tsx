import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import {PersistGate} from 'redux-persist/integration/react';
import AppRouter from './routes/AppRouter';
import {persistor, store} from './store/store';

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <PersistGate persistor={persistor} loading={null}>
                    <AppRouter />
                </PersistGate>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
