import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSidebar } from "../../Context/SidebarContext";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SettingsIcon from "@mui/icons-material/Settings";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import axios from "axios";
import { domainBase } from "../../helpingFile";

const API_ENDPOINT_LOGOUT = `${domainBase}apiAdmin/v1/user/logout`;

const Sidebar = () => {
  const { isSidebarOpen, toggleSidebar } = useSidebar();
  const [isDropdownOpen, setIsDropdownOpen] = useState({});
  const [profileMenuVisible, setProfileMenuVisible] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location
  const profileMenuRef = useRef(null); // Ref for the profile menu

  // Function to toggle the profile menu
  const handleProfileClick = () => {
    setProfileMenuVisible((prev) => !prev);
  };

  // Toggle dark mode
  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  // Function to toggle dropdown menus
  const toggleDropdown = (item) => {
    setIsDropdownOpen((prev) => ({
      ...prev,
      [item]: !prev[item],
    }));
  };

  const handleLogoutClick = () => {
    setIsModalOpen(true);
  };

  // Function to confirm logout
  const handleConfirmLogout = async () => {
    setIsModalOpen(false);
    try {
      const token = localStorage.getItem("accessToken");

      // Ensure token is present before making the request
      if (!token) {
        throw new Error("No access token found.");
      }

      await axios.get(API_ENDPOINT_LOGOUT, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Clear tokens from localStorage
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("expirationTime");
      navigate("/");
    } catch (err) {
      console.error(
        "Logout error:",
        err.response ? err.response.data : err.message
      );
    }
  };

  // Function to cancel logout
  const handleCancelLogout = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setProfileMenuVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setProfileMenuVisible(false);
  }, [location]); // Runs whenever the location changes

  return (
    <div>
      {/* Navbar */}
      <div
        className={`fixed top-0 right-0 transition-all duration-300 p-5 text-gray-800 shadow-lg z-50 flex items-center justify-between ${
          isDarkMode ? "bg-gray-600 text-white" : "bg-blue-50 text-gray-800"
        }`}
        style={{
          width: isSidebarOpen ? "calc(100% - 15.5rem)" : "100%",
        }}
      >
         <button
            onClick={toggleSidebar}
            className={`text-white ${
              isSidebarOpen ? "bg-gray-600" : "bg-gray-900"
            } rounded-full`}
          >
            <span className="material-icons text-gray-100 p-1">
              {isSidebarOpen ? "chevron_left" : "menu"}
            </span>
          </button>
        <div className="flex items-center space-x-4">
          <NotificationsIcon
            className={`cursor-pointer text-4xl ${
              isDarkMode ? "text-white" : "text-gray-800"
            }`}
            onClick={() => console.log("Notification Clicked")} // Replace with actual notification handler
          />
          <Brightness4Icon
            className={`cursor-pointer text-4xl ${
              isDarkMode ? "text-yellow-400" : "text-gray-800"
            }`}
            onClick={toggleTheme}
          />
          <div className="relative">
            <span
              className={`material-icons mt-2 text-4xl cursor-pointer ${
                isDarkMode ? "text-white" : "text-gray-800"
              }`}
              onClick={handleProfileClick}
            >
              account_circle
            </span>
            {profileMenuVisible ? (
            <div ref={profileMenuRef}  className={`absolute top-12 right-0 ${isDarkMode ? "bg-gray-700 text-white" : "bg-white text-gray-800"} shadow-lg border border-gray-200 rounded-lg`}>
                {/* <Link
                  to="/updateProfile"
                  className="block px-4 py-2"
                >
                  Profile
                </Link>
                <Link
                  to="/settings"
                  className="block px-4 py-2 "
                >
                  Settings
                </Link> */}
                <button
                  onClick={handleLogoutClick}
                  className="block px-4 py-2 w-full text-left "
                >
                  Logout
                </button>
              </div>
            ) : null }
          </div>
         
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } w-50 z-40 overflow-y-auto ${
          isDarkMode ? "bg-gray-600 text-white" : " text-gray-800"
        }`}
        style={{ borderRight: isDarkMode ? "1px solid #4b4b4b" : "1px solid #e0e0e0" }}
      >
        <div className="flex-1 mt-10">
          <ul className="space-y-2">
          <img src="/logo.png" alt="Logo" className={`h-30 mt-3 mb-5 ${isDarkMode ? "invert" : ""}`} />
            {/* Dashboard */}
            <li>
              <Link
                to="/dashboard"
                className="flex items-center px-4 py-2 "
              >
                <span
                  className={`material-icons mr-2 ${
                    !isSidebarOpen && "text-sm"
                  }`}
                >
                  dashboard
                </span>
                {isSidebarOpen && "Dashboard"}
              </Link>
            </li>

            {/* Members with Dropdown */}
            <li>
              <button
                onClick={() => toggleDropdown("members")}
                className="flex items-center px-4 py-2  w-full text-left"
              >
                <span
                  className={`material-icons mr-2 ${
                    !isSidebarOpen && "text-sm"
                  }`}
                >
                  people
                </span>
                {isSidebarOpen && "Members"}
                <span
                  className={`material-icons ml-auto transition-transform ${
                    isDropdownOpen["members"] ? "rotate-180" : "rotate-0"
                  }`}
                >
                  arrow_drop_down
                </span>
              </button>
              {isDropdownOpen["members"] && isSidebarOpen && (
                <div className="m-5">
                  <ul className="pl-6  list-disc">
                    <li>
                      <Link
                        to="/members/addMembers"
                        className="flex items-center px-4 py-2 "
                      >
                        Add Member
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/members/all_members"
                        className="flex items-center px-4 py-2 "
                      >
                        View All Member
                      </Link>
                    </li>
                    
                  </ul>
                </div>
              )}
            </li>

            {/* Report Section with Dropdown */}
            <li>
              <button
                onClick={() => toggleDropdown("report")}
                className="flex items-center px-4 py-2 w-full text-left"
              >
                <span
                  className={`material-icons mr-2 ${
                    !isSidebarOpen && "text-sm"
                  }`}
                >
                  assessment
                </span>
                {isSidebarOpen && "Report"}
                <span
                  className={`material-icons ml-auto transition-transform ${
                    isDropdownOpen["report"] ? "rotate-180" : "rotate-0"
                  }`}
                >
                  arrow_drop_down
                </span>
              </button>
              {isDropdownOpen["report"] && isSidebarOpen && (
                <div className="m-5">
                  <ul className="pl-6  list-disc">
                    <li>
                      <Link
                        to="/report/payout"
                        className="flex items-center px-4 py-2 "
                      >
                        Payout History
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/report/payoutGenerate"
                        className="flex items-center px-4 py-2 "
                      >
                        Payout Generate
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/report/Qr"
                        className="flex items-center px-4 py-2 "
                      >
                        QR Report
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/report/payin"
                        className="flex items-center px-4 py-2 "
                      >
                        Payin Report
                      </Link>
                    </li>
                    {/* <li>
                      <Link to="/report/balance" className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100">
                        Balance
                      </Link>
                    </li> */}
                  </ul>
                </div>
              )}
            </li>

            {/* UPI Method Section with Dropdown */}
            <li>
              <button
                onClick={() => toggleDropdown("upi-wallet")}
                className="flex items-center px-4 py-2 w-full text-left"
              >
                <span
                  className={`material-icons mr-2 ${
                    !isSidebarOpen && "text-sm"
                  }`}
                >
                  payment
                </span>
                {isSidebarOpen && "UPI Wallet"}
                <span
                  className={`material-icons ml-auto transition-transform ${
                    isDropdownOpen["upi-wallet"] ? "rotate-180" : "rotate-0"
                  }`}
                >
                  arrow_drop_down
                </span>
              </button>
              {isDropdownOpen["upi-wallet"] && isSidebarOpen && (
                <div className="m-5">
                  <ul className="pl-6 list-disc">
                    <li>
                      <Link
                        to="/upi-wallet/configure"
                        className="flex items-center px-4 py-2"
                      >
                        Member Wallet
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/upi-wallet/transactions"
                        className="flex items-center px-4 py-2"
                      >
                        UPI to E-Wallet Transfer
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/upi-wallet/settlement"
                        className="flex items-center px-4 py-2"
                      >
                        Settlemet Amount
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </li>

            {/* E-wallate Method Section with Dropdown */}
            <li>
              <button
                onClick={() => toggleDropdown("ewallet-management")}
                className="flex items-center px-4 py-2 w-full text-left"
              >
                <span
                  className={`material-icons mr-2 ${
                    !isSidebarOpen && "text-sm"
                  }`}
                >
                  account_balance_wallet
                </span>
                {isSidebarOpen && "E-Wallet Management"}
                <span
                  className={`material-icons ml-auto transition-transform ${
                    isDropdownOpen["ewallet-management"]
                      ? "rotate-180"
                      : "rotate-0"
                  }`}
                >
                  arrow_drop_down
                </span>
              </button>
              {isDropdownOpen["ewallet-management"] && isSidebarOpen && (
                <div className="m-5">
                  <ul className="pl-6 list-disc">
                    <li>
                      <Link
                        to="/ewallet-management/my-wallet"
                        className="flex items-center px-4 py-2"
                      >
                        My Wallet
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/ewallet-management/member-wallet"
                        className="flex items-center px-4 py-2"
                      >
                        Member Wallet
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/ewallet-management/credit-fund"
                        className="flex items-center px-4 py-2"
                      >
                        Credit Fund
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/ewallet-management/debit-fund"
                        className="flex items-center px-4 py-2"
                      >
                        Debit Fund
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </li>

            {/* Package Management Section with Dropdown */}
            <li>
              <button
                onClick={() => toggleDropdown("package-management")}
                className="flex items-center px-4 py-2 w-full text-left"
              >
                <span
                  className={`material-icons mr-2 ${
                    !isSidebarOpen && "text-sm"
                  }`}
                >
                  payment
                </span>
                {isSidebarOpen && "Package Management"}
                <span
                  className={`material-icons ml-auto transition-transform ${
                    isDropdownOpen["package-management"]
                      ? "rotate-180"
                      : "rotate-0"
                  }`}
                >
                  arrow_drop_down
                </span>
              </button>
              {isDropdownOpen["package-management"] && isSidebarOpen && (
                <div className="m-5">
                  <ul className="pl-6 list-disc">
                    <li>
                      <Link
                        to="/package/add"
                        className="flex items-center px-4 py-2"
                      >
                        Add Package
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/package/view"
                        className="flex items-center px-4 py-2"
                      >
                        View Package
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </li>

            {/* Package Settings Section with Dropdown */}
<li>
  <button
    onClick={() => toggleDropdown("package-settings")}
    className="flex items-center px-4 py-2 w-full text-left"
  >
    <span
      className={`material-icons mr-2 ${
        !isSidebarOpen && "text-sm"
      }`}
    >
      settings
    </span>
    {isSidebarOpen && "Package Settings"}
    <span
      className={`material-icons ml-auto transition-transform ${
        isDropdownOpen["package-settings"]
          ? "rotate-180"
          : "rotate-0"
      }`}
    >
      arrow_drop_down
    </span>
  </button>
  {isDropdownOpen["package-settings"] && isSidebarOpen && (
    <div className="m-5">
      <ul className="pl-6 list-disc">
        <li>
          <Link
            // to="/package/settings/payin"
            className="flex items-center px-4 py-2"
          >
            Paying
          </Link>
        </li>
        <li>
          <Link
            to="/package/settings/payout"
            className="flex items-center px-4 py-2"
          >
           Payout
          </Link>
        </li>
       
      </ul>
    </div>
  )}
</li>


            {/* support Section with Dropdown */}
            <li>
              <button
                onClick={() => toggleDropdown("support")}
                className="flex items-center px-4 py-2  w-full text-left"
              >
                <span
                  className={`material-icons mr-2 ${
                    !isSidebarOpen && "text-sm"
                  }`}
                >
                  support
                </span>
                {isSidebarOpen && "Support Ticket"}
                <span
                  className={`material-icons ml-auto transition-transform ${
                    isDropdownOpen["support"] ? "rotate-180" : "rotate-0"
                  }`}
                >
                  arrow_drop_down
                </span>
              </button>
              {isDropdownOpen["support"] && isSidebarOpen && (
                <div className="m-5 ">
                  <ul className="pl-6  list-disc">
                    <li>
                      <Link
                        to="/support/pandingTicket"
                        className="flex items-center px-4 py-2"
                      >
                        Panding Ticket
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/support/allTicket"
                        className="flex items-center px-4 py-2 "
                      >
                        All Tickets
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </li>

            {/* Main Settings Section with Dropdown */}
            <li>
              <button
                onClick={() => toggleDropdown("main-setting")}
                className="flex items-center px-4 py-2 w-full text-left"
              >
                <SettingsIcon
                  className={`mr-2 ${
                    !isSidebarOpen && "text-sm"
                  }`}
                />
                {isSidebarOpen && "Main Setting"}
                <ArrowDropDownIcon
                  className={`ml-auto transition-transform ${
                    isDropdownOpen["main-setting"] ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-600 bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Confirm Logout</h2>
            <p className="mb-4">Are you sure you want to logout?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleCancelLogout}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmLogout}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
