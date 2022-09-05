import './PageNotFound.css'
import image from '../../assets/not-found.png'
import {useSelector} from 'react-redux'
import { NavLink } from 'react-router-dom'

const PageNotFound = () => {
    const user = useSelector(state => state.session.user)

    return (
        <div className='not-found-page-container'>
            <div className='not-found-page-left-container'>
                <div className='not-found-page-title'>
                    404
                </div>
                <div className='not-found-page-subtitle'>
                    We're stumped...
                </div>
                <div className='not-found-page-text'>
                    We can't find the page you're looking for. <br></br>
                    Try navigating back to {!!user? <NavLink to='/dashboard' className='not-found-page-navlink'>your dashboard</NavLink> : <NavLink to='/' className='not-found-page-navlink'>the home page</NavLink>}
                </div>
            </div>
            <img className='not-found-page-image' src={image}>

            </img>
        </div>
    )

}

export default PageNotFound;
