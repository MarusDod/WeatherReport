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
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCloud, faCloudRain, faDroplet, faEye, faEyeSlash, faTemperature0, faWater, faWind } from '@fortawesome/free-solid-svg-icons';

library.add(faWind,faCloud,faDroplet,faTemperature0,faCloudRain,faWater,faEye)

function App() {

  return (
    <div className='App'>
      <ReduxProvider store={store}>
          <MyToast />
          <BackendProvider>
              <BrowserRouter basename=''>
                <Routes>
                  <Route path='/' element={<Homepage />} />
                </Routes>
              </BrowserRouter>
          </BackendProvider>
      </ReduxProvider>
    </div>
  );
}

export default App;
