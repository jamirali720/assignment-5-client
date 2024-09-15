import { NavLink } from "react-router-dom";
import { TRoute, TSidebarItems, TUserPaths } from "../types";

export const sidebarItemGenerator = (items: TUserPaths[], role: string) => {
  const sidebarItemsPath = items.reduce((acc: TSidebarItems[], item) => {
    if (item.name && item.path) {
      acc.push({
        key: item.name,
        label: <NavLink to={`/${role}/${item.path}`}>{item.name} </NavLink>,
      });
    }
    if (item.children) {
      acc.push({
        key: item.name,
        label: item.name,
        children: item.children.map((child) => ({
          key: child.name,
          label: <NavLink to={`/${role}/${child.path}`}>{child.name} </NavLink>,
        })),
      });
    }
    return acc;
  }, []);
  return sidebarItemsPath;
};

export const routerPathGenerator = (items: TUserPaths[]) => {
    const routePath = items.reduce((acc:TRoute[] , item) => {
        if(item.element && item.path) {
            acc.push({
                path: item.path, 
                element: item.element
            })
        }
        if(item.children){
            item.children.forEach(child => {
                acc.push({
                    path: child.path!, 
                    element: child.element
                })
            })
        }

        return  acc;
    }, [])
    return routePath;
};
