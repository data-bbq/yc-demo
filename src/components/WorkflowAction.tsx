import { FC } from "react";
import { WorkflowStepAction } from "../App";
import { CloseCircleOutlined } from "@ant-design/icons";

export const WorkflowAction: FC<{action: WorkflowStepAction}> = ({ action }) => {
  return (
    <div className="w-full flex flex-col leading-8">
      <div className="flex gap-x-2 items-start">
        <CloseCircleOutlined className="cursor-pointer mt-[9px]" />
        {action.action}
      </div>
      {action.children?.map(child => (
        <WorkflowAction action={child} />
      ))}
    </div>
  );
};
