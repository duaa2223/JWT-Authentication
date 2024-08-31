// src/App.jsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/signin';
import SignUp from './pages/signup';
import Profile from './pages/profile';
import Home from './pages/Home';
import ProtectedRoute from './componant/protected';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} /> 
        <Route path="/profile" element={
            <ProtectedRoute>
          <Profile />
            </ProtectedRoute>
          } /> 
        

        <Route
          path="/profile/:id"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
