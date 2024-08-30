import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './Components/Sidebar';
import { SidebarProvider } from './Context/SidebarContext';
import AddMembers from './Components/Tables/AddMembers';
import ViewAllMembers from './Components/Tables/ViewAllMembers';
import Retailer from './Components/Tables/Retailer';
import MasterDistributor from './Components/Tables/MasterDistributor';
import Distributor from './Components/Tables/Distributor';
import Users from './Components/Tables/Users';
import ApiMember from './Components/Tables/ApiMember';
// Import other components and pages

function App() {
  return (
    <SidebarProvider>
      <Router>
        <Sidebar/>
        <Routes>
          <Route path="/members/addMembers" element={<AddMembers/>} />
          <Route path="/members/all_members" element={<ViewAllMembers/>} />
          <Route path="/members/master_distributor" element={<MasterDistributor/>} />
          <Route path="/members/retailer" element={<Retailer/>} />
          <Route path="/members/distributor" element={<Distributor/>} />
          <Route path="/members/api_member" element={<ApiMember/>} />
          <Route path="/members/users" element={<Users/>} />
          
          {/* Define other routes here */}
        </Routes>
      </Router>
    </SidebarProvider>
      
  );
}

export default App;
