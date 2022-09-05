import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Redirect, useHistory, NavLink} from 'react-router-dom'
import "./ClassCard.css"
import DeleteClassModal from '../DeleteClassModal/DeleteClassModal';
import IMAGES from './iconPath-copy.json'
import ICONS from './icons';
import codingimage from '../../assets/icons/coding.svg'


const ClassCard = ({ myClass, setSortedClasses }) => {

    const [isLoaded, setIsLoaded] = useState(false)
    const [image, setImage] = useState(codingimage)

    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        for (let i = 0; i < IMAGES.length; i++) {
            if (myClass.name.toUpperCase().includes(IMAGES[i].name)) {
                setImage(ICONS[IMAGES[i].name])
                break;
            }
        }
        setIsLoaded(true)
    },[])

    return isLoaded && (
        <NavLink
        to={`/dashboard/${myClass['id']}/about`}
        className={`class-card-container`}
        >
            <div className='class-card-image-container'>
                <img src={image} className='class-card-image'>

                </img>
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
