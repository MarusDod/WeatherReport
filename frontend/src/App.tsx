import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BackendProvider from './lib/backendProvider';
import Login from './Login';
import Layout from './Layout';
import Homepage from './Homepage';

function App() {
  return (
    <div className='App'>
      <Layout>
        <BackendProvider>
          <BrowserRouter basename=''>
            <Routes>
              <Route path='/' element={<Homepage />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" />
              <Route path="weather" />
            </Routes>
          </BrowserRouter>
        </BackendProvider>
      </Layout>
    </div>
  );
}

export default App;
