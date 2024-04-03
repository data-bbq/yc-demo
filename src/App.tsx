import { Button, Form, Input, Layout, Menu, Steps } from 'antd';
import { useState } from 'react';

import './App.css';

import grillImage from "./assets/bbq-grill.png";
import { WorkflowModal } from './components/WorkflowModal';
import { PlusOutlined } from '@ant-design/icons';

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [integrations, setIntegrations] = useState([]);
  const [workflowModalOpen, setWorkflowModalOpen] = useState(false);

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
                <Input.TextArea placeholder="Customize with ChatGPT. Proposed changes won't take effect until confirmed." autoSize={{ minRows: 3}} />
              </Form.Item>
              <Button type="primary">Submit</Button>
            </Form>
            <div className="flex-grow w-full border-2 border-gray-200 border-solid rounded overflow-y-auto">
              {integrations.length ? <div>TODO</div> : (
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
