import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/auth-context';
import navLinks from '../links/navLinks';
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleClickLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="w-[260px] h-full fixed z-999 bg-side-bar shadow-lg inset-x-0 px-7">
      <div className="w-full h-[70px] flex justify-center items-center">
        <h1 className="font-semibold text-2xl text-white">Stella Car Rental</h1>
      </div>

      <div className="h-full flex flex-col mt-7">
        <div className="h-[80%]">
          <ul className="flex flex-col items-center gap-2 cursor-pointer">
            {navLinks.map((item, index) => (
              <NavLink
                to={item.path}
                key={index}
                className="hover:bg-secondary-color w-full py-1.5 hover:rounded-md pl-2 text-gray-50"
              >
                <li>
                  <span className="text-gray-50">
                    <i className={item.icon}></i>
                  </span>{' '}
                  {item.display}
                </li>
              </NavLink>
            ))}
          </ul>
        </div>

        <button
          className="w-full py-1.5 rounded-md hover:bg-gray-700 text-white"
          onClick={handleClickLogout}
        >
          <i className="ri-logout-box-line"></i> Logout
        </button>
      </div>
    </div>
  );
}
