import React from 'react';
import { useState, useEffect } from 'react';
import Draggable, { DraggableCore } from 'react-draggable'; // Both at the same time
import pin from '../../assets/img/pin-red.svg';
import { Resizable } from 're-resizable';

const TestPage = () => {

    const onStart = () => {
        console.log('onStart');

    };
    const onStop = (e, data) => {
        console.log('onStop');
        console.log('Mouse location:', { x: data.x, y: data.y });

    };


    const dragHandlers = { onStart, onStop };
    return (
        <>
            <div>
                <Draggable bounds={{ top: -100, left: -100, right: 100, bottom: 100 }} {...dragHandlers}
                >
                    <Resizable
                        defaultSize={{
                            width: 35,
                            height: 35
                        }}
                        style={{
                            background: `url(${pin})`,
                            backgroundSize: 'contain',
                            backgroundRepeat: 'no-repeat'
                        }}
                        lockAspectRatio={true}
                        enable={{ top: false, right: false, bottom: false, left: false, topRight: false, bottomRight: false, bottomLeft: false, topLeft: false }}
                    >
                    </Resizable>

                </Draggable>

            </div></>
    );
};




export default TestPage;
