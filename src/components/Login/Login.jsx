
import { useState } from "react";
import { useSelector } from "react-redux";

const Login = () =>{

 const [form, setForm] = useState({
        username: "",
        password: "",    
      });

const datos = useSelector(state=>state.token);

console.log("datos",datos);

 const changeHandler = (event) =>{
   const property = event.target.name;
   const value = event.target.value;
   setForm({...form,[property]:value});  
  
 }

 const formIsDisabled = !form.password || !form.username;


return( 
<div>
<h1>Login</h1>
  
  <div>
     <form>
        <div>
        <input
         type="text"
         placeholder="Usuario"       
         value={form.username}
         onChange={changeHandler}
         name="username"        
        />      
        </div>        
        <div>
        <input
         type="text"
         placeholder="Contraseña"       
         value={form.password}
         onChange={changeHandler}
         name= "password"
        />         
        </div>

        <div>
          <button
           type="submit"
           disabled = {formIsDisabled}
          >Ingresar</button>

        </div>
               
     </form>

  </div>

</div>

 
 
)



}


export default Login;