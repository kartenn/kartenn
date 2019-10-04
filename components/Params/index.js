import React from 'react';
import Param from "../Param";

const Params = (props) =>
   <section>
       <h3>Params</h3>
       <ul style={{width: '100%'}}>
          {props.params.map((param, index) => <Param {...param} key={index} />)}
      </ul>
   </section>;

export default Params
