import { useState } from "react";

const useEdit=()=>{
  const [edit,setEdit]=useState("");
   const changeEdit=(id)=>{
     setEdit(id); 
   }
   const editClear=()=>{
     setEdit("");
   }
   return {edit,changeEdit,editClear}
}

export default useEdit;