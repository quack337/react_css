import { NavLink } from 'react-router-dom'
import { useState } from 'react';
import { IoMdMenu } from 'react-icons/io';
import './Drawer.scss';

export type MenuItem = { title: string, url: string, icon: JSX.Element }

export default function Drawer({title, menuItems}: {title: string, menuItems: MenuItem[]}) {
  const [visible, setVisible] = useState(true);
  const drawerIcon = <span className="drawer-icon" onClick={() => setVisible(v => !v)}>
                <IoMdMenu/></span>
  return (
    <div className="drawer">
      <div className={visible ? "mini hide" : "mini"}>
        {drawerIcon}
      </div>
      <div className={visible ? "max" : "max hide"}>
        <div>
          <div className="title">{drawerIcon} {title}</div>
          <div className="menu">
            {menuItems.map(item => <NavLink to={item.url} key={item.url}>
              <span>{item.icon}</span> {item.title}
            </NavLink>)}
          </div>
        </div>
      </div>
    </div> );
}