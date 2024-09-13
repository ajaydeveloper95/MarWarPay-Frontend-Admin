import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { SidebarProvider } from './Context/SidebarContext';
import AddMembers from './Components/Tables/Members/AddMembers';
import ViewAllMembers from './Components/Tables/Members/ViewAllMembers';
import MasterDistributor from './Components/Tables/Members/MasterDistributor';
import Retailer from './Components/Tables/Members/Retailer';
import Distributor from './Components/Tables/Members/Distributor';
import ApiMember from './Components/Tables/Members/ApiMember';
import Users from './Components/Tables/Members/Users';
import Sidebar from './Components/sidebar/Sidebar';
import Payout from './Components/Tables/Reports/Payout';
import BalanceRpt from './Components/Tables/Reports/BalanceRpt';
import Qr from './Components/Tables/Reports/Qr';
import Payin from './Components/Tables/Reports/Payin';
import MemberWlt from './Components/Tables/UpiWallet/MemberWlt';
import Transfer from './Components/Tables/UpiWallet/Transfer';
import AddPackage from './Components/Tables/Package/AddPackage';
import ViewPackage from './Components/Tables/Package/ViewPackage';
import PayoutCharge from './Components/Tables/Setting/PayoutCharge';
import DashBoard from './Pages/DashBoard';
import Footer from './Components/footer/Footer';
import Profile from './Components/profile/Profile';
import PayoutGenerate from './Components/Tables/Reports/PayoutGenerate';
import EditMember from './Components/Tables/Updates/EditMember';
import Login from './Components/Login/Login';
import EditPackage from './Components/Tables/Updates/EditPackage';
import PrivateRoute from './Components/PrivateRoute'; // Import the PrivateRoute component
import Panding from './Components/Tables/Support/Panding';
import ViewAll from './Components/Tables/Support/ViewAll';
import { Update } from '@mui/icons-material';

function App() {
  return (
    <SidebarProvider>
      <Router>
        <Routes>
          {/* Public route */}
          <Route path="/" element={<Login />} />

          {/* Private routes */}
          <Route element={<PrivateRoute />}>
            <Route
              path="/*"
              element={
                <>
                  <Sidebar />
                  <Routes>
                    {/* Dashboard route */}
                    <Route path="/dashboard" element={<DashBoard />} />
                    <Route path="/updateProfile" element={<Profile />} />

                    {/* Member routes */}
                    <Route path="members/addMembers" element={<AddMembers />} />
                    <Route path="members/all_members" element={<ViewAllMembers />} />
                    <Route path="member/EditMember/:id" element={<EditMember />} />
                    <Route path="members/master_distributor" element={<MasterDistributor />} />
                    <Route path="members/retailer" element={<Retailer />} />
                    <Route path="members/distributor" element={<Distributor />} />
                    <Route path="members/api_member" element={<ApiMember />} />
                    <Route path="members/users" element={<Users />} />

                    {/* Report routes */}
                    <Route path="report/payout" element={<Payout />} />
                    <Route path="report/payoutGenerate" element={<PayoutGenerate />} />
                    <Route path="report/balance" element={<BalanceRpt />} />
                    <Route path="report/Qr" element={<Qr />} />
                    <Route path="report/payin" element={<Payin />} />

                    {/* UPI wallet routes */}
                    <Route path="upi-wallet/configure" element={<MemberWlt />} />
                    <Route path="upi-wallet/transactions" element={<Transfer />} />

                    {/* Package Management routes */}
                    <Route path="package/add" element={<AddPackage />} />
                    <Route path="package/view" element={<ViewPackage />} />
                    <Route path="/package/EditPackage/:id" element={<EditPackage />} />

                    {/* Support routes */}
                    <Route path="/support/pandingTicket" element={<Panding />} />
                    <Route path="/support/allTicket" element={<ViewAll />} />
                    <Route path="/support/ticketStatus" element={<Update />} />

                    {/* Settings route */}
                    <Route path="settings/payoutCharge" element={<PayoutCharge />} />
                  </Routes>
                  <Footer />
                </>
              }
            />
          </Route>

          {/* Redirect all unknown routes to login */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </SidebarProvider>
  );
}

export default App;
