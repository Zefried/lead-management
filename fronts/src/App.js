
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
import { StatusMaster } from './components/admin/status master/statusMaster';
import { EditStatusMaster } from './components/admin/status master/edit-status';
import { AddFollowUp } from './components/admin/followUp/addFollowUp';
import { ViewFollowUp } from './components/admin/followUp/viewFollowUp';
import { EditFollowUp } from './components/admin/followUp/editFollowUp';

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

            {/* status master routes starts here  */}
            <Route path='add-status' element={<StatusMaster/>}/>
            <Route path='edit-status/:id' element={<EditStatusMaster/>}/>
            {/* status master routes ends here  */}

            {/* followUp routes starts here  */}
            <Route path='add-followup/:id' element={<AddFollowUp/>}/>
            <Route path='view-followup' element={<ViewFollowUp/>}/>
            <Route path='edit-followup/:id' element={<EditFollowUp/>}/>
       
            {/* followup routes ends routes ends here  */}



        </Route>

      </Routes>

    </div>

  )
}

export default App;
