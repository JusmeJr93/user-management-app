/* eslint-disable react/prop-types */
import { Button } from "react-bootstrap";
import { FaUserEdit } from "react-icons/fa";
import { RiDeleteBin2Line } from "react-icons/ri";
import { TbLock, TbLockOpen2 } from "react-icons/tb";

const AdminActions = ({
  adminActions: {
    handleAdminEditUser,
    selectedUsers,
    handleBulkAction,
    isActionDisabled,
  },
}) => {
  return (
    <div className="d-flex gap-3">
      <Button
        variant="primary"
        title="Click to Edit"
        className="fs-5 d-flex gap-2"
        onClick={handleAdminEditUser}
        disabled={selectedUsers.length !== 1}
      >
        <FaUserEdit className="align-self-center" />
      </Button>
      <Button
        variant="danger"
        className="fs-5 d-flex gap-2"
        title="Click to Block"
        onClick={() => handleBulkAction("block")}
        disabled={isActionDisabled}
      >
        <TbLock className="align-self-center" />
      </Button>
      <Button
        variant="secondary"
        title="Click to Unblock"
        onClick={() => handleBulkAction("unblock")}
        disabled={isActionDisabled}
      >
        <TbLockOpen2 className="fs-4" />
      </Button>
      <Button
        variant="danger"
        title="Click to Delete"
        onClick={() => handleBulkAction("delete")}
        disabled={isActionDisabled}
      >
        <RiDeleteBin2Line className="fs-4" />
      </Button>
    </div>
  );
};

export default AdminActions;
