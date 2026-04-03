import { useAuth } from "../context/AuthContext";

function ProfilePage() {
  const { user } = useAuth();

  return (
    <div className="pt-24 p-10">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>

      <div className="bg-white p-6 shadow rounded max-w-md">
        <p><strong>User ID:</strong> {user?.id}</p>
        <p><strong>Expires:</strong> {new Date(user?.exp * 1000).toLocaleString()}</p>
      </div>
    </div>
  );
}

export default ProfilePage;