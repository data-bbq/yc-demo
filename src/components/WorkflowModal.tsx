import React, { FC, useState } from 'react';
import { Modal, Button } from 'antd';

import CrunchbaseImage from "../assets/crunchbase.png";
import PitchbookImage from "../assets/pitchbook.png";
import TradingViewImage from "../assets/trading-view.png";
import PolygonImage from "../assets/polygon.png";

import GoogleDriveImage from "../assets/google-drive.png";
import GoogleSheetsImage from "../assets/google-sheets.png";
import GoogleSlidesImage from "../assets/google-slides.png";
import GoogleDocsImage from "../assets/google-docs.png";
import GoogleFormsImage from "../assets/google-forms.png";

import MicrosoftExcelImage from "../assets/microsoft-excel.png";
import MicrosoftWordImage from "../assets/microsoft-word.png";
import MicrosoftTeamsImage from "../assets/microsoft-teams.png";
import MicrosoftOutlookImage from "../assets/microsoft-outlook.png";

import EmailImage from "../assets/email.png";
import SlackImage from "../assets/slack.png";
import SMSImage from "../assets/sms.png";

interface WorkflowModalProps {
    open: boolean;
    setOpen: (o: boolean) => void;
}

export interface IntegrationCategory {
  category: string;
  integrations: Integration[];
}

export interface Integration {
  name: string;
  iconImage: string;
}

export const WorkflowModal: FC<WorkflowModalProps> = ({ open, setOpen}) => {

  const [loading, setLoading] = useState(false);

  const integrationCategories = [
    {
      category: "Financials",
      integrations: [
        {name: "Crunchbase", iconImage: CrunchbaseImage},
        {name: "Pitchbook", iconImage: PitchbookImage},
        {name: "TradingView", iconImage: TradingViewImage},
        {name: "Polygon", iconImage: PolygonImage},
      ]
    },
    { 
      category: "Microsoft", 
      integrations: [
        {name: "Excel", iconImage: MicrosoftExcelImage},
        {name: "Word", iconImage: MicrosoftWordImage},
        {name: "Outlook", iconImage: MicrosoftOutlookImage},
        {name: "Teams", iconImage: MicrosoftTeamsImage}
      ]
    },
    {
      category: "Google",
      integrations: [
        {name: "Drive", iconImage: GoogleDriveImage},
        {name: "Sheets", iconImage: GoogleSheetsImage},
        {name: "Docs", iconImage: GoogleDocsImage},
        {name: "Slides", iconImage: GoogleSlidesImage},
        {name: "Forms", iconImage: GoogleFormsImage}
      ]
    },
    {
      category: "Notifications",
      integrations: [
        {name: "Email", iconImage: EmailImage},
        {name: "SMS", iconImage: SMSImage},
        {name: "Slack", iconImage: SlackImage},
      ]
    }
  ];

  return (
    <Modal
      centered
      title="New Workflow Step"
      open={open}
      onCancel={() => setOpen(false)}
      bodyStyle={{ height: "500px", overflow: 'auto' }}
      footer={[
        <Button key="cancel" onClick={() => setOpen(false)}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={() => setOpen(false)}>
          OK
        </Button>,
      ]}
    >
      <div className="my-6 flex flex-col gap-y-4 pr-6">
        {integrationCategories.map((category, i) => (
          <div className={`flex flex-col gap-y-2 overflow-x-auto`}>
            <span className="font-bold">{category.category}</span>
            <div className="flex gap-x-4">
              {category.integrations.map(integration => (
                <div
                  className="border border-gray-200 border-solid min-w-[100px] h-28 rounded flex flex-col justify-center items-center gap-y-2 p-2 cursor-pointer" 
                  key={integration.name}
                >
                  <img src={integration.iconImage} className="mt-3 w-10" alt="Integration Icon" />
                  <span className="h-8 font-extrabold text-gray-600 text-center text-xs">{integration.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
};
