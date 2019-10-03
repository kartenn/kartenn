import IdentityCard from "../IdentityCard";
import ArchitectureGraph from "../ArchitectureGraph";

const GraphAndCardWrapper = (props) => {
    return (
       <div style={{display: 'flex'}}>
           <div style={{width: '20%', margin: '0.5%'}}>
               <IdentityCard store={props.store} selectedNode={props.selectedNode}/>
           </div>
           <div style={{width: '100%'}}>
               <ArchitectureGraph
                  {...props}
               />
           </div>
       </div>
    )
};

export default GraphAndCardWrapper;
