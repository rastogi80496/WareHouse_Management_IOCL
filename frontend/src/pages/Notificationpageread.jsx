import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllNotifications } from "../features/notificationSlice";
import socket from "../lib/socket";
import TopNavbar from "../Components/TopNavbar";
import image from "../images/user.png";
import FormattedTime from "../lib/FormattedTime ";

function NotificationPageRead() {
  const dispatch = useDispatch();
  const { notifications } = useSelector((state) => state.notification);
  const { Authuser } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getAllNotifications());

    const refresh = () => dispatch(getAllNotifications());

    socket.off("newNotification");
    socket.on("newNotification", refresh);

    return () => {
      socket.off("newNotification", refresh);
    };
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-base-100">
      <TopNavbar />
      <div className="max-w-3xl mx-auto mt-8">
        <h1 className="text-2xl font-bold mb-6">Notifications</h1>

        {notifications.length ? (
          notifications.map((n) => (
            <div
              key={n._id}
              className="flex bg-white p-4 rounded shadow mb-4"
            >
              <img
                src={Authuser?.ProfilePic || image}
                className="w-10 h-10 rounded-full mr-4"
                alt="user"
              />
              <div>
                <h3 className="font-medium">{n.name}</h3>
                <p className="text-sm">{n.type}</p>
                <p className="text-xs text-gray-400 mt-1">
                  <FormattedTime timestamp={n.createdAt} />
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No notifications</p>
        )}
      </div>
    </div>
  );
}

export default NotificationPageRead;
