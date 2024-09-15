import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, theme } from "antd";
import Sidebar from "../components/sidebar/Sidebar";
import { Link, Outlet } from "react-router-dom";
import { useAppSelector } from "../hooks/hooks";
import { userInfo, userRole } from "../redux/features/authSlice";


const { Header, Content } = Layout;

const MainLayout: React.FC = () => {
  const user = useAppSelector(userInfo);
  const role = useAppSelector(userRole) ;
  const [collapsed, setCollapsed] = useState(false);
 
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout className="md:h-[100vh]">
      <Sidebar collapsed={collapsed} />
      <Layout>
        <Header
          style={{ padding: 0, background: colorBgContainer }}
          className="flex justify-between justify-items-center"
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />

          <div className="flex justify-center justify-items-center gap-3">
            <span className="text-lg font-medium text-blue-600 pt-4 capitalize">
              <Link to="/"> Home</Link>
            </span>
            <span className="text-lg font-medium text-blue-600 pt-4 capitalize">
              {role} Panel
            </span>
            <span className="">
              {user && (
                <img
                  className="w-16 h-16 rounded-full p-2 cursor-pointer"
                  src={user && user["image"]["url"]!}
                  alt=""
                />
              )}
            </span>
          </div>
        </Header>
        <Content
          style={{
            margin: "14px 8px",
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
