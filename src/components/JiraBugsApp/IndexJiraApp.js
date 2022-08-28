import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ContentJiraBoard } from './MainComponent/ContentJiraBoard'
import { Header } from './MainComponent/Header'
import { Info } from './MainComponent/Info'
import { getProjectDetailsActionToSaga } from '../../redux/actions/JiraBugsAction'
export const IndexJiraApp = (props) => {
    const dispatch = useDispatch()
    const { projectDetails } = useSelector(state => state.SingleProjectReducer);
    useEffect(() => {
        const projectId = props.match.params.id;
        dispatch(getProjectDetailsActionToSaga(projectId))
    }, [])

    return (

        <div div className="main" >
            <Header projectName={projectDetails} />
            <Info members={projectDetails.members} projectName={projectDetails.projectName} description={projectDetails.description} />
            <ContentJiraBoard projectDetails={projectDetails} />
        </div >
    )
}
