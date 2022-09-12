import {useSelector} from 'react-redux'
import { NavLink } from 'react-router-dom'

const SectionNotFound = () => {
    const user = useSelector(state => state.session.user)

    return (
        <div className='not-found-page-container'>
            <div className='not-found-page-left-container'>
                <div className='not-found-page-title'>
                    Whoops...
                </div>
                <div className='not-found-page-subtitle'>
                    You shouldn't be here...
                </div>
                <div className='not-found-page-text'>
                    Looks like the url path led you astray (or perhaps you tried going there...). <br></br>
                    Try navigating back to {!!user? <NavLink to='/dashboard' className='not-found-page-navlink'>your dashboard</NavLink> : <NavLink to='/' className='not-found-page-navlink'>the home page</NavLink>}<br></br>
                    Or clicking one of the above tabs to go back to safer ground.
                </div>
            </div>
        </div>
    )

}

export default SectionNotFound;
