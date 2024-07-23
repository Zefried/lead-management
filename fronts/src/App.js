
import {Routes, Route} from 'react-router-dom';
import { Master } from './Layouts/Admin/master';
import { Clients } from './clients';
import { Template } from './Layouts/Admin/template';
import { Test } from './Layouts/Admin/test';
import { Dashboard } from './Layouts/Admin/dashboard';
import LoginPage from './Auth/login';
import { AddCategory } from './components/admin/categories/add-category';
import { EditCategory } from './components/admin/categories/editCategory';
import { AddClients } from './components/admin/clients/add-clients';
import { EditClients } from './components/admin/clients/edit-clients';

function App() {
  return (
    
    <div>

      <Routes>
        <Route path='/' element={<Clients/>}/> 
        <Route path='login' element={<LoginPage/>}/>

        <Route path='admin' element={<Template/>}>

          <Route path='master' element={<Master/>}/>
          <Route path='test' element={<Test/>}/>
          <Route path='dashboard' element={<Dashboard/>}/>

          {/* components rendering starts from here */}

          {/* admin category routes starts from here */}
          <Route path='add-category' element={<AddCategory/>}/>
          <Route path='edit-category/:id' element={<EditCategory/>}/>
          {/* admin category routes ends here */}


          {/* admin client routes starts from here */}
          <Route path='add-clients' element={<AddClients/>}/>
          <Route path='edit-clients/:id' element={<EditClients/>}/>
          {/* admin client routes ends here */}


        </Route>

      </Routes>

    </div>

  )
}

export default App;
