import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TopNavbar from "../Components/TopNavbar";
import { IoMdAdd } from "react-icons/io";
import { MdClose } from "react-icons/md";
import image from "../images/user.png";
import {
  createNotification,
  getAllNotifications,
  deleteNotification,
} from "../features/notificationSlice";
import socket from "../lib/socket";
import toast from "react-hot-toast";
import FormattedTime from "../lib/FormattedTime ";

function NotificationPage() {
  const dispatch = useDispatch();
  const { notifications } = useSelector((state) => state.notification);
  const { Authuser } = useSelector((state) => state.auth);

  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    dispatch(getAllNotifications());

    const handleNewNotification = (notification) => {
      toast.custom((t) => (
        <div className="flex items-center p-4 bg-white shadow rounded-lg">
          <img
            src={Authuser?.ProfilePic || image}
            className="w-10 h-10 rounded-full mr-3"
            alt="user"
          />
          <div>
            <p className="font-medium">{notification.name}</p>
            <p className="text-sm text-gray-600">{notification.type}</p>
          </div>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="ml-4 text-xl"
          >
            ×
          </button>
        </div>
      ));
      dispatch(getAllNotifications());
    };

    socket.off("newNotification");
    socket.on("newNotification", handleNewNotification);

    return () => {
      socket.off("newNotification", handleNewNotification);
    };
  }, [dispatch]);

  const submitNotification = (e) => {
    e.preventDefault();
    dispatch(createNotification({ name, type }))
      .unwrap()
      .then(() => {
        toast.success("Notification added");
        setName("");
        setType("");
        setIsFormVisible(false);
      })
      .catch(() => toast.error("Failed"));
  };

  return (
    <div className="min-h-screen bg-base-100">
      <TopNavbar />

      <div className="max-w-3xl mx-auto mt-10">
        <div className="flex justify-between mb-6">
          <h1 className="text-2xl font-bold">Notifications</h1>
          <button
            onClick={() => setIsFormVisible(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            <IoMdAdd className="inline mr-2" />
            Add
          </button>
        </div>

        {isFormVisible && (
          <form
            onSubmit={submitNotification}
            className="bg-white p-6 rounded shadow mb-6"
          >
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Title"
              className="w-full mb-3 p-2 border rounded"
              required
            />
            <textarea
              value={type}
              onChange={(e) => setType(e.target.value)}
              placeholder="Description"
              className="w-full mb-3 p-2 border rounded"
              required
            />
            <button className="bg-blue-600 text-white w-full py-2 rounded">
              Save
            </button>
          </form>
        )}

        <div className="space-y-4">
          {notifications.map((n) => (
            <div
              key={n._id}
              className="flex bg-base-200 p-4 rounded shadow"
            >
              <img
                src={Authuser?.ProfilePic || image}
                className="w-12 h-12 rounded-full mr-4"
                alt="user"
              />
              <div className="flex-1">
                <h3 className="font-semibold">{n.name}</h3>
                <p className="text-sm">{n.type}</p>
                <p className="text-xs text-gray-500">
                  <FormattedTime timestamp={n.createdAt} />
                </p>
              </div>
              <button
                onClick={() => dispatch(deleteNotification(n._id))}
                className="text-red-500"
              >
                <MdClose size={22} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default NotificationPage;
