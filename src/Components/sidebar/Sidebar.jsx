import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSidebar } from '../../Context/SidebarContext';

const Sidebar = () => {
  const { isSidebarOpen, toggleSidebar } = useSidebar();
  const [isDropdownOpen, setIsDropdownOpen] = useState({});

  const toggleDropdown = (item) => {
    setIsDropdownOpen(prev => ({
      ...prev,
      [item]: !prev[item],
    }));
  };

  return (
    <div>
      {/* Navbar */}
      <div
        className={`fixed top-0 right-0 transition-all duration-300 p-5 text-gray-800 shadow-lg z-50 flex items-center justify-between`}
        style={{ width: isSidebarOpen ? 'calc(100% - 16rem)' : '100%', backgroundColor: 'white' }}
      >
        <img src='/logo.png' className='h-10' alt="Logo" />
        <div className="flex items-center space-x-4">
          <Link to="/profile" className="hover:text-gray-600">
            <span className="material-icons mt-2 text-4xl text-gray-800">
              account_circle
            </span>
          </Link>
          <button
            onClick={toggleSidebar}
            className={`pt-1 text-white ${isSidebarOpen ? 'bg-gray-700' : 'bg-gray-900'} rounded-full`}
          >
            <span className="material-icons text-gray-100">
              {isSidebarOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen text-gray-800 transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} w-64 z-40 overflow-y-auto`}
        style={{ backgroundColor: 'white', borderRight: '1px solid #e0e0e0' }}
      >
        <div className="flex-1 mt-5">
          <ul className="space-y-2">
            <img src="/logo.png" alt="Logo" className="h-30 mt-3" />
            {/* Dashboard */}
            <li>
              <Link to="/" className="flex items-center px-4 py-2 hover:bg-gray-100">
                <span className={`material-icons mr-2 text-gray-800 ${!isSidebarOpen && 'text-2xl'}`}>dashboard</span>
                {isSidebarOpen && 'Dashboard'}
              </Link>
            </li>

            {/* Members with Dropdown */}
            <li>
              <button
                onClick={() => toggleDropdown('members')}
                className="flex items-center px-4 py-2 hover:bg-gray-100 w-full text-left"
              >
                <span className={`material-icons mr-2 text-gray-800 ${!isSidebarOpen && 'text-2xl'}`}>people</span>
                {isSidebarOpen && 'Members'}
                <span className={`material-icons ml-auto transition-transform ${isDropdownOpen['members'] ? 'rotate-180' : 'rotate-0'}`}>
                  arrow_drop_down
                </span>
              </button>
              {isDropdownOpen['members'] && isSidebarOpen && (
                <div className='m-5'>
                  <ul className="pl-6 bg-gray-50">
                    <li>
                      <Link to="/members/addMembers" className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100">
                        Add Member
                      </Link>
                    </li>
                    <li>
                      <Link to="/members/all_members" className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100">
                        View All Member
                      </Link>
                    </li>
                    <li>
                      <Link to="/members/master_distributor" className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100">
                        Master Distributor
                      </Link>
                    </li>
                    <li>
                      <Link to="/members/distributor" className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100">
                        Distributor
                      </Link>
                    </li>
                    <li>
                      <Link to="/members/retailer" className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100">
                        Retailer
                      </Link>
                    </li>
                    <li>
                      <Link to="/members/api_member" className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100">
                        API Members
                      </Link>
                    </li>
                    <li>
                      <Link to="/members/users" className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100">
                        Users
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </li>

            {/* Invoice Management with Dropdown */}
            <li>
              <button
                onClick={() => toggleDropdown('invoice-management')}
                className="flex items-center px-4 py-2 hover:bg-gray-100 w-full text-left"
              >
                <span className={`material-icons mr-2 text-gray-800 ${!isSidebarOpen && 'text-2xl'}`}>receipt</span>
                {isSidebarOpen && 'Invoice Management'}
                <span className={`material-icons ml-auto transition-transform ${isDropdownOpen['invoice-management'] ? 'rotate-180' : 'rotate-0'}`}>
                  arrow_drop_down
                </span>
              </button>
              {isDropdownOpen['invoice-management'] && isSidebarOpen && (
                <div className='m-5'>
                  <ul className="pl-6 bg-gray-50">
                    <li>
                      <Link to="/invoice-management/pending" className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100">
                        Pending Invoices
                      </Link>
                    </li>
                    <li>
                      <Link to="/invoice-management/paid" className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100">
                        Paid Invoices
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </li>

            {/* Report Section with Dropdown */}
            <li>
              <button
                onClick={() => toggleDropdown('report')}
                className="flex items-center px-4 py-2 hover:bg-gray-100 w-full text-left"
              >
                <span className={`material-icons mr-2 text-gray-800 ${!isSidebarOpen && 'text-2xl'}`}>assessment</span>
                {isSidebarOpen && 'Report'}
                <span className={`material-icons ml-auto transition-transform ${isDropdownOpen['report'] ? 'rotate-180' : 'rotate-0'}`}>
                  arrow_drop_down
                </span>
              </button>
              {isDropdownOpen['report'] && isSidebarOpen && (
                <div className='m-5'>
                  <ul className="pl-6 bg-gray-50">
                    <li>
                      <Link to="/report/payout" className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100">
                        Payout History
                      </Link>
                    </li>
                    <li>
                      <Link to="/report/Qr" className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100">
                        QR Report
                      </Link>
                    </li>
                    <li>
                      <Link to="/report/payin" className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100">
                        Payin Report
                      </Link>
                    </li>
                    <li>
                      <Link to="/report/balance" className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100">
                        Balance
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </li>

            {/* UPI Method Section with Dropdown */}
            <li>
              <button
                onClick={() => toggleDropdown('upi-wallet')}
                className="flex items-center px-4 py-2 hover:bg-gray-100 w-full text-left"
              >
                <span className={`material-icons mr-2 text-gray-800 ${!isSidebarOpen && 'text-2xl'}`}>payment</span>
                {isSidebarOpen && 'UPI Wallet'}
                <span className={`material-icons ml-auto transition-transform ${isDropdownOpen['upi-wallet'] ? 'rotate-180' : 'rotate-0'}`}>
                  arrow_drop_down
                </span>
              </button>
              {isDropdownOpen['upi-wallet'] && isSidebarOpen && (
                <div className='m-5'>
                  <ul className="pl-6 bg-gray-50">
                    <li>
                      <Link to="/upi-wallet/configure" className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100">
                        Member Wallet
                      </Link>
                    </li>
                    <li>
                      <Link to="/upi-wallet/transactions" className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100">
                        UPI Wallet to E-Wallet Transfer
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </li>

             {/* Package Management Section with Dropdown */}
             {/* <li>
              <button
                onClick={() => toggleDropdown('Package management')}
                className="flex items-center px-4 py-2 hover:bg-gray-100 w-full text-left"
              >
                <span className={`material-icons mr-2 text-gray-800 ${!isSidebarOpen && 'text-2xl'}`}>payment</span>
                {isSidebarOpen && 'Package management'}
                <span className={`material-icons ml-auto transition-transform ${isDropdownOpen['Package management'] ? 'rotate-180' : 'rotate-0'}`}>
                  arrow_drop_down
                </span>
              </button>
              {isDropdownOpen['Package management'] && isSidebarOpen && (
                <div className='m-5'>
                  <ul className="pl-6 bg-gray-50">
                    <li>
                      <Link to="/upi-wallet/configure" className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100">
                        Add Package
                      </Link>
                    </li>
                    <li>
                      <Link to="/upi-wallet/transactions" className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100">
                        View Package
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </li> */}

            {/* Repeat similar blocks for other sections like Employee Management, Reports, etc. */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
