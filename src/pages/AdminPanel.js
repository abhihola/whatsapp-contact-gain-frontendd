import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminPanel.css"; // Make sure this CSS file exists for styling

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [userDetails, setUserDetails] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/users"`);
      setUsers(response.data);
      setFilteredUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(query) || user.email.toLowerCase().includes(query)
    );
    setFilteredUsers(filtered);
  };

  const handleSelectUser = (userId) => {
    setSelectedUsers((prevSelected) =>
      prevSelected.includes(userId) ? prevSelected.filter((id) => id !== userId) : [...prevSelected, userId]
    );
  };

  const handleDeleteUsers = async () => {
    if (selectedUsers.length === 0) return alert("No users selected.");
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/users/delete", { userIds: selectedUsers }`);
      fetchUsers();
      setSelectedUsers([]);
      alert("Users deleted successfully.");
    } catch (error) {
      console.error("Error deleting users:", error);
    }
  };

  const handleViewUser = (user) => {
    setUserDetails(user);
  };

  const closeUserDetails = () => {
    setUserDetails(null);
  };

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const displayedUsers = filteredUsers.slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage);

  return (
    <div className="admin-panel">
      <h2>Admin Panel</h2>

      <input
        type="text"
        placeholder="Search users..."
        value={searchQuery}
        onChange={handleSearch}
        className="search-bar"
      />

      <button onClick={handleDeleteUsers} className="delete-button">Delete Selected</button>

      <table className="user-table">
        <thead>
          <tr>
            <th>Select</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {displayedUsers.map((user) => (
            <tr key={user._id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedUsers.includes(user._id)}
                  onChange={() => handleSelectUser(user._id)}
                />
              </td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button onClick={() => handleViewUser(user)}>View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button key={index} onClick={() => setCurrentPage(index + 1)} className={currentPage === index + 1 ? "active" : ""}>
            {index + 1}
          </button>
        ))}
      </div>

      {/* User Details Modal */}
      {userDetails && (
        <div className="modal">
          <div className="modal-content">
            <h3>User Details</h3>
            <p><strong>Name:</strong> {userDetails.name}</p>
            <p><strong>Email:</strong> {userDetails.email}</p>
            <p><strong>Role:</strong> {userDetails.role}</p>
            <button onClick={closeUserDetails}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
