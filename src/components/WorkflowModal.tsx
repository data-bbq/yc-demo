import React, { FC } from 'react';
import { Modal, Button } from 'antd';

import FileFolderImage from "../assets/file-folder.png";
import GoogleDriveImage from "../assets/google-drive.png";
import MicrosoftExcelImage from "../assets/microsoft-excel.png";

interface WorkflowModalProps {
    open: boolean;
    setOpen: (o: boolean) => void;
}

export const WorkflowModal: FC<WorkflowModalProps> = ({ open, setOpen}) => {

  const integrations = [
    { name: "File Upload", iconImage: FileFolderImage, comingSoon: false },
    { name: "Google Drive", iconImage: GoogleDriveImage, comingSoon: false },
    { name: "Microsoft Excel", iconImage: MicrosoftExcelImage, comingSoon: false },

  ];

  return (
    <Modal
      centered
      title="New Workflow Step"
      open={open}
      onCancel={() => setOpen(false)}
      footer={[
        <Button key="cancel" onClick={() => setOpen(false)}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={() => setOpen(false)}>
          OK
        </Button>,
      ]}
    >
      <div className="my-6 flex gap-x-4">
        {integrations.map(integration => (
          <div 
            className="border border-gray-200 border-solid w-20 h-28 rounded flex flex-col justify-center items-center gap-y-2 p-2 cursor-pointer" 
            key={integration.name}
          >
            <img src={integration.iconImage} className="mt-3 w-10" alt="Integration Icon" />
            <span className="h-8 font-extrabold text-gray-600 text-center text-xs">{integration.name}</span>
          </div>
        ))}
      </div>
    </Modal>
  );
};
