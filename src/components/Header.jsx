"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { logout, setTokenandUid } from "@/store/slice/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import {
  LogOut,
  User,
  Home as HomeIcon,
  CloudUpload,
  Menu,
  X,
} from "lucide-react";

function Header() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isAuthecticated } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    try {
      dispatch(logout());
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <header className="bg-white shadow-md">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold text-gray-800">
              Appointment
            </Link>
          </div>

          <div className="hidden sm:flex items-center gap-4">
            {isAuthecticated ? (
              <>
                <Link
                  href="/"
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  <HomeIcon size={18} />
                  Home
                </Link>
                <Link
                  href="/schedule-form"
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  <CloudUpload size={18} />
                  Schedule Appointment
                </Link>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href={`/booking`}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  <User size={18} />
                  Book Appointment
                </Link>
                <Link
                  href={`/view`}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  <User size={18} />
                  View Your Appointments
                </Link>
                <Link
                  href="/login"
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </Link>
                {/* <Link
                  href="/signup"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Sign Up
                </Link> */}
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
