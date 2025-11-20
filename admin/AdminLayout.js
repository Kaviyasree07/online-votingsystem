import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="container mt-3">
      <h2 className="text-center mb-3">⚙ Admin Panel</h2>
      <Outlet />
    </div>
  );
}
