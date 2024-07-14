import React, { useState, useEffect } from 'react';
import Modal from './Modal';

const Canvas = ({ elements, setElements }) => {
   const [selectedElement, setSelectedElement] = useState(null);
   const [showModal, setShowModal] = useState(false);
   const [modalConfig, setModalConfig] = useState({});
   const [dragging, setDragging] = useState(false);
   const [draggedElement, setDraggedElement] = useState(null);

   const handleDrop = (e) => {
      e.preventDefault();
      if (dragging && draggedElement !== null) {
         const updatedElements = elements.map((el, index) => 
            index === draggedElement ? { ...el, x: e.clientX, y: e.clientY } : el
         );
         setElements(updatedElements);
         setDragging(false);
         setDraggedElement(null);
      } else {
         const element = e.dataTransfer.getData('element');
         const x = e.clientX;
         const y = e.clientY;
         setModalConfig({ element, x, y });
         setShowModal(true);
      }
   };

   const handleSave = (config) => {
      setElements([...elements, config]);
      setShowModal(false);
   };

   const handleDragOver = (e) => {
      e.preventDefault();
   };

   const handleSelect = (index) => {
      setSelectedElement(index);
   };

   const handleDelete = () => {
      if (selectedElement !== null) {
         const newElements = elements.filter((_, index) => index !== selectedElement);
         setElements(newElements);
         setSelectedElement(null);
      }
   };

   const handleExport = () => {
      const dataStr = JSON.stringify(elements, null, 2);
      const blob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'page-config.json';
      link.click();
      URL.revokeObjectURL(url);
   };

   const handleUpdate = (updatedConfig) => {
      const newElements = elements.map((element, index) =>
         index === selectedElement ? updatedConfig : element
      );
      setElements(newElements);
      setShowModal(false);
   };

   const handleElementDragStart = (index) => {
      setDragging(true);
      setDraggedElement(index);
   };

   const handleElementDragEnd = () => {
      setDragging(false);
      setDraggedElement(null);
   };

   const handleKeyDown = (e) => {
      if (e.key === 'Delete') {
         handleDelete();
      } 
   };

   useEffect(() => {
      window.addEventListener('keydown', handleKeyDown);
      return () => {
         window.removeEventListener('keydown', handleKeyDown);
      };
   }, [selectedElement, elements]);

   return (
      <div
         className="Canvas"
         onDrop={handleDrop}
         onDragOver={handleDragOver}
         onClick={() => setSelectedElement(null)}
      >
         {elements.map((element, index) => (
            <div
               key={index}
               className={`canvas-element ${selectedElement === index ? 'selected' : ''}`}
               style={{ top: parseInt(element.y), left: parseInt(element.x) }}
               onClick={(e) => {
                  e.stopPropagation();
                  handleSelect(index);
               }}
               draggable
               onDragStart={() => handleElementDragStart(index)}
               onDragEnd={handleElementDragEnd}
            >
               <p style={{
                  fontSize: `${element.fontSize}px`,
                  fontWeight: element.fontWeight
               }}>
                  {element.content ? element.content : element.element}</p>
            </div>
         ))}
         {showModal && (
            <Modal
               config={modalConfig}
               onSave={selectedElement !== null ? handleUpdate : handleSave}
               onClose={() => setShowModal(false)}
            />
         )}
         {selectedElement !== null && (
            <>
               <button className="delete-button" onClick={handleDelete}>
                  Delete
               </button>
               <button className="export-button" onClick={handleExport}>
                  Export
               </button>
            </>
         )}
      </div>
   );
};

export default Canvas;
