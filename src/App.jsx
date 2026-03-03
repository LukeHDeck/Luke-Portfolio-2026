import { Routes, Route } from 'react-router-dom';
import Landing from './components/Landing';
import MapExperience from './components/MapExperience';
import ScrollExperience from './components/ScrollExperience';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/map" element={<MapExperience />} />
      <Route path="/scroll" element={<ScrollExperience />} />
    </Routes>
  );
}

export default App;
