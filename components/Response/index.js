import React from 'react';

const Response = (props) =>
   <section>
       <h3>Response</h3>
       <pre style={{width: '100%'}}>
           {JSON.stringify(props.response)}
       </pre>
   </section>;

export default Response
