import React, { useState, useEffect } from 'react';

const Modal = ({ config, onSave, onClose }) => {
   const [elementConfig, setElementConfig] = useState(config);

   useEffect(() => {
      setElementConfig(config);
   }, [config]);

   const handleChange = (e) => {
      const { name, value } = e.target;
      setElementConfig({ ...elementConfig, [name]: value });
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      onSave(elementConfig);
   };

   return (
      <div className="modal">
         <div className="modal-content">
            <div className='modal-header'>
               <h2>Edit {elementConfig.element}</h2>
               <button onClick={onClose} className="close-button">X</button>
            </div>
            <div className='header-border'></div>
            <form onSubmit={handleSubmit}>
               <div className='input-content'>
                  <label>Text</label>
                  <input
                     className='input-placeholder'
                     type="text"
                     name="content"
                     value={elementConfig.content || ''}
                     onChange={handleChange}
                  />
               </div>

               <div className='input-content'>
                  <label>X</label>
                  <input
                     className='input-placeholder'
                     type="number"
                     name="x"
                     value={elementConfig.x}
                     onChange={handleChange}
                  />
               </div>

               <div className='input-content'>
                  <label>Y</label>
                  <input
                     className='input-placeholder'
                     type="number"
                     name="y"
                     value={elementConfig.y}
                     onChange={handleChange}
                  />
               </div>

               <div className='input-content'>
                  <label>Font Size</label>
                  <input
                     className='input-placeholder'
                     type="number"
                     name="fontSize"
                     value={elementConfig.fontSize || ''}
                     onChange={handleChange}
                  />
               </div>

               <div className='input-content'>
                  <label>Font Weight</label>
                  <input
                     className='input-placeholder'
                     type="number"
                     name="fontWeight"
                     value={elementConfig.fontWeight || ''}
                     onChange={handleChange}
                  />
               </div>

               <button className='submit-btn' type="submit">Save Changes</button>
            </form>
         </div>
      </div>
   );
};

export default Modal;
