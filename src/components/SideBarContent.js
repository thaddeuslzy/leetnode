import React from 'react';
import Problem from './Problem'

const SidebarContent = (props) => {
  return(
    <>
      <div className='side-container'>
        <h1 className='side-header'>
          LeetNode
        </h1>
        <Problem/>
      </div>
      <style jsx>{`
        .side-container {
          display: flex;
          flex-direction: column;
        }
        .side-header {
          margin: 0; 
          padding: 1rem;
          border-bottom: solid thin;
          border-color: lightgrey;
        }
      `}
      </style>
    </>
  )
}

export default SidebarContent;