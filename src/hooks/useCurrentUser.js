import { useEffect, useState } from "react";

const useCurrentUser = (users) => {
  const [userName, setUserName] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userPhoto, setUserPhoto] = useState("");

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (email) {
      const user = users.find((u) => u.email === email);
      if (user) {
        setUserName(user.name.split(" ")[0]);
        setCurrentUser(user);
        setIsAdmin(user.role === "admin");
        setUserPhoto(user.profile_picture);
      }
    }
  }, [users]);

  return { currentUser, userName, isAdmin, userPhoto };
};

export default useCurrentUser;
