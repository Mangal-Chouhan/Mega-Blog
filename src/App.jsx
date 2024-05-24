import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { Header,Footer} from "./componates/index"
import { Outlet } from "react-router-dom"
import  authService  from "./appwrite/auth"
import './App.css'

function App() {

 const [loading, setloading] = useState (true)
 const dispach = useDispatch ()

 useEffect (()=>{

  authService.getCurrentUser()
  .then((userData) => {
    if (userData) {
      dispach (login(userData))
    }
    else { 
      dispach(logout())
    }
  })
  .finally(()=>{setloading(false)}) 

 },[])
 

return !loading ? (
   <div className="min-h-screen flex flex-wrap content-berween bg-gray-400"> 
   <div className="w-full block">

     <Header/>
     <main>
      {/* outlet */}
     </main>
     <Footer />

    </div> </div> ) : (null)

}

export default App
