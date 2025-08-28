import { useSelector } from 'react-redux';
import { logout } from '../redux/userSlice';
import { useDispatch } from 'react-redux';

export const UserHome = () => {
  const dispatch = useDispatch()


  const {username,auth,id} = useSelector((state) => state.user); 

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
  <div className="bg-white p-8 rounded-2xl shadow-lg max-w-sm w-full text-center space-y-6">
    <h2 className="text-2xl font-bold text-gray-800">
      Welcome, {username || 'User'}
    </h2>

    <div className="space-y-4">

      <button
        onClick={() => dispatch(logout())}
        className="w-full bg-red-500 text-white py-2 rounded-xl hover:bg-red-600 transition duration-300"
      >
        Logout
      </button>
    </div>
  </div>
</div>
  );
};
