import axios from "axios"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { UncontrolledPopover, PopoverHeader, PopoverBody } from "reactstrap"
import { addDetaileData, addUsersData, clearUsersData } from "../store/actions/userDataAction"

export default function Main () {
    const dispatch = useDispatch()
    const users = useSelector(state => state?.users)
    const detaile = useSelector(state => state?.detaile)
    const [error, setError] = useState("")
    const navigate = useNavigate()

    useEffect(()=>{
        const getUsers = async function (){
            try{
                const users1 = await axios.get("users?page=1")
                console.log(users1)
                try{
                    const users2  = await axios.get("users?page=2")
                    dispatch(addUsersData([...users1.data.data, ...users2.data.data]))
                    try{
                        const detaile1 = await axios.get("unknown?page=1")
                        console.log(detaile1)
                        try{
                            const detaile2  = await axios.get("unknown?page=2")
                            dispatch(addDetaileData([...detaile1.data.data, ...detaile2.data.data]))
                        }catch(error){
                            dispatch(clearUsersData())
                            setError(error)
                            console.log(error)
                        }
                    }catch(error){
                        dispatch(clearUsersData())
                        setError(error)
                        console.log(error)
                    }
                }catch(error){
                    setError(error)
                    console.log(error)
                }
            }catch(error){
                setError(error)
                console.log(error)
            }
        }
        getUsers()
    }, [navigate])
    return (
        <>  
          
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 p-10">
              <div className=" w-full lg:max-w-full flex flex-wrap flex-row" style={{"justifyContent": "space-between"}}>
                {
                    users.map((item) => {
                        let detailed = detaile.find(function (info) {return item.id === info.id ? true : false})
                        return (
                            <div key={item.id} id={`${item.first_name}${item.id}`} className="basis-full border border-gray-400 bg-white rounded-b  p-4 flex flex-col mb-3 xl:basis-1/3 lg:basis-2/4 sm:basis-full">
                                <div className="flex items-center">
                                    <img className="w-20 h-20 rounded-full mr-4" src={item.avatar} alt="Avatar of Writer"/>
                                    <div className="text-sm">
                                        <p className="text-gray-900 leading-none mb-0 font-bold text-xl">{`${item.first_name}  ${item.last_name}`}</p>
                                        <p className="text-gray-700 text-base mb-0 text-md"><b>Email:</b> {item.email}</p>
                                    </div>
                                </div>
                                <UncontrolledPopover
                                    placement="bottom"
                                    target={`${item.first_name}${item.id}`}
                                    trigger="legacy"
                                >
                                <PopoverHeader>
                                    User's Detaile Information
                                </PopoverHeader>
                                <PopoverBody>
                                <p className="text-gray-700 text-base mb-0 text-md"><b>Favorite color:</b> {detailed?.name}</p>
                                <p className="text-gray-700 text-base mb-0 text-md"><b>Married:</b> {detailed?.year}</p>
                                </PopoverBody>
                              </UncontrolledPopover>
                            </div>
                        )
                    })
                }
              </div>
            </div>
        </>
    )
}