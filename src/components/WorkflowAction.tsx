import { FC } from "react";
import { WorkflowStepAction } from "../App";

export const WorkflowAction: FC<{action: WorkflowStepAction}> = ({ action }) => {
  return (
    <div className="w-full flex flex-col leading-8">
      <div className="">{action.action}</div>
      {action.children?.map(child => (
        <WorkflowAction action={child} />
      ))}
    </div>
  );
};
