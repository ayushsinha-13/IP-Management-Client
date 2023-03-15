import React, { useState } from "react";
import Table from "./components/Table";
import { io } from "socket.io-client";

const socket = io.connect("http://localhost:8080");

function App(){

    const [data, setData] = useState([])
    const [newIP, setNewIP] = useState("")
    const [temp, setTemp] = useState("")

        socket.on("data_read", (payload)=>{
            for(var i=0;i<payload.length;i++){
                let temp = payload[i].ip
                setData(data => {
                    return [...data, temp]
                }) 
            } 
        })

    const createIP = (e)=>{
        socket.emit("data_create", newIP)
        socket.on("validation", (payload)=>{
            alert(payload)
        })
        setNewIP("")
    }

    const updateIP = (e) =>{
        e.preventDefault()
        socket.emit("data_update", {old: temp, new: newIP})
        socket.on("validation_update", (payload)=>{
            alert(payload)
        })  
    }

    const updateTemp = (id) => {
        setTemp(id)
    }

    const deleteIP = (id) => {
        socket.emit("data_delete" , id)
        setNewIP("")
        alert("Deleted Successfully")
    }

    const handleChange = (e) => {
        const newValue = e.target.value
        setNewIP(newValue)
    }
    
    function listIp(IP) {
        return (
          <Table
            ip={IP}
            onDelete={deleteIP}
            onUpdate={updateTemp}
          />
        );
      }
    

    return(
        <>
        <div className="container-fluid">
            <div className="title">
                <h1>IP Management</h1>
            </div>

            <div className="row">
                <div className="col-lg-4">
                    <div className="button-save" >
                        <a href="#popup1"><button className="button4"><i className="fa-solid fa-plus"></i></button></a> 
                    </div>
                </div>

        {/* <!-- For Adding IP --> */}
                <div id="popup1" className="overlay">
                    <div className="popup">
                        <a className="close" href="/">&times;</a>
                        <div className="content">
                            <form onSubmit={createIP}>
                                <label><center><h3>Add IP Address</h3></center></label> 
                                <center><input type="text" id="ip" name="ip"  placeholder="198.255.01.11" value={newIP} onChange={(e) => {setNewIP(e.target.value) }} /></center>
                                <div className="op"><input type="submit" value="Submit" /></div>
                            </form>
                        </div>
                    </div>
                </div>

        {/* For Edit IP  */}
        <div id="popup2" className="overlay">
                    <div className="popup">
                        <a className="close" href="/">&times;</a>
                        <div className="content">
                            <form onSubmit={updateIP}>
                                <label>
                                    <center>
                                        <h3>Edit IP Address</h3>
                                    </center>
                                </label> 
                                <h3>Current IP : {temp}</h3>
                                <h5><em>modify Ip Address</em></h5>
                                <center>
                                    <input onChange={handleChange} type="text" id="newip" name="newip" value={newIP}  placeholder="198.255.01.11" />
                                </center>
                                <div className="op">
                                    <input type="submit" value="Submit"></input>
                                    {/* <input type="submit" value="Submit" /> */}
                                </div>
                            </form>                  
                    </div>
                </div>
            </div>  


            <div className="col-lg-6">
                <table>
                    <tr>
                        <th>IP address</th>
                        <th>Action</th>
                    </tr>
                    {data.map(listIp)}
                </table>
            </div>
        </div>
    </div>      
</>
)}

export default App