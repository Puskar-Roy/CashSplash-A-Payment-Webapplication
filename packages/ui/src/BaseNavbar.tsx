import { useState } from "react";
import { MdOutlineMenu, MdOutlineClose } from "react-icons/md";
import { ubuntu, alata } from "../../../apps/web/utils/util";
import { HomeIcon, TransactionsIcon, TransferIcon } from "./icons";
import Link from "next/link";
interface AppbarProps {
  name?: string | null;
  onSignin: any;
  onSignout: any;
  sessionStatus?: string | null;
}

const BaseNavbar = ({ onSignin, onSignout, sessionStatus }: AppbarProps) => {
  const [toggle, setToggle] = useState<boolean>(false);
  const changeToggle = () => {
    setToggle(!toggle);
  };
  return (
    <header className="shadow-xl rounded-xl overflow-hidden">
      <nav className="w-[80%] mx-auto flex justify-between py-8">
        <div className={`text-blue-500 font-bold text-3xl ${ubuntu.className}`}>
          CashSplash
        </div>
        <ul onClick={changeToggle} className="sm:hidden">
          {toggle ? (
            <MdOutlineClose className="text-4xl cursor-pointer" />
          ) : (
            <MdOutlineMenu className="text-4xl cursor-pointer" />
          )}
        </ul>
        <ul
          className={`hidden  sm:flex justify-center items-center gap-10 ${alata.className}`}
        >
          {sessionStatus === "unauthenticated" ? null : (
            <>
              <li className="text-lg font-medium cursor-pointer hover:text-blue-500 flex justify-center items-center gap-2">
                <HomeIcon />
                Home
              </li>
              <li className="text-lg font-medium cursor-pointer hover:text-blue-500 ">
                <Link
                  href="/transfer"
                  className="flex justify-center items-center gap-2"
                >
                  <TransferIcon />
                  Transfer
                </Link>
              </li>
              <li className="text-lg font-medium cursor-pointer hover:text-blue-500 ">
                <Link
                  href="/transactions"
                  className="flex justify-center items-center gap-2"
                >
                  <TransactionsIcon />
                  Transactions
                </Link>
              </li>
            </>
          )}

          {sessionStatus === "unauthenticated" ? (
            <li
              className="text-base font-medium cursor-pointer px-4 py-2 bg-blue-500 rounded-lg text-white hover:bg-blue-400"
              onClick={() => onSignin()}
            >
              Login
            </li>
          ) : (
            <li
              className="text-base font-medium cursor-pointer px-4 py-2 bg-blue-500 rounded-lg text-white hover:bg-blue-400"
              onClick={() => onSignout()}
            >
              Logout
            </li>
          )}
        </ul>
      </nav>
      <ul
        className={
          toggle
            ? `w-screen absolute  text-center flex sm:hidden flex-col gap-10 p-10 bg-blue-50 rounded  ${alata.className}`
            : "hidden"
        }
      >
        {sessionStatus === "unauthenticated" ? null : (
          <>
            <li className="text-lg font-medium cursor-pointer hover:text-blue-500">
              Home
            </li>
            <li className="text-lg font-medium cursor-pointer hover:text-blue-500">
              About
            </li>
            <li className="text-lg font-medium cursor-pointer hover:text-blue-500">
              Contact
            </li>
          </>
        )}

        {sessionStatus === "unauthenticated" ? (
          <li
            className="text-lg font-medium cursor-pointer p-3 bg-blue-500 rounded-xl text-white hover:bg-blue-400"
            onClick={() => onSignin()}
          >
            Login
          </li>
        ) : (
          <li
            className="text-lg font-medium cursor-pointer p-3 bg-blue-500 rounded-xl text-white hover:bg-blue-400"
            onClick={() => onSignout()}
          >
            Logout
          </li>
        )}
      </ul>
    </header>
  );
};

export default BaseNavbar;
