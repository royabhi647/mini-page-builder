import React from 'react';

const Sidebar = () => {
  const elements = ['Label', 'Input', 'Button'];

  const handleDragStart = (e, element) => {
    e.dataTransfer.setData('element', element);
  };

  return (
    <div className="Sidebar">
      <h3 style={{marginBottom:"20px"}}>BLOCKS</h3>
      {elements.map((element, index) => (
        <div
          key={index}
          draggable
          onDragStart={(e) => handleDragStart(e, element)}
          className="sidebar-element"
        >
          {element}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;