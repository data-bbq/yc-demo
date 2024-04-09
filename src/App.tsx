import { Button, Form, Input, Layout, Menu, Skeleton, Tag } from 'antd';
import { FC, ReactNode, useMemo, useState } from 'react';

import Crunchbase from "./assets/crunchbase.png";
import FileFolder from "./assets/file-folder.png";
import GoogleDrive from "./assets/google-drive.png";
import MicrosoftExcel from "./assets/microsoft-excel.png";


import './App.css';

import grillImage from "./assets/bbq-grill.png";
import { Integration, WorkflowModal } from './components/WorkflowModal';
import { CloseCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { WorkflowAction } from './components/WorkflowAction';
import { workerData } from 'worker_threads';


export interface WorkflowStepAction {
  action: ReactNode;
  children?: WorkflowStepAction[]; 
}

export interface WorkflowStep {
  integration: Integration;
  actions: WorkflowStepAction[];
}



const Link: FC<{children?: ReactNode}> = ({ children }) => (
  <span className="text-blue-600 bg-blue-200 cursor-pointer px-2 py-1 mx-1 rounded">{children}</span>
);


function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [numberOfStepsShown, setNumberOfStepsShown] = useState(0);
  const [workflowSteps, setWorkflowSteps] = useState<WorkflowStep[]>([
    { 
      integration: {name: "Crunchbase", iconImage: Crunchbase },
      actions: [
        { 
          action: (
            <div>
              <span>Call </span>
              <Tag closeIcon>Get Companies</Tag>
              <span>Service </span>
            </div>
          ),
          children: [
            {
              action: (
                <div>
                  <span>Companies: </span>
                  <Tag closeIcon>AAPL</Tag>
                  <Tag closeIcon>MSFT</Tag>
                  <Tag closeIcon>TSLA</Tag>
                  <Tag closeIcon>NFLX</Tag>
                  <Tag closeIcon>UBER</Tag>
                </div>
              )
            },
            { 
              action: (
                <div>
                  <span>Filter by </span>
                  <Tag closeIcon>Last 12 months</Tag>
                </div>
              )
            },
            { 
              action: (
                <div className="">
                  <span>Response fields: </span>
                  <Tag closeIcon>Company Name</Tag>
                  <Tag closeIcon>Website</Tag>
                  <Tag closeIcon>Funding Date</Tag>
                  <Tag closeIcon>Funding Amount</Tag>
                  <Tag closeIcon>Post Money Valuation</Tag>
                  <Tag closeIcon>Funding Stage</Tag>
                </div>
              )
            },
          ]
        }
      ]
    },
    {
      integration: {name: "Upload File", iconImage: FileFolder },
      actions: [
        { 
          action: (
            <div>
              <span>Import </span>
              <Tag closeIcon>Most Recent</Tag>
              <Tag closeIcon>Term Sheet</Tag>
              <span>Document Type </span>
            </div>
          ),
          children: [
            {
              action: (
                <div>
                  <span>Select Key Terms </span>
                  <Tag closeIcon>Company Name</Tag>
                  <Tag closeIcon>Website</Tag>
                  <Tag closeIcon>Funding Date</Tag>
                  <Tag closeIcon>Funding Amount</Tag>
                  <Tag closeIcon>Post Money Valuation</Tag>
                  <Tag closeIcon>Funding Stage</Tag>
                </div>
              )
            },
            { 
              action: (
                <div>
                  <span>Format as </span>
                  <Tag closeIcon>Table</Tag>
                </div>
              )
            },
          ]
        }
      ]
    }
  ]);
  const shownWorkflowSteps = useMemo(() => workflowSteps.slice(0, numberOfStepsShown), [numberOfStepsShown, workflowSteps]);
  const [workflowModalOpen, setWorkflowModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [promptInput, setPromptInput] = useState("");

  const onButtonClick = () => {
    setLoading(true);
    setNumberOfStepsShown(numberOfStepsShown + 1);
    setTimeout(() => setLoading(false), 2500);
    setPromptInput("");
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout.Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={[]} />
      </Layout.Sider>
      <Layout.Content>
        <div className="w-full h-full flex justify-center p-6">
          <div className="max-w-screen-xl w-full h-full flex flex-col gap-y-6">
            <Form layout="vertical" className="w-100">
              <Form.Item className="w-100">
                <Input.TextArea value={promptInput} onChange={e => setPromptInput(e.target.value)} placeholder="Customize with ChatGPT. Proposed changes won't take effect until confirmed." autoSize={{ minRows: 3}} />
              </Form.Item>
              <Button 
                type="primary"
                disabled={loading || !promptInput}
                loading={loading}
                onClick={onButtonClick}
                block
              >
                Submit
              </Button>
            </Form>
            <div className="flex-grow w-full border-2 border-gray-200 border-solid rounded overflow-y-auto p-4">
              {loading ? (
                <div className="flex flex-col h-full justify-center">
                  <Skeleton active paragraph={{ rows: 16 }} />
                </div>
              ) : shownWorkflowSteps.length ? (
                <div className="p-4 h-full flex flex-col">
                  {shownWorkflowSteps.map((step, i) => (
                    <div className="flex flex-col">
                      <div className="flex gap-x-2 pb-6">
                        <div className="h-full flex flex flex-col gap-y-4">
                          <div className="w-12 h-16 rounded-full border border-solid border-gray-200 flex flex-col justify-center items-center">
                            <div className="font-">{i+1}</div>
                          </div>
                          <div className="w-12 flex h-full justify-center flex-grow">
                            <div className="w-px border-l h-full border-dashed border-black"></div>
                          </div>
                        </div>
                        <div className="w-full">
                          <div className="flex justify-between w-full border-2 border-gray-200 border-solid p-2">
                            <div className="rounded w-full flex gap-x-2">
                              <img src={step.integration.iconImage} className="w-8 h-8" alt="Icon" />
                              <div className="text-2xl font-bold text-gray-700">{step.integration.name}</div>
                            </div>
                            <CloseCircleOutlined className="cursor-pointer" />
                          </div>
                          <div className="mt-2">
                            {step.actions.map(action => (
                              <WorkflowAction action={action} />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button type="default" onClick={() => setWorkflowModalOpen(true)}>
                    <PlusOutlined />
                    <span>Add Step</span>
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col w-full h-full justify-center items-center gap-y-6">
                  <img src={grillImage} alt="Grill" className="w-60" />
                  <div className="flex flex-col gap-y-1 items-center">
                    <div className="text-2xl font-extrabold">Let's Get Cookin! 🔥</div>
                    <div className="text-center">
                      Add a new workflow step to get started.
                    </div>
                  </div>
                  <Button type="default" onClick={() => setWorkflowModalOpen(true)}>
                    <PlusOutlined />
                    <span>Add Step</span>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
        <WorkflowModal open={workflowModalOpen} setOpen={setWorkflowModalOpen} />
      </Layout.Content>
    </Layout>
  );
}

export default App;
