import React from 'react';
import { useState, useEffect } from 'react';
import Draggable, { DraggableCore } from 'react-draggable'; // Both at the same time

const TestPage = () => {
   
    return (
        <>
            <div>
                <Draggable bounds={{ top: -100, left: -100, right: 100, bottom: 100 }} >
                    <div className="box">I can only be moved 100px in any direction.</div>
                </Draggable>
               
                {/* Rest of the draggable components */}
            </div>
        </>
    );
};



export default TestPage;
