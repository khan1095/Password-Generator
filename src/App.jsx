import { useCallback, useEffect, useRef, useState } from 'react'
function App() {
  const [length, setLength] = useState(8)
  const [number,setNumber]=useState(false)
  const [char,setChar]=useState(false)
  const [password,setPassword]=useState("")


  //useRef hook
  const passwordRef=useRef(null)
  const passGen=useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(number)str+="0123456789"
    if(char) str+="!@#$%^&*()"
    
    for(let i=1;i<=length;i++){
      let char=Math.floor(Math.random()*str.length+1)
      pass+=str.charAt(char)

      setPassword(pass)
    }

  },[length,number,char,setPassword])

  const copyPassword=useCallback(()=>{
    passwordRef.current?.select();
    // passwordRef.current?.setSelectionRange(0,99)
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=>{
    passGen()
  },[length,number,char,passGen])
  
  return (
    <>
    <div className="width-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-800">
      <h1 className='text-white text-center text-xl font-serif my-3'>Password Generator</h1>
  <div className="flex shadow rounded-lg overflow-hidden mb-4">
  <input type="text"
  value={password}
  className='ooutline-none w-full py-1 px-3'
  placeholder='password'
  readonly
  ref={passwordRef} />
  <button  onClick={copyPassword}className='bg-blue-500 text-white outline-none px-3 py-1 shrink-0'>Copy</button>
  
 </div>
 <div className="flex text-sm gap-x-2">
  <div className='flex items-center gap-x-1'>
  <input
   type="range"
  min={6}
  max={100}
  value={length}
  className='cursor-pointer'
  onChange={(e)=>{
    setLength(e.target.value)
  }}
   />
   <label>length: {length}</label>
   </div>
    <div className='flex items-center gap-x-1'>
    <input type="checkbox"
    defaultChecked={number}
    id="numberInput"
    onChange={()=>{
      setNumber((prev)=>!prev)
    }}/>
   </div>
    <label> Number</label>
    <div className='flex items-center gap-x-1'>
    <input type="checkbox"
    defaultChecked={char}
    id="numberInput"
    onChange={()=>{
      setChar((prev)=>!prev)
    }}/>
   </div>
    <label> Characters</label> 
  </div>
 </div>  
    </>
  )
}

export default App
