import navLinks from '../links/navLinks';
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  return (
    <div className="w-[260px] h-full fixed z-999 bg-side-bar shadow-lg inset-x-0 px-7">
      <div className="w-full h-[70px] flex justify-center items-center">
        <h1 className="font-semibold text-2xl text-white">Stella Car Rental</h1>
      </div>

      <div className="mt-7">
        <div className="h-[80%]">
          <ul className="flex flex-col items-center gap-2 cursor-pointer">
            {navLinks.map((item, index) => (
              <li
                key={index}
                className="hover:bg-secondary-color w-full py-1.5 hover:rounded-md pl-2 text-gray-50"
              >
                <NavLink to={item.path}>
                  <span className="text-gray-50">
                    <i className={item.icon}></i>
                  </span>{' '}
                  {item.display}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
