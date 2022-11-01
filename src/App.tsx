import {Routes, Route} from 'react-router-dom';

import { Home } from './pages/Home';
import { Video } from './pages/Video';

const App = () =>{

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="video/:id" element={<Video />}/>
      </Routes>
    </div>
  )
}

export default App;