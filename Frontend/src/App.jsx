import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Home from './screen/Home';

import Form from "./screen/Form";
function App() {

  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/Form" element={<Form></Form>}></Route>
        </Routes>
      </div>
    </Router>
  )
}

export default App
