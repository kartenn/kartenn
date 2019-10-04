import React from 'react';

const Param = (props) =>
   <li className="param" style={{backgroundColor: '#f1f2f6', padding: '5px', fontSize: '12px'}}>
       <span
          style={{fontWeight: props.required ? 'bold' : 'normal'}}
       >
           {props.name} ({props.type})
       </span>
   </li>;

export default Param;
