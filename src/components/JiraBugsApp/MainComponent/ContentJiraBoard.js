import React, { Children } from 'react'
import { useDispatch } from 'react-redux'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { getTaskDetailsActionSaga, getAllCommentsActionSaga, updatetaskStatusActionSaga } from '../../../redux/actions/JiraBugsAction'
import { UPDATE_TASK_STATUS } from '../../../redux/constant/TaskConstant'
export const ContentJiraBoard = (props) => {

    const dispatch = useDispatch()
    const { projectDetails } = props

    const handleDragEnd = (result) => {
        let { projectId, taskId } = JSON.parse(result.draggableId); //Lấy ra chuỗi sau mỗi lần draggable

        console.log({ projectId, taskId })
        let { source, destination } = result;
        if (!result.destination) {
            return;
        }
        if (source.index === destination.index && source.droppableId === destination.droppableId) {
            return;
        }

        dispatch(updatetaskStatusActionSaga(taskId, destination.droppableId, projectId))
    }
    const renderCardTaskList = () => {
        return <DragDropContext onDragEnd={handleDragEnd}>
            {
                projectDetails.lstTask?.map((item, index) => {
                    return <Droppable key={index} droppableId={item.statusId}>
                        {(provided) => {
                            return <div

                                className="card" style={{ width: '17rem', height: 'auto' }}>
                                <div className="card-header">
                                    {item.statusName}
                                </div>
                                <ul
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    key={index}
                                    className="list-group list-group-flush p-1"
                                >
                                    {
                                        item.lstTaskDeTail.map((task, index) => {
                                            return <Draggable
                                                key={task.taskId.toString()}
                                                index={index}
                                                draggableId={JSON.stringify({ projectId: task.projectId, taskId: task.taskId })}
                                            >
                                                {
                                                    (provided) => {
                                                        return <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            key={task.alias} className="list-group-item p-3" data-toggle="modal" data-target="#infoModal"
                                                            onClick={() => {
                                                                dispatch(getAllCommentsActionSaga(task.taskId))
                                                                dispatch(getTaskDetailsActionSaga(task.taskId))
                                                            }}



                                                        >
                                                            <p className='font-weight-bold'>
                                                                {task.taskName}
                                                            </p>
                                                            <div className="block" style={{ display: 'flex' }}>
                                                                <div className="block-left">
                                                                    <p className='text-danger'> {task.priorityTask.priority}
                                                                        {/* <i className="fa fa-arrow-up mx-2"></i> */}
                                                                    </p>


                                                                </div>
                                                                <div className="block-right">
                                                                    <div className="avatar-group" style={{ display: 'flex' }}>
                                                                        {task.assigness.map((mem, index) => {
                                                                            return <div key={`avamemmem.${mem.id}`} className="avatar">
                                                                                <img src={mem.avatar} alt='ava2' />
                                                                            </div>
                                                                        })}


                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    }
                                                }

                                            </Draggable>


                                        })
                                    }

                                    {provided.placeholder}
                                </ul>

                            </div>
                        }}

                    </Droppable>

                })
            }


        </DragDropContext>


    }
    return (
        <>
            <div className="content" style={{ display: 'flex' }}>
                {renderCardTaskList()}

            </div>
        </>
    )
}
