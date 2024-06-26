import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopNav from './TopNav';

export default function MainContainer() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="ml-[260px] w-full shadow">
        <TopNav />
        <div className="mt-[80px] mx-4 bg-bg-children-container h-full w-full scroll-smooth">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
