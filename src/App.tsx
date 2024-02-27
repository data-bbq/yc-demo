import { Layout, Menu, Steps } from 'antd';
import { useState } from 'react';

import './App.css';


function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout.Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={[]} />
      </Layout.Sider>
      <Layout.Content>
        <div className="p-4">
          <Steps progressDot current={currentStep} onChange={s => setCurrentStep(s)} items={[
            { title: 'Prep'},
            {title: 'Grill'},
            {title: 'Serve'},
          ]}>
          </Steps>
        </div>
      </Layout.Content>
    </Layout>
  );
}

export default App;
