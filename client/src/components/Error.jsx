
import { useNavigate } from 'react-router-dom'
import './Error.css'
function Error(){
    const navigate=useNavigate()
    let handleClick=()=>{
         navigate('/')
    }
    return (
        <div>
            <h1 className="error-text">404 Error: Page not found</h1>
            <button onClick={handleClick}>Go To Login</button>
        </div>
    )
}
export default Error