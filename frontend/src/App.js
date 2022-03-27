import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import HeaderOld from "./components/Header copy/Header";
import Homepage from "./screens/Homepage/Homepage";
import Guidepage from "./screens/Guidepage/Guidepage";
import CreateGuide from "./screens/CreateGuide/CreateGuide";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import SideMenu from "./components/SideMenu/SideMenu";
import Mhr from "./screens/Gamepage/Mhr/Mhr";
import Dota2 from "./screens/Gamepage/Dota2/Dota2";
import ViewGuide from "./screens/ViewGuide/ViewGuide";

const App = () => (
  <BrowserRouter>
    <NavBar />
    <main>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/guidepage" element={<Guidepage />}></Route>
        <Route path="/mhr" element={<Mhr />}></Route>
        <Route path="/dota2" element={<Dota2 />}></Route>
        <Route path="/createguide" element={<CreateGuide />}></Route>
        <Route path="/guides/:id" element={<ViewGuide />}></Route>
      </Routes>
    </main>
  </BrowserRouter>
);

export default App;
