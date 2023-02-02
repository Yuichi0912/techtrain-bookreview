import axios from "axios";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom"
import { url } from "../const";


export const Editbook =()=>{
    const [cookies] =useCookies();

    const {id} = useParams();

    useEffect(()=>{
        axios.get(`${url}/books/${id}`,{
            headers: {
                Authorization: `Bearer ${cookies.token}`,
              },
        })
        .then((res)=>{
            console.log(res)
        })
        .catch((err)=>{
            console.log(err);
        })
    },[])

    return(
        <h2>編集画面</h2>
    )
}