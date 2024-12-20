"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Replace with Next.js useRouter
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUser, setUser } from "../../store/reducers/userSlice";
import Profile from "@/components/account/EditProfile";
import Orders from "@/components/admin/OrdersTable";

const tabs = ["Profile", "My Orders", "Log Out"];

function MyAccount() {
  const dispatch = useDispatch();
  const router = useRouter(); // Initialize useRouter
  const currentUser = useSelector(selectCurrentUser);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    if (!currentUser) {
      router.push("/authentication"); // Use Next.js router to navigate
    }
  }, [currentUser, router]);

  const handleTabClick = (index) => {
    if (index === 2) {
      dispatch(setUser(null));
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
          </div>
        </div>
      )}
    </>
  );
}

export default MyAccount;
