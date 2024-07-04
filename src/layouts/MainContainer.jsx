import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopNav from './TopNav';

export default function MainContainer() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="ml-[260px] w-full shadow">
        <div className="mt-[20px] flex justify-center bg-bg-children-container h-full w-full scroll-smooth">
          <div className='w-[97%]'>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
