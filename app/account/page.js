"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; 
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUser, setUser } from "../../store/reducers/userSlice";
import Profile from "@/components/account/EditProfile";
import Orders from "@/components/admin/OrdersTable";
import HistoryOrder from "@/components/account/HistoryOrder";
import ResetPassword from "@/components/account/ResetPassword";

const tabs = ["Profile", "My Orders", "History Orders", "Reset Password", "Log Out"];

function MyAccount() {
  const dispatch = useDispatch();
  const router = useRouter(); 
  const currentUser = useSelector(selectCurrentUser);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    if (!currentUser) {
      router.push("/authentication"); 
    }
  }, [currentUser, router]);

  const handleTabClick = (index) => {
    if (index === 4) {
      dispatch(setUser(null));
      localStorage.removeItem("cartItems");
    }
    setActiveTab(index);
  };

  return (
    <>
      {currentUser && (
        <div className="container account">
          <ul className="account-menu">
            {tabs.map((tab, index) => (
              <li
                key={tab}
                className={index === activeTab ? "active" : ""}
                onClick={() => handleTabClick(index)}
              >
                {tab}
              </li>
            ))}
          </ul>
          <div className="profile-container">
            {activeTab === 0 && <Profile currentUser={currentUser} />}
            {activeTab === 1 && <Orders currentUser={currentUser} />}
            {activeTab === 2 && <HistoryOrder currentUser={currentUser} />}
            {activeTab === 3 && <ResetPassword currentUser={currentUser} />}
          </div>
        </div>
      )}
    </>
  );
}

export default MyAccount;
