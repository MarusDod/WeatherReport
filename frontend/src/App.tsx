import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BackendProvider from './lib/backendProvider';
import Login from './components/Login';
import Layout from './Layout';
import Homepage from './Homepage';
import Signup from './components/FormModal';
import MyToast from './components/MyToast';
import { Provider as ReduxProvider } from 'react-redux';
import store from './lib/store';
import { CookiesProvider } from 'react-cookie';

function App() {

  return (
    <div className='App'>
      <ReduxProvider store={store}>
          <MyToast />
          <BackendProvider>
            <CookiesProvider>
              <BrowserRouter basename=''>
                <Routes>
                  <Route path='/' element={<Homepage />} />
                </Routes>
              </BrowserRouter>
            </CookiesProvider>
          </BackendProvider>
      </ReduxProvider>
    </div>
  );
}

export default App;
