import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react"
import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Center, Resize } from '@react-three/drei'
import Model from '../components/Model'


const View = () => {
  const [ modelObject, setModelObject ] = useState({
    model_url:'placeholder.glb'
  })
  const { id } = useParams();

  useEffect(() => {
    const getModel = async () => {

      const fetchReply = await fetch(`https://reellink-v2.onrender.com/${id}`)
      const parsedReply = await fetchReply.json()
      setModelObject({...modelObject, ...parsedReply})

    }
    getModel()
    // console.log(modelObject)
  },[])

  // const loader = () => {
  //   if(modelObject.model_url){
  //     return  <Model url={modelObject.model_url}/>
  //   }else{
  //     return  <Loading />
  //   }
  // }

  if(modelObject.Message){

    return <>
      <nav>
        <Link to="/"><button style={{width:'25px',height:'25px',backgroundColor:'black',color:'white',borderRadius:'25px',cursor:'pointer'}}>X</button></Link>
      </nav>
      <h1>{modelObject.Message}</h1>
    </>
    
  }else{
    
    return <>
      <nav className="exit">
        <Link to="/"><button style={{width:'25px',height:'25px',backgroundColor:'black',color:'white',borderRadius:'25px',cursor:'pointer'}}>X</button></Link>
      </nav>
      <img className="logo_2" src="Reellink_Logo.png"></img>
      <div className="details-wrapper">
        <h2>{modelObject.title}</h2>
        <h4>{modelObject.description}</h4>
        {modelObject.downloadable ? <a href={modelObject.model_url}><button>Download</button></a> : <></>}
      </div>
      <div className="model-wrapper" style={{width:'100vw',height:'100vh'}}>
        <Canvas flat linear>
          <OrbitControls />
          <ambientLight intensity={20} />
          <directionalLight intensity={14} position={[2.5, 8, 5]}/>
          <directionalLight intensity={14} position={[2.5, 8, -5]}/>
          <directionalLight intensity={10} position={[0, -8, 0]}/>
          <Suspense fallback={null}>
            <Center>
              <Resize scale={3}>
                <Model url={modelObject.model_url} />
              </Resize>
            </Center>
          </Suspense>
        </Canvas>
      </div>
    </>
  }
};
  
  export default View;