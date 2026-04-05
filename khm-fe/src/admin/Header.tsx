import { useState, useEffect } from "react";

const AdminHeader = () => {
  const [greeting, setGreeting] = useState("");
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const updateTime = () => {
      setDateTime(new Date());
    };
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const hour = dateTime.getHours();
    if (hour < 12) {
      setGreeting("Good morning");
    } else if (hour < 18) {
      setGreeting("Good afternoon");
    } else {
      setGreeting("Good evening");
    }
  }, [dateTime]);

  return (
    <div className="admin-header">
      <div className="content">
        <div className="hello">
          <span className="welcome">
            {greeting}, <span>Eja</span>
          </span>
          <span className="date-time">
            {dateTime.toLocaleDateString()} • {dateTime.toLocaleTimeString()}
          </span>
        </div>
        <div>
          <button className="new">
            <span>New Property</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;