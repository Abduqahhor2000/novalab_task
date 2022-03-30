import React, { useEffect, useState } from "react"
import { LockClosedIcon } from '@heroicons/react/solid'
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { addUserData, clearUserData } from "../store/actions/userDataAction"
import { useNavigate } from "react-router-dom"

export default function Register () {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const dispatch = useDispatch()
  const State_User = useSelector(state => state.user)
  const navigate = useNavigate()
   
    const register = async function (e){
      e.preventDefault();
      try{
        const data = await axios.post("/register", {email, password})
        dispatch(addUserData(data.data))
        navigate("/")
      }catch(error){
        console.log(error)
        dispatch(clearUserData())
        setError(error)
      }
    }

    return (
        <> 
         <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
              <div className="max-w-md w-full space-y-8">
                <div>
                  <img
                    className="mx-auto h-12 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                    alt="Workflow"
                  />
                  <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create your account</h2>
                  <p className="mt-2 text-center text-sm text-gray-600">
                    Or{' '}
                    <a href="/" className="font-medium text-indigo-600 hover:text-indigo-500">
                      start your 14-day free trial
                    </a>
                  </p>
                </div>
                <form onSubmit={register} className="mt-8 space-y-6">
                  <input type="hidden" name="remember" defaultValue="true" />
                  <div className="rounded-md shadow-sm -space-y-px">
                    <div className="mb-3">
                      <label htmlFor="email-address">
                        Email address
                      </label>
                      <input
                        id="email-address"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e)=> setEmail(e.target.value)}
                        required
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Email address"
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="password">
                        Password
                      </label>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        value={password}
                        onChange={(e)=> setPassword(e.target.value)}
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Password"
                      />
                    </div>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                        <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                      </span>
                      Create Account
                    </button>
                  </div>
                </form>
              </div>
            </div>
        </>
    )
}