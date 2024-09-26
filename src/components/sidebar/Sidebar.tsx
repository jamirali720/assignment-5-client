import { Layout, Menu } from "antd";
import { sidebarItemGenerator } from "../../utils/sidebarItems";
import { adminPaths } from "../../routes/admin.routes";
import { userPaths } from "../../routes/user.routes";
import { useAppSelector } from "../../hooks/hooks";
import { userRole } from "../../redux/features/authSlice";

const { Sider } = Layout;

const Sidebar = ({ collapsed }: { collapsed: boolean }) => {
  const role = useAppSelector(userRole);  
  const userRoles = {
    ADMIN: "admin",
    USER: "user",
  };

  
  let sidebarItems;

  switch (role!) {
    case userRoles.ADMIN:
      sidebarItems = sidebarItemGenerator(adminPaths, userRoles.ADMIN);
      break;
    case userRoles.USER:
      sidebarItems = sidebarItemGenerator(userPaths, userRoles.USER);
      break;

    default:
      break;
  }
  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="demo-logo-vertical" />
      <Menu
        theme="dark" 
        mode="inline"
        defaultSelectedKeys={["1"]}
        items={sidebarItems}
      />
    </Sider>
  );
};

export default Sidebar;
