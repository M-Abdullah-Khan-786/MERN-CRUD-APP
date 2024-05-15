import { Link } from "react-router-dom";
import "./update.css";
import { BiArrowBack } from "react-icons/bi";
import { useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Update = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [userData, setUserData] = useState([]);

  const fetchUser = useCallback(async () => {
    try {
      const url = `http://localhost:8000/api/v1/user/${id}`;
      const response = await fetch(url);
      const json = await response.json();
      setUserData(json.user);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  }, [id]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const submitUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/user/update/${userData._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            first_name: userData.first_name,
            last_name: userData.last_name,
            email: userData.email,
            phone: userData.phone,
          }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        toast(data.message);
        navigate("/");
      } else {
        toast(data.message);
      }
    } catch (error) {
      console.log(`Updating Error: ${error}`);
    }
  };

  return (
    <>
      <div className="updateUser">
        <Link to={"/"}>
          <BiArrowBack />
        </Link>
        <h1>Update User</h1>
        <form onSubmit={submitUpdate}>
          <div className="inputdata">
            <label htmlFor="first_name">First Name</label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={userData.first_name}
              onChange={handleInput}
              autoComplete="off"
              placeholder="First Name"
            />
          </div>
          <div className="inputdata">
            <label htmlFor="last_name">Last Name</label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              value={userData.last_name}
              onChange={handleInput}
              autoComplete="off"
              placeholder="Last Name"
            />
          </div>
          <div className="inputdata">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={userData.email}
              onChange={handleInput}
              autoComplete="off"
              placeholder="Email Address"
            />
          </div>
          <div className="inputdata">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={userData.phone}
              onChange={handleInput}
              autoComplete="off"
              placeholder="Phone Number"
            />
          </div>
          <div className="inputdata">
            <button type="submit">Update User</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Update;
