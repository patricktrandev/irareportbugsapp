import React from 'react'
import parse from 'html-react-parser';
export const Info = (props) => {



    const renderAvatar = () => {
        return props.members?.map((ava, index) => {
            return <div key={`ava${ava.userId}`} className="avatar">
                <img src={ava.avatar} alt={ava.name} />
            </div>
        })
    }
    return (
        <>

            <h3>{props.projectName} Board</h3>

            {
                props.description &&
                <section>
                    {parse(props.description)}
                </section>
            }

            <div className="info" style={{ display: 'flex' }}>
                <div className="search-block">
                    <input className="search" />
                    <i className="fa fa-search" />
                </div>
                <div className="avatar-group" style={{ display: 'flex' }}>
                    {renderAvatar()}
                </div>
                <div style={{ marginLeft: 20 }} className="text">Only My Issues</div>
                <div style={{ marginLeft: 20 }} className="text">Recently Updated</div>
            </div>
        </>
    )
}
