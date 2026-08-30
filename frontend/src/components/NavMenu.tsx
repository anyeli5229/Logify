import { Fragment } from 'react'
import { Popover, PopoverButton, PopoverPanel, Transition } from '@headlessui/react'
import { Bars3Icon } from '@heroicons/react/20/solid'
import { Link } from 'react-router-dom'
import type { User } from '@/types'
import { useQueryClient } from '@tanstack/react-query'

type NavMenuProps = {
  name: User['name']
}

export default function NavMenu({name} : NavMenuProps) {

  const queryClient = useQueryClient();
  const logout = () => {
    localStorage.removeItem("AUTH_TOKEN");
    queryClient.invalidateQueries({queryKey: ["user"]});
  }

  return (
    <Popover className="relative">
      <PopoverButton className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 p-1 rounded-lg bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:scale-105 transition-all duration-200">
        <Bars3Icon className='w-8 h-8 text-white ' />
      </PopoverButton>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <PopoverPanel className="absolute left-1/2 z-10 mt-5 flex w-screen lg:max-w-min -translate-x-1/2 lg:-translate-x-48">
          <div className="w-full lg:w-56 shrink rounded-xl bg-white p-4 text-sm font-semibold leading-6 text-gray-900 shadow-lg ring-1 ring-blue-700">
            <p className='text-center'>Hola: {name}</p>
            <Link
              to='/profile'
              className='block p-2 hover:text-purple-950 hover:bg-violet-50 rounded-2xl transition-all duration-200'
            >Mi Perfil</Link>
            <Link
              to='/'
              className='block p-2 hover:text-purple-950 hover:bg-violet-50 rounded-2xl transition-all duration-200'
            >Mis Proyectos</Link>
            <button
              className='block w-full text-left p-2 hover:text-red-600 hover:bg-red-50 rounded-2xl transition-all duration-200'
              type='button'
              onClick={logout}
            >
              Cerrar Sesión
            </button>
          </div>
        </PopoverPanel>
      </Transition>
    </Popover>
  )
}