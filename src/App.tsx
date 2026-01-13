import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from '@/pages/HomePage';
import { SetupPage } from '@/pages/SetupPage';
import { HostPage } from '@/pages/HostPage';
import { PlayerPage } from '@/pages/PlayerPage';

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/setup" element={<SetupPage />} />
        <Route path="/game/:data" element={<HostPage />} />
        <Route path="/play/:data" element={<PlayerPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
