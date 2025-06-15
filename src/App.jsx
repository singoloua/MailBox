import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './components/Pages/Homepage';
import Inboxpage from './components/Pages/Inboxpage';
import Messagepage from './components/Pages/Messagepage';


export default function App() {
  return (
    <Router>
      <div className='bg'>
        <div className='bg_2' />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/inbox" element={<Inboxpage />} />
          <Route path="/messages" element={<Messagepage />} />
        </Routes>
      </div>
    </Router>
  );
}
