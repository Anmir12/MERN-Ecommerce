import { useState } from "react";
import {
  FaSearch,
  FaShoppingBag,
  FaSignInAlt,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { User } from "../types/types";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import toast from "react-hot-toast";

export interface PropsType {
  user:User | null
}
const Header = ({user}:PropsType) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handler = async()=>{
   try {
    await  signOut(auth);
    toast.success("Sign Out Succesfully")
    setIsOpen(false)
   } catch (error) {
    toast.error("Signout Failed")
   }
 
  }
  return (
    <nav className="header">
      <Link onClick={() => setIsOpen(false)} to="/">HOME</Link>
      <Link onClick={() => setIsOpen(false)} to="/Search">
        <FaSearch />
      </Link>
      <Link onClick={() => setIsOpen(false)}  to="/Cart">
        <FaShoppingBag />
      </Link>

      {user?._id ? (
        <>
          <button onClick={() => setIsOpen((prev) => !prev)}>
            <FaUser />
          </button>
          <dialog open={isOpen}>
            <div>
              {user?.role === "admin" && (
                <Link onClick={() => setIsOpen(false)} to="/admin/dashboard">admin</Link>
              )}

              <Link onClick={() => setIsOpen(false)} to="/orders">orders</Link>

              <button onClick={handler}>
                <FaSignOutAlt />
              </button>
            </div>
          </dialog>
        </>
      ) : (
        <Link to="/login">
          <FaSignInAlt />
        </Link>
      )}
    </nav>
  );
};

export default Header;
