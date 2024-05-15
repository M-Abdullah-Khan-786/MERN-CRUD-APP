import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import "./create.css";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
  });

  const handleInput = (e) => {
    let { name, value } = e.target;

    setUser({ ...user, [name]: value });
    // console.log(user);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/v1/user/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: await JSON.stringify(user),
      });
      const data = await response.json();
      if (response.ok) {
        setUser({
          first_name: "",
          last_name: "",
          email: "",
          phone: "",
        });
        navigate("/");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("error:", error.message);
    }
  };

  return (
    <>
      <div className="createUser">
        <Link to={"/"}>
          <BiArrowBack />
        </Link>
        <h1>Create User</h1>
        <form onSubmit={submitForm}>
          <div className="inputdata">
            <label htmlFor="first_name">First Name</label>
            <input
              type="text"
              id="first_name"
              value={user.first_name}
              onChange={handleInput}
              name="first_name"
              autoComplete="off"
              placeholder="First Name"
            />
          </div>
          <div className="inputdata">
            <label htmlFor="last_name">Last Name</label>
            <input
              type="text"
              id="last_name"
              value={user.last_name}
              onChange={handleInput}
              name="last_name"
              autoComplete="off"
              placeholder="Last Name"
            />
          </div>
          <div className="inputdata">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={user.email}
              onChange={handleInput}
              name="email"
              autoComplete="off"
              placeholder="Email Address"
            />
          </div>
          <div className="inputdata">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              value={user.phone}
              onChange={handleInput}
              name="phone"
              autoComplete="off"
              placeholder="Phone Number"
            />
          </div>
          <div className="inputdata">
            <button type="submit">Create User</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Create;
