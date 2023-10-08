import {useSelector} from 'react-redux'
import {Outlet,Navigate} from 'react-router-dom'

export default function PrivateRoute() {
    const {curruntUser} = useSelector((state)=>state.user)

  return curruntUser ? <Outlet />:<Navigate to='/signin' />;
}
