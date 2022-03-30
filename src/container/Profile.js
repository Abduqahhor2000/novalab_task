import axios from "axios"
import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

export default function Profile () {
    const State_User = useSelector(state => state?.user)
    const navigate = useNavigate()
    const [user, setUser] = useState({})
    const [detaile, setDetaile] = useState({})
    const [error, setError] = useState("")

    useEffect(()=>{
        if(!State_User.token){
            navigate("/")
        }
        const getUser = async function (){
            const userID = State_User?.id ? State_User.id : 1
            try{
                const {data} = await axios.get(`/users/${userID}`)
                console.log(data)
                setUser(data.data)
                try{
                    const detaile1 = await axios.get(`/unknown/${userID}`)
                    console.log(detaile1)
                    setDetaile(detaile1.data.data)
                }catch(error){
                    setUser({})
                    setError(error)
                    console.log(error)
                }
            }catch(error){
                setError(error)
                console.log(error)
            }
        }
        getUser()
    }, [navigate, State_User])

    return (
        <>
            <header className="bg-white shadow">
              <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
              </div>
            </header>
            <main>
              <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                  <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 p-3">
                    <div className="flex items-center">
                        <img className="w-30 h-30 rounded-full mr-4" src={user.avatar} alt="Avatar of Writer"/>
                        <div className="text-sm">
                            <p className="text-gray-700 text-base mb-2 text-md"><b>Fist Name: </b>{user.first_name}</p>
                            <p className="text-gray-700 text-base mb-2 text-md"><b>Last Name: </b>{user.last_name} </p>
                            <p className="text-gray-700 text-base mb-2 text-md"><b>Email: </b>{user.email} </p>
                            <p className="text-gray-700 text-base mb-2 text-md"><b>Favorite color: </b>{detaile.name} </p>
                            <p className="text-gray-700 text-base mb-2 text-md"><b>Married: </b>{detaile.year} </p>
                        </div>
                    </div>
                  </div>
                </div>        
              </div>
            </main>
        </>
    )
}