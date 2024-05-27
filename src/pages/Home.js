import { useState, useEffect} from "react"
import { Link } from "react-router-dom";


const Home = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [downloadable, setDownloadable] = useState('false')
    const [message, setMessage] = useState('')
    const [fileName, setFileName] = useState("Model.glb")

    const handleClick = (event) => {
        document.getElementById("Model").click()
        document.getElementById("Model").addEventListener("change", (e) => {
            if(e.target.files[0].name){
                setFileName(e.target.files[0].name)
                document.getElementById("itemUploaded").classList.add("flex")
            }
        })
    }
    
    const handleDrop = (event) => {
        event.preventDefault()
        document.getElementById("Model").files = event.dataTransfer.files
        document.getElementById("itemUploaded").classList.remove("none")
        document.getElementById("itemUploaded").classList.add("flex")
        setFileName(event.dataTransfer.files[0].name)
    }

    const handleRemove = () => {
        document.getElementById("Model").value = ""
        document.getElementById("itemUploaded").classList.remove("flex")
        document.getElementById("itemUploaded").classList.add("none")
    }

    const handleDragOver = (event) => { event.preventDefault() }
    const handleTitle = (event) => { setTitle(event.target.value) }
    const handleDescription = (event) => { setDescription(event.target.value) }
    const handleDownloadable = (event) => { setDownloadable(`${event.target.checked}`) }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = new FormData(event.target);
    
        const response = await fetch('https://reellink-v2.onrender.com/', {
        method: 'POST',
        body: data,
        })

        const modelData = await response.json()

        if (!response.ok) {
            setMessage(modelData.Message)
            document.getElementById("message_wrapper").classList.remove("none")
            document.getElementById("message_wrapper").classList.add("flex")
        } else {
            setMessage(`https://reellink.netlify.app/${modelData.Message}`)
            document.getElementById("message_wrapper").classList.remove("none")
            document.getElementById("message_wrapper").classList.add("flex")
        }
    }
    return <>
        {/* <nav>
            <ul style={{all:'unset'}}>
                <li>
                    <Link to="/view">View</Link>
                </li>
            </ul>
        </nav> */}
        <img className="logo" src="Reellink_Logo.png"></img>
        <main>
            <form onSubmit={handleSubmit}>
                <div id='left'>
                    <h1>Give Your Model a Title and a Description</h1>
                    <label>Title:</label>
                    <input id="Title" name="Title" type="text" onChange={handleTitle} value={title} maxLength={"24"}></input>
                    <label>Description:</label>
                    <textarea id="Description" name="Description" onChange={handleDescription} value={description} maxLength={"70"}></textarea>
                    <div id='downloadable_wrapper'>
                        <p>Downloadable</p>
                        <input id="Downloadable" name="Downloadable" type="checkbox" onChange={handleDownloadable} value={downloadable}></input>
                    </div>
                    <div id="btn_wrapper">
                        <button id="btn">Generate</button>
                    </div>
                </div>
                <div id='right'>
                    <div id="input_wrapper" onDrop={handleDrop} onDragOver={handleDragOver}>
                        <input id="Model" name="Model" type="file"></input>
                        <img id="plus" src="./plus.png" onClick={() => handleClick()}></img>
                        <div id="itemUploaded" className="none">
                            <p>{fileName}</p>
                            <img id="remove" src="./plus.png" onClick={handleRemove}></img>
                        </div>
                    </div>
                </div>
            </form>
            <div id="message_wrapper" className="none">
                <a href={message} style={{all:'unset',cursor:'pointer'}}>
                    <h3>{message}</h3>
                </a>
            </div>
        </main>
    </>;
  };
  
  export default Home;