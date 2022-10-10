import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from '../components/Header';
import Home from '../pages/Home';
import Places from '../pages/Places';
import Categories from '../pages/Categories/Categories';
import Scenes from '../pages/Scenes';
import Maps from '../pages/Maps';

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
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
