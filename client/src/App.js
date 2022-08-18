import { Routes, Route } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';
import { ItemProvider } from './contexts/ItemContext';

import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Catalog from './components/Catalog/Catalog';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import PrivateRoute from "./components/common/PrivateRoute";
import CreateItem from './components/CreateItem/CreateItem';
import ItemDetails from "./components/ItemDetails/ItemDetails";
import ItemOwner from "./components/common/ItemOwner";
import EditItem from './components/EditItem/EditItem';

function App() {
    return (
        <AuthProvider>
            <div id="box">
                <Header />
                {/* Main Content */}
                <ItemProvider>
                    <main id="main-content">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/catalog" element={<Catalog />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/create" element={(
                                <PrivateRoute>
                                    <CreateItem />
                                </PrivateRoute>)} />
                            <Route path="/catalog/:itemId" element={<ItemDetails />} />
                            <Route element={<ItemOwner />}>
                                <Route path="/catalog/:itemId/edit" element={<EditItem />} />
                            </Route>
                        </Routes>
                    </main>
                </ItemProvider>
            </div>
        </AuthProvider>
    );
}

export default App;
