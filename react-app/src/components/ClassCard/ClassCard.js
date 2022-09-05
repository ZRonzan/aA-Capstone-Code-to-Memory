import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Redirect, useHistory, NavLink} from 'react-router-dom'
import "./ClassCard.css"
import DeleteClassModal from '../DeleteClassModal/DeleteClassModal';
import IMAGES from './iconPaths.json'

const ClassCard = ({ myClass, setSortedClasses }) => {

    const [isLoadeed, setIsLoaded] = useState(false)
    const [image, setImage] = useState('/images/coding.svg')

    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        for (let i = 0; i < IMAGES.length; i++) {
            if (myClass.name.toUpperCase().includes(IMAGES[i].name)) {
                setImage(IMAGES[i].path)
                break
            }
        }
        setIsLoaded(true)
    },[])

    return isLoadeed && (
        <NavLink
        to={`/dashboard/${myClass['id']}/about`}
        className={`class-card-container`}
        >
            <div className='class-card-image-container'>
                <div style={{ "backgroundImage": `url(${ "%PUBLIC_URL%" + image})`}} className='class-card-image'>

                </div>
            </div>
            <div className='class-card-name'>
                {myClass.name}
            </div>
            <div className='class-card-delete-container'>
                <DeleteClassModal myClass={myClass} setSortedClasses={setSortedClasses}/>
            </div>
        </NavLink>
    );
}

export default ClassCard;
