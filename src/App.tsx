import { Routes, Route } from 'react-router-dom';
import { Header} from './components/Header/Header';
import { ProductList } from './components/ProductList/ProductList';
import { Tablets } from './components/Tablets/Tablets';
import { Basket } from './components/Basket/Basket';
import { ProductView } from './components/ProductView/ProductView';
import { EditItem } from './components/EditItem/EditItem';
import { AddProduct } from './components/AddProduct/AddProduct';


export const App: React.FC = () => (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route path='/phones' element={<ProductList />}/>
        <Route path="/phones/:phoneId" element={<ProductView />} />
        <Route path="/phones/:phoneId/edit" element={<EditItem />} />
        <Route path='/tablets' element={<Tablets />}/>
        <Route path='/basket' element={<Basket />}/>
        <Route path='/add' element={<AddProduct />}/>
      </Route>
    </Routes>
)

export default App
