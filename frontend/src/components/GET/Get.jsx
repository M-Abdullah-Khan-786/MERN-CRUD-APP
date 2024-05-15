import { Link } from "react-router-dom";
import "./get.css";
import { IoPersonAddOutline } from "react-icons/io5";
import { FaUserEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Get = () => {
  const [data, setdata] = useState([]);

  const deleteUser = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/user/delete/${id}`,
        {
          method: "DELETE",
        }
      );

      const json = await response.json();
      if (response.ok) {
        toast.success(json.message);
        fetchdata();
      } else {
        toast.error(json.message);
      }
    } catch (error) {
      console.log(`Error Delete: ${error}`);
    }
  };

  const fetchdata = async () => {
    const response = await fetch("http://localhost:8000/api/v1/user/allUsers");
    const jsonData = await response.json();
    setdata(jsonData.users);
  };

  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <>
      <div className="table">
        <Link to={"/create"} className="create-btn">
          Create User <IoPersonAddOutline />
        </Link>
        <table border={1} cellPadding={8} cellSpacing={0}>
          <thead>
            <tr>
              <th>Sr no</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((data, id) => {
              return (
                <tr key={data._id}>
                  <th>{id + 1}</th>
                  <td>{data.first_name}</td>
                  <td>{data.last_name}</td>
                  <td>{data.email}</td>
                  <td>{data.phone}</td>
                  <td className="action-btn">
                    <Link to={`/update/${data._id}`}>
                      <FaUserEdit />
                    </Link>
                    <button onClick={() => deleteUser(data._id)}>
                      <RiDeleteBin6Line />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Get;
