

import { BrowserRouter, Routes, Route } from "react-router-dom";
import SocketChat from './Components/SocketChat';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<SocketChat/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
