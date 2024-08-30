// src/components/Sidebar.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSidebar } from '../Context/SidebarContext';

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
        className={`fixed top-0 right-0 transition-all duration-300 bg-gray-700 p-5 text-white shadow-lg z-50`}
        style={{ width: isSidebarOpen ? 'calc(100% - 16rem)' : '100%' }}
      >
        <div className="flex items-center justify-between">
          <h1 className='text-3xl'>Marwarpay info Solutions Private Limited</h1>
          <ul className="flex items-center space-x-4">
            <li>
              <Link to="/profile" className="hover:text-gray-300">
                <span className="material-icons mt-2 text-4xl">
                  account_circle
                </span>
              </Link>
            </li>
            <li>
              <button
                onClick={toggleSidebar}
                className={`pt-1 text-white ${isSidebarOpen ? 'bg-red-500' : 'bg-black'} rounded-full`}
              >
                <span className="material-icons">
                  {isSidebarOpen ? 'close' : 'menu'}
                </span>
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Sidebar */}
      {isSidebarOpen && (
        <div
          className={`fixed top-0 left-0 h-screen text-white bg-gray-700 transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} w-64 z-40 overflow-y-auto`}
        >
          {/* Sidebar Content */}
          <div className="flex-1 mt-5">
            <ul className="space-y-2">
              <img src="/logo.png" alt="Logo" className="h-30 mt-3" />
              {/* Dashboard */}
              <li>
                <Link to="/" className="flex items-center px-4 py-2 hover:bg-gray-600">
                  <span className="material-icons mr-2">dashboard</span>
                  Dashboard
                </Link>
              </li>

              {/* Members with Dropdown */}
              <li>
                <button
                  onClick={() => toggleDropdown('members')}
                  className="flex items-center px-4 py-2 hover:bg-gray-700 w-full text-left"
                >
                  <span className="material-icons mr-2">people</span>
                  Members
                  <span className={`material-icons ml-auto transition-transform ${isDropdownOpen['members'] ? 'rotate-180' : 'rotate-0'}`}>
                    arrow_drop_down
                  </span>
                </button>
                {isDropdownOpen['members'] && (
                  <div className='m-5'>
                    <ul className="pl-6 bg-gray-800">
                      <p className='text-gray-500 '>Member Management:</p>
                      {/* Add links for members here */}
                      <li>
                        <Link to="/members/addMembers" className="flex items-center px-4 py-2 text-white">
                          Add Member
                        </Link>
                      </li>
                      <li>
                        <Link to="/members/all_members" className="flex items-center px-4 py-2 text-white">
                          View All Member
                        </Link>
                      </li>
                      <li>
                        <Link to="/members/master_distributor" className="flex items-center px-4 py-2 text-white">
                          Master Distributor
                        </Link>
                      </li>
                      <li>
                        <Link to="/members/distributor" className="flex items-center px-4 py-2 text-white">
                          Distributor
                        </Link>
                      </li>
                      <li>
                        <Link to="/members/retailer" className="flex items-center px-4 py-2 text-white">
                          Retailer
                        </Link>
                      </li>
                      <li>
                        <Link to="/members/api_member" className="flex items-center px-4 py-2 text-white">
                          API Members
                        </Link>
                      </li>
                      <li>
                        <Link to="/members/users" className="flex items-center px-4 py-2 text-white">
                          Users
                        </Link>
                      </li>
                      {/* Add more links as needed */}
                    </ul>
                  </div>
                )}
              </li>

              {/* Invoice Management with Dropdown */}
              <li>
                <button
                  onClick={() => toggleDropdown('invoice-management')}
                  className="flex items-center px-4 py-2 hover:bg-gray-700 w-full text-left"
                >
                  <span className="material-icons mr-2">receipt</span>
                  Invoice Management
                  <span className={`material-icons ml-auto transition-transform ${isDropdownOpen['invoice-management'] ? 'rotate-180' : 'rotate-0'}`}>
                    arrow_drop_down
                  </span>
                </button>
                {isDropdownOpen['invoice-management'] && (
                  <div className='m-5'>
                    <ul className="pl-6 bg-gray-800">
                      <li>
                        <Link to="/invoice-management/pending" className="flex items-center px-4 py-2 text-white">
                          Pending Invoices
                        </Link>
                      </li>
                      <li>
                        <Link to="/invoice-management/paid" className="flex items-center px-4 py-2 text-white">
                          Paid Invoices
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </li>

              {/* Repeat similar blocks for other sections like Employee Management, Reports, etc. */}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
