import { BrowserRouter, Routes, Route } from 'react-router';
import { IoHome } from "react-icons/io5";
import { FaRegWindowRestore } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import './App.scss';
import Drawer, { MenuItem } from './components/Drawer';
import HomeView from './views/HomeView';
import PopupView from './views/PopupView';
import FormView from './views/FormView';

const menuItems: MenuItem[] = [
  {title: "Home", url: "/", icon: <IoHome />},
  {title: "Popup & Confirm", url: "/popup", icon: <FaRegWindowRestore />},
  {title: "Input Form", url: "/form", icon: <FaEdit />},
]

export default function App() {
  return (
  <div>
    <BrowserRouter>
      <Drawer title="CSS 연습" menuItems={menuItems} />
      <div className="views">
          <Routes>
            <Route path="/" element={<HomeView />} />
            <Route path="/popup" element={<PopupView />} />
            <Route path="/form" element={<FormView />} />
          </Routes>
      </div>
    </BrowserRouter>
  </div> )
}