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
        <div>
            <div>
                Add Classes to your Library
            </div>
            <div>
                Your librabry is empty
            </div>
            <div>
                You can create your own classes using the "+" icon on the sidebar. Why not create one to get yourself started! 
            </div>
        </div>
    );
}

export default ClassCard;
