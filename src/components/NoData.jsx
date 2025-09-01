import { FaRegFolderOpen } from "react-icons/fa";

export function NoData() {
  return (
    <div className="no-data">
      <FaRegFolderOpen className="no-data-icon" />
      <p>No Data Found</p>
    </div>
  );
}
