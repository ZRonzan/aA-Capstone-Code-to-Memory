import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Redirect, useHistory} from 'react-router-dom'
import "./ClassCard.css"
import { deleteUserClassThunk, getUserClassesThunk } from '../../store/currentuserclasses';
import DeleteClassModal from '../DeleteClassModal/DeleteClassModal';

const ClassCard = ({ myClass }) => {

    const [isLoadeed, setIsLoaded] = useState(false)

    const dispatch = useDispatch()
    const history = useHistory()
    const 

    useEffect(() => {
        setIsLoaded(true)
    },[])

    const handleRedirect = () => {
        history.push(`/dashboard/${myClass['id']}/about`)
    }

    return isLoadeed && (
        <div
        onClick={handleRedirect}
        className={`class-card-container ${}`}
        >
            <div className='class-card-image-container'>
                <div className='class-card-image'>

                </div>
            </div>
            <div className='class-card-name'>
                {myClass.name}
            </div>
            <div className='class-card-delete-container'>
                <DeleteClassModal myClass={myClass} />
            </div>
        </div>
    );
}

export default ClassCard;
