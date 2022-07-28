import './NavMenu.css';
import { useState } from 'react';
import { useView } from '../../providers/ViewProvider'
import { View } from '../../types';

export const NavMenu = () => {
  const { currentView, goToView } = useView();

  return (
    <label className="NavMenu" htmlFor="OpenNavMenu">
      <span className="NavMenu_toggle_menu_bt">Menu</span>
      <input type="checkbox" id="OpenNavMenu" name="OpenNavMenu"/>
      <ul className="NavMenu_list">
        {[...Object.values(View) ?? []].map((view) => {
          if (currentView !== view) {
            return (
              <li className="NavMenu_element" key={view}>
                <button onClick={() => goToView(view)}>{view}</button>
              </li>
            )
          }
        })}
      </ul>
    </label>
  );
};
