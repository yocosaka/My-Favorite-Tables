import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddStore from 'src/pages/AddStore';
import Header from '../components/Header';
import Categories from '../pages/Categories/Categories';
import Home from '../pages/Home';
import Maps from '../pages/Maps';
import Places from '../pages/Places';
import Scenes from '../pages/Scenes';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/places" element={<Places />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/scenes" element={<Scenes />} />
        <Route path="/maps" element={<Maps />} />
        <Route path="/maps" element={<Maps />} />
        <Route path="/add-store" element={<AddStore />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
