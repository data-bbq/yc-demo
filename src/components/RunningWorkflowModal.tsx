import { Button, Modal } from "antd";
import { FC } from "react";

interface RunningWorkflowModalProps {
  open: boolean;
  setOpen: (o: boolean) => void;
  loading: boolean;
}

export const RunningWorkflowModal: FC<RunningWorkflowModalProps> = ({
  open,
  setOpen,
  loading
}) => {
  return (
    <Modal
      open={open}
      title="Workflow Execution Complete"
      onCancel={() => setOpen(false)}
      centered={true}
      footer={!loading ? (
        <div className="flex justify-end">
          <Button type="primary" onClick={() => setOpen(false)}>OK</Button>
        </div>
      ) : null}
    >
      {loading ? (
        <div>Executing workflow...</div>
      ) : (
        <div>Steps <b>1-3</b> of workflow completed without errors.</div>
      )}
    </Modal>
  );
}