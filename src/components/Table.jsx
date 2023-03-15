import React from "react";


function Table(props){
    return(<>
     <tr>
    <td>{props.ip}</td>
    <td><a href="#popup2"><button class="button button2" onClick={()=>{
        props.onUpdate(props.ip);
    }}><i class="fa-solid fa-pen-to-square"></i></button></a>  <button class="button button1" onClick={()=>{
        props.onDelete(props.ip);
    }}><i class="fa-solid fa-trash-can"></i></button></td>
</tr>
</>)
}

export default Table