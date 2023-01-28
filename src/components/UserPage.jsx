import { useEffect, useState } from "react"
import { useCookies } from "react-cookie";

export const UserPage =()=>{
    const [cookies, setCookie] = useCookies();
    const [userdata, setUserData] = useState();

    useEffect(()=>{
        fetch("https://ifrbzeaz2b.execute-api.ap-northeast-1.amazonaws.com/users",{
            headers: {
              authorization: `Bearer ${cookies.token}`,
            },
          })
          .then(res=>res.json())
          .then((data)=>{
            console.log(data);
            setUserData(data)
          })
    },[])
    

    return 
}