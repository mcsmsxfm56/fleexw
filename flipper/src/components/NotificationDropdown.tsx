import React from "react";

const NotificationDropdown = () => {
  return (
    <div className="dropdown dropdown-end fixed top-0 right-0">
      <label tabIndex={0} className="btn m-1">
        Click
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li>
          <a>Item 1</a>
        </li>
        <li>
          <a>Item 2</a>
        </li>
      </ul>
    </div>
  );
};

export default NotificationDropdown;
