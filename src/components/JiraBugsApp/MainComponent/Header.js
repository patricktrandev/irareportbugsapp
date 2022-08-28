import React from 'react'

export const Header = (props) => {
    return (
        <>
            <div className="header">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb" style={{ backgroundColor: 'white' }}>
                        <li className="breadcrumb-item">Project</li>
                        <li className="breadcrumb-item">Jira Report Bugs</li>
                        <li className="breadcrumb-item active" aria-current="page">
                            {props.projectName.projectName} Board
                        </li>
                    </ol>
                </nav>
            </div>
        </>
    )
}
