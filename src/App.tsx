import { Button, Form, Input, Layout, Menu, Skeleton, Tag } from 'antd';
import { ReactNode, useCallback, useRef, useState } from 'react';

import DataBBQLogo from "./assets/databbq-logo.png";
import Snowflake from "./assets/snowflake.png";
import GoogleDrive from "./assets/google-drive.png";
import GoogleSheets from "./assets/google-sheets.png";

import './App.css';

import { Integration, WorkflowModal } from './components/WorkflowModal';
import { AppstoreOutlined, BellOutlined, BulbOutlined, CloseCircleOutlined, DownOutlined, PlayCircleOutlined, PlusOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { WorkflowAction } from './components/WorkflowAction';

import SubMenu from 'antd/es/menu/SubMenu';


export interface WorkflowStepAction {
  action: ReactNode;
  children?: WorkflowStepAction[]; 
}

export interface WorkflowStep {
  integration: Integration;
  actions: WorkflowStepAction[];
}

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [numberOfStepsShown, setNumberOfStepsShown] = useState(0);
  const [workflowSteps, setWorkflowSteps] = useState<WorkflowStep[]>([
    { 
      integration: {name: "Snowflake", iconImage: Snowflake },
      actions: [
        { 
          action: (
            <div>
              <span>Query Table(s) </span>
              <Tag closeIcon>Public High Growth Online Marketplace Companies List</Tag>
              <Tag closeIcon>Mature Online Marketplace Companies List</Tag>
              <span></span>
            </div>
          ),
          children: [
            { 
              action: (
                <div>
                  <span>Filter by </span>
                  <Tag>
                    <span className="mr-0.5">Last 12 months</span>
                    <DownOutlined />
                  </Tag>
                </div>
              )
            },
            { 
              action: (
                <div className="">
                  <span>Columns: </span>
                  <Tag closeIcon>Company Name</Tag>
                  <Tag closeIcon>Ticker</Tag>
                  <Tag closeIcon>Leveraged Beta</Tag>
                  <Tag closeIcon>Debt</Tag>
                  <Tag closeIcon>Equity Value</Tag>
                  <Tag closeIcon>Preferred Stock</Tag>
                </div>
              )
            },
          ]
        }
      ]
    },
    {
      integration: {name: "Google Drive", iconImage: GoogleDrive },
      actions: [
        { 
          action: (
            <div>
              <span>Import File: </span>
              <Tag closeIcon>PDF Mature Trucking And Logistics (Non Rail)</Tag>
            </div>
          ),
          children: [
            {
              action: (
                <div>
                  <span>Select Key Terms </span>
                  <Tag closeIcon>Company Name</Tag>
                  <Tag closeIcon>Ticker</Tag>
                  <Tag closeIcon>Leveraged Beta</Tag>
                  <Tag closeIcon>Debt</Tag>
                  <Tag closeIcon>Equity Value</Tag>
                </div>
              )
            },
            {
              action: (
                <div>
                  <span>Format as </span>
                  <Tag>
                    <span className="mr-0.5">Table</span>
                    <DownOutlined />
                  </Tag>
                </div>
              )
            },
            {
              action: (
                <div>
                  <span>Full join data to </span>
                  <Tag>
                    <span className="mr-0.5">Step 1</span>
                    <DownOutlined />
                  </Tag>
                </div>
              )
            }
          ]
        }
      ]
    },
    {
      integration: {name: "Google Sheets", iconImage: GoogleSheets },
      actions: [
        { 
          action: (
            <div>
              <span>Export to File </span>
              <Tag>
                <span className="mr-0.5">Uber DCF Model</span>
                <DownOutlined />
              </Tag>
            </div>
          ),
          children: [
            {
              action: (
                <div>
                  <span>Data Source: </span>
                  <Tag>
                    <span className="mr-0.5">Step 2 Query Execution</span>
                    <DownOutlined />
                  </Tag>
                </div>
              )
            },
            {
              action: (
                <div>
                  <span>Sheet: </span>
                  <Tag>
                    <span className="mr-0.5">WACC</span>
                    <DownOutlined />
                  </Tag>
                </div>
              )
            },
            {
              action: (
                <div>
                  <span>Starting Cell: </span>
                  <Tag>
                    <span className="mr-0.5">B16</span>
                    <DownOutlined />
                  </Tag>
                </div>
              )
            },
          ]
        }
      ]
    }
  ]);
  const shownWorkflowSteps = workflowSteps.slice(0, numberOfStepsShown);
  const [workflowModalOpen, setWorkflowModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [playWorkflowLoading, setPlayWorkflowLoading] = useState(false);
  const [promptInput, setPromptInput] = useState("");
  const [changesApproved, setChangesApproved] = useState(true);
  const showConfirmationButtons = useCallback((i: number) => !changesApproved && i === shownWorkflowSteps.length - 1, [changesApproved, shownWorkflowSteps.length]);
  const workflowStepsRef = useRef<HTMLDivElement>(null);
  const removeStep = useCallback((i: number) => {
    setNumberOfStepsShown(numberOfStepsShown => numberOfStepsShown - 1);
    setWorkflowSteps(workflowSteps => {
      return workflowSteps.filter((step, idx) => idx !== i);
    });
  }, []);  // setItems is stable and does not actually need to be a dependency  const workflowStepsRef = useRef<HTMLDivElement>(null);

  const onButtonClick = () => {
    setLoading(true);
    setChangesApproved(false);
    setNumberOfStepsShown(numberOfStepsShown + 1);
    setTimeout(() => {
      setLoading(false);
      setPromptInput("");
    }, 0);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout.Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="h-full flex flex-col justify-between">
          <div className="">
            <h3 className="tracking-widest text-center text-white font-sans">
              DATABBQ
            </h3>
            <Button className="m-2 w-[calc(100%-16px)]" type="primary">
              <PlusOutlined />
              New Workflow
            </Button>
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" openKeys={["workflows"]}>
              <SubMenu key="workflows" icon={<AppstoreOutlined />} title="Workflows">
                <Menu.Item key="workflow1">Uber DCF Model</Menu.Item>
                <Menu.Item key="workflow2">Extract Deal Terms from Old Term Sheets</Menu.Item>
                <Menu.Item key="workflow3">Portfolio Valuation Model</Menu.Item>
                <Menu.Item key="workflow4">Fund Reporting Data Pipeline</Menu.Item>
                <Menu.Item key="workflow5">CRM Data Enhancement</Menu.Item>
              </SubMenu>
            </Menu>
          </div>
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="settings" icon={<SettingOutlined />}>
              Settings
            </Menu.Item>
            <Menu.Item key="notifications" icon={<BellOutlined />}>
              Notifications
            </Menu.Item>
            <Menu.Item key="profile" icon={<UserOutlined />}>
              Profile
            </Menu.Item>
          </Menu>
        </div>
      </Layout.Sider>
      <Layout.Content>
        <div className="w-full flex justify-center p-6 h-full">
          <div className="max-w-screen-xl w-full h-full flex flex-col gap-y-6">
            <Form layout="vertical" className="w-100">
              <Form.Item className="w-100">
                <Input.TextArea value={promptInput} onChange={e => setPromptInput(e.target.value)} placeholder="Customize workflow. Proposed changes won't take effect until confirmed." autoSize={{ minRows: 3}} />
              </Form.Item>
              <div className="flex gap-x-4">
                <Button
                  type="primary"
                  disabled={loading || !promptInput}
                  loading={loading}
                  onClick={onButtonClick}
                  block
                >
                  <BulbOutlined />
                  <span>Suggest Edits</span>
                </Button>
                <Button 
                  type="default"
                  disabled={loading || !shownWorkflowSteps.length || !changesApproved}
                  loading={false}
                  onClick={() => {
                    setLoading(true);
                    setTimeout(() => {
                      setLoading(false);
                      window.open("https://docs.google.com/spreadsheets/d/1ewtMZuXjsnC1f3lMmCtBlV99AuLwt3tOIdNyT5R-pv8/edit#gid=41564101", "_blank")
                    }, 1000)
                  }}
                  block
                >
                  <PlayCircleOutlined />
                  <span>Run Workflow</span>
                </Button>
              </div>
            </Form>
            <div ref={workflowStepsRef} className="flex-grow w-full border-2 border-gray-200 border-solid rounded overflow-y-auto p-4 relative">
              {loading ? (
                <div className="flex flex-col h-full justify-center">
                  <Skeleton active paragraph={{ rows: 16 }} />
                </div>
              ) : shownWorkflowSteps.length ? (
                <div className="px-4 h-full flex flex-col gap-y-4 max-h-[540px]">
                  {shownWorkflowSteps.map((step, i) => (
                    <div className={`flex flex-col p-4 gap-y-4 ${showConfirmationButtons(i) ? "border-2 border-green-500 border-dashed rounded" : ""}`}>
                      <div className="flex gap-x-2">
                        <div className="flex-grow flex flex-col gap-y-4">
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
                            <CloseCircleOutlined className="cursor-pointer" onClick={() => removeStep(i)} />
                          </div>
                          <div className="mt-2">
                            {step.actions.map(action => (
                              <WorkflowAction action={action} />
                            ))}
                          </div>
                        </div>
                      </div>
                      {showConfirmationButtons(i) && (
                        <div className="flex gap-x-2">
                          <Button type="default" block onClick={() => { removeStep(i) }}>Cancel</Button>
                          <Button 
                            className="bg-success-green hover:bg-green-500 text-white border-success-green border-hover-green:hover"
                            block
                            onClick={() => { setChangesApproved(true); }}
                          >
                            Apply
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                  {/* <div className="w-[calc(100%-48px)] absolute h-4 z-5 bottom-px bg-[#f5f5f5] px-4"></div> */}
                </div>
              ) : (
                <div className="flex flex-col w-full h-full justify-center items-center gap-y-6">
                  <img src={DataBBQLogo} alt="Grill" className="w-60" />
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
            {!!shownWorkflowSteps.length && !loading && (
            <Button type="default" onClick={() => setWorkflowModalOpen(true)}>
              <PlusOutlined />
              <span>Add Step</span>
            </Button>
          )}
          </div>
          </div>
        <WorkflowModal open={workflowModalOpen} setOpen={setWorkflowModalOpen} />
      </Layout.Content>
    </Layout>
  );
}

export default App;
