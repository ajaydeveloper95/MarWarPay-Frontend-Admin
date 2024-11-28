import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { SidebarProvider } from './Context/SidebarContext';
import AddMembers from './Components/Tables/Members/AddMembers';
import ViewAllMembers from './Components/Tables/Members/ViewAllMembers';
import MasterDistributor from './Components/Tables/Members/MasterDistributor';
import Retailer from './Components/Tables/Members/Retailer';
import Distributor from './Components/Tables/Members/Distributor';
import ApiMember from './Components/Tables/Members/ApiMember';
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
import PayoutGenerate from './Components/Tables/Reports/PayoutGenerate';
import EditMember from './Components/Tables/Updates/EditMember';
import Login from './Components/Login/Login';
import EditPackage from './Components/Tables/Updates/EditPackage';
import PrivateRoute from './Components/PrivateRoute';
import Panding from './Components/Tables/Support/Panding';
import ViewAll from './Components/Tables/Support/ViewAll';
import EditTicket from './Components/Tables/Updates/EditTicket';
import My_Wllt from './Components/Tables/E_wallet/My_wllt';
import MemberWllt from './Components/Tables/E_wallet/MemberWllt';
import Cr from './Components/Tables/E_wallet/Cr';
import Dr from './Components/Tables/E_wallet/Dr';
import AllPayout from './Components/Tables/Package_setting/AllPayout';
import UpdatePayout from './Components/Tables/Package_setting/UpdatePayout';
import Settlement from './Components/Tables/UpiWallet/Settlement';
import PayoutSW from './Components/Tables/SwitchingAPI/PayoutSW';
import PayinSW from './Components/Tables/SwitchingAPI/PayinSW';
import UpdatePayin from './Components/Tables/SwitchingAPI/UpdatePayin';
import UpdatePayoutAPI from './Components/Tables/SwitchingAPI/UpdatePayoutAPI';
import AllPayin from './Components/Tables/Package_setting/AllPayin';
import UpdatePayinPkg from './Components/Tables/Package_setting/UpdatePayinPkg';

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

                    {/* Member routes */}
                    <Route path="members/addMembers" element={<AddMembers />} />
                    <Route path="members/all_members" element={<ViewAllMembers />} />
                    <Route path="member/EditMember/:id" element={<EditMember />} />
                    <Route path="members/master_distributor" element={<MasterDistributor />} />
                    <Route path="members/retailer" element={<Retailer />} />
                    <Route path="members/distributor" element={<Distributor />} />
                    <Route path="members/api_member" element={<ApiMember />} />

                    {/* Report routes */}
                    <Route path="report/payout" element={<Payout />} />
                    <Route path="report/payoutGenerate" element={<PayoutGenerate />} />
                    <Route path="report/balance" element={<BalanceRpt />} />
                    <Route path="report/Qr" element={<Qr />} />
                    <Route path="report/payin" element={<Payin />} />

                    {/* UPI wallet routes */}
                    <Route path="upi-wallet/configure" element={<MemberWlt />} />
                    <Route path="upi-wallet/transactions" element={<Transfer />} />
                    <Route path="/upi-wallet/settlement" element={<Settlement/>} />

                    {/* UPI wallet routes */}
                    <Route path="/ewallet-management/my-wallet" element={<My_Wllt />} />
                    <Route path="/ewallet-management/member-wallet" element={<MemberWllt />} />
                    <Route path="/ewallet-management/credit-fund" element={<Cr />} />
                    <Route path="/ewallet-management/debit-fund" element={<Dr />} />
                    

                    {/* Package Management routes */}
                    <Route path="package/add" element={<AddPackage />} />
                    <Route path="package/view" element={<ViewPackage />} />
                    <Route path="/package/EditPackage/:id" element={<EditPackage />} />

                    {/* Package Management routes */}
                    <Route path="/package/settings/payout" element={<AllPayout />} />
                    <Route path="/package/settings/payin" element={<AllPayin />} />
                    <Route path="update-payout/:id" element={<UpdatePayout />} />.
                    <Route path="update-payin/:id" element={<UpdatePayinPkg />} />
                    

                    {/* Support routes */}
                    <Route path="/support/pandingTicket" element={<Panding />} />
                    <Route path="/support/allTicket" element={<ViewAll />} />
                    <Route path="/ticket/ViewTicket/:id" element={<EditTicket />} />

                    {/* Settings route */}
                    <Route path="settings/payoutCharge" element={<PayoutCharge />} />

                     {/* Api Switching routes */}
                     <Route path="/main-setting/payout-switch" element={<PayoutSW />} />
                    <Route path="/main-setting/payin-switch" element={<PayinSW />} />
                    <Route path="/main-setting/viewPayin" element={<UpdatePayin />} />
                    <Route path="/main-setting/viewPayout" element={<UpdatePayoutAPI />} />
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
