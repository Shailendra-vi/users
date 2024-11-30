import { useEffect, useState } from 'react';
import UserTable from './components/UserTable';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setUsers } from './redux/slices/usersSlice';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserDetails from './components/UserDetails';
import { URL } from './config';

function App() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const dispatch = useDispatch()
  const userList = useSelector((state) => state?.data?.users);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await axios.get(URL);
        if (response?.data?.length) {
          dispatch(setUsers(response.data));
        }
      } catch (error) {
        console.error("Failed to fetch users:", error);
        setError(error?.message)
      }
      setLoading(false)
    }
    if (!userList?.length)
      fetchData()
  }, [])

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<UserTable loading={loading} error={error} />} />
          <Route path="/user/:id" element={<UserDetails />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
