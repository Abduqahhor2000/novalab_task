import React from "react"
import { NavLink, Outlet, useLocation, useNavigate} from "react-router-dom"
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline'
import { useDispatch, useSelector } from "react-redux"
import { clearUserData } from "../store/actions/userDataAction"

export default function Home () {
  const loaction = useLocation();
  const State_User = useSelector(state => state?.user)
  const State_Users = useSelector(state => state?.users)
  const userID = State_User.id ? State_User.id : 1
  console.log(State_User.token)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const menuList =[
      { name: 'Home', href: '/'},
      { name: 'Profile', href: '/profile'},
      { name: 'Login', href: '/sign-in'},
      { name: 'Registration', href: '/sign-up'},
    ]
  console.log(loaction)

    function classNames(...classes) {
      return classes.filter(Boolean).join(' ')
    }

    return (
        <>  
          <Disclosure as="nav" className="bg-gray-800">
            {({ open }) => (
              <>
                <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                  <div className="relative flex items-center justify-between h-16">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                      {/* Mobile menu button*/}
                      <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                        <span className="sr-only">Open main menu</span>
                        {open ? (
                          <XIcon className="block h-6 w-6" aria-hidden="true" />
                        ) : (
                          <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                        )}
                      </Disclosure.Button>
                    </div>
                    <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                      <div className="flex-shrink-0 flex items-center">
                        <img
                          className="block lg:hidden h-8 w-auto"
                          src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                          alt="Workflow"
                        />
                        <img
                          className="hidden lg:block h-8 w-auto"
                          src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
                          alt="Workflow"
                        />
                      </div>
                      <div className="hidden sm:block sm:ml-6">
                        <div className="flex space-x-4">
                          {menuList.map((item) =>{
                            if (!State_User.token && item.href === "/profile"){
                              return null;
                            }
                            return(
                              <NavLink
                                key={item.name}
                                to={item.href}
                                className={classNames(
                                  item.href === loaction.pathname ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                  'px-3 py-2 rounded-md text-sm font-medium'
                                )}
                                aria-current={item.current ? 'page' : undefined}
                              >
                                {item.name}
                              </NavLink>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                    { 
                      !State_User.token ? null : 
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                          <button
                            type="button"
                            className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                          >
                            <span className="sr-only">View notifications</span>
                            <BellIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
          
                          {/* Profile dropdown */}
                         
                          <Menu as="div" className="ml-3 relative">
                            <div>
                              <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                <span className="sr-only">Open user menu</span>
                                <img
                                  className="h-8 w-8 rounded-full"
                                  src={State_Users.find(function(item){return item.id === userID ? true : false}).avatar}
                                  alt=""
                                />
                              </Menu.Button>
                            </div>
                            <Transition
                              as={Fragment}
                              enter="transition ease-out duration-100"
                              enterFrom="transform opacity-0 scale-95"
                              enterTo="transform opacity-100 scale-100"
                              leave="transition ease-in duration-75"
                              leaveFrom="transform opacity-100 scale-100"
                              leaveTo="transform opacity-0 scale-95"
                            >
                              <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <Menu.Item>
                                  {({ active }) => (
                                    <NavLink
                                      to="/profile"
                                      className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                    >
                                      Your Profile
                                    </NavLink>
                                  )}
                                </Menu.Item>
                                <Menu.Item onClick={()=> {dispatch(clearUserData()); navigate("/")}}>
                                  {({ active }) => (
                                    <a 
                                      href="/"
                                      className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                    >
                                      Sign out
                                    </a>
                                  )}
                                </Menu.Item>
                              </Menu.Items>
                            </Transition>
                          </Menu>
                        </div>
                    }
                  </div>
                </div>
      
                    <Disclosure.Panel className="sm:hidden">
                      <div className="px-2 pt-2 pb-3 space-y-1">
                        {menuList.map((item) => {
                          if (!State_User.token && item.href === "/profile"){
                            return null;
                          }
                          return(
                            <Disclosure.Button>
                              <NavLink
                                key={item.name}
                                to={item.href}
                                className={classNames(
                                  item.href === loaction.pathname ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                  'block px-3 py-2 rounded-md text-base font-medium'
                                )}
                                >
                                {item.name}
                              </NavLink>
                            </Disclosure.Button>
                          )
                        })}
                      </div>
                    </Disclosure.Panel>
                
              </>
            )}
          </Disclosure>
          <Outlet/>
        </>
    )
}