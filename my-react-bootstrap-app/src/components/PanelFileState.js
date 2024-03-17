import React from "react";
import { Card } from "react-bootstrap";
import "./PanelFile.component.css";
import { saveData, deleteUploads as deleteUploadsAPI } from "../utils/api";
import ButtonBase from "./ButtonBase";
import ButtonUpload from "./ButtonUpload";
import ButtonUploadFolder from "./ButtonUploadFolder";
import PropTypes from "prop-types";

export default function PanelFileState({ data, refreshData, refreshImage }) {
  // Wrapped function to handle deletion with UI feedback (e.g., reloading)
  const deleteUploads = async () => {
    try {
      await deleteUploadsAPI();
      refreshData();
      refreshImage();
      alert("Folder deleted successfully");
    } catch (error) {
      alert("Failed to delete the folder");
    }
  };

  // Wrapped function for handleSave to use in the UI
  const handleSave = () => {
    saveData(data)
      .then((serverData) => console.log(serverData))
      .catch((error) => console.error("Error:", error));
  };

  return (
    <Card className="custom-glassy">
      <Card.Header>File State</Card.Header>
      <Card.Body>
        <div className="custom-grid">
          <ButtonUpload refreshData={refreshData} refreshImage={refreshImage} />
          <ButtonUploadFolder
            refreshData={refreshData}
            refreshImage={refreshImage}
          />
          <ButtonBase text="Download From Cloud" disabled />
          <ButtonBase text="Purge Upload" onClick={deleteUploads} />
          <ButtonBase text="Save File" onClick={handleSave} />
          <ButtonBase text="Download Folder" disabled />
        </div>
      </Card.Body>
    </Card>
  );
}

PanelFileState.propTypes = {
  data: PropTypes.object.isRequired,
  refreshData: PropTypes.func.isRequired,
  refreshImage: PropTypes.func.isRequired,
};
