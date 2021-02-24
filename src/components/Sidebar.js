import React from 'react';
import SidebarContent from './SideBarContent'

const Sidebar = ({ width, height, children }) => {
  const [xPosition, setX] = React.useState(-width);

  const toggleMenu = () => {
    if (xPosition < 0) {
      setX(0);
    } else {
      setX(-width);
    }
  };

  React.useEffect(() => { setX(0) }, []);

  return (
    <>
      <div
        className="side-bar"
        style={{
          transform: `translatex(${xPosition}px)`,
          width: width,
          minHeight: height
        }}
      >
        <button
          onClick={() => toggleMenu()}
          className="toggle-menu"
          style={{
            transform: `translate(${width}px, 20vh)`
          }}
        />
        <div className="content">
          <SidebarContent/>
        </div>
      </div>
      <style jsx>{`
      .side-bar {
        position: absolute;
        z-index: 1;
        height: 100%;
        display: flex;
        flex-direction: column;
        border-right: 2px solid;
        border-radius: 0.5rem;
        border-color: #FEA117;
        background-color: white;
        transition: 0.8s ease;
      }
      .toggle-menu {
        height: 3.5rem;
        border-top-right-radius: 9rem;
        border-bottom-right-radius: 9rem;
        width: 1rem;
        position: absolute;
        z-index: 1;
        background-color: #FEA117;
        border: none;
      }
      `}
      </style>
    </>
  );
};

export default Sidebar;
