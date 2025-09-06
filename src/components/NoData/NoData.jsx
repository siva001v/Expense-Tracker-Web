import { FaRegFolderOpen } from "react-icons/fa";
import "./NoData.scss";

export function NoData() {
  return (
    <div className="no-data">
      <FaRegFolderOpen className="no-data-icon" />
      <p>No Data Found</p>
    </div>
  );
}
