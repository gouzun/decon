import React from 'react';
import { useState, useEffect ,useRef } from 'react';
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
    const imageRef = useRef(null);
    const getImageStartPosition = () => {
        const imageElement = imageRef.current;
        if (imageElement) {
          const { top, left } = imageElement.getBoundingClientRect();
          console.log('Image starting position:', top, left);
        }
      };

      useEffect(()=>{
        getImageStartPosition();
      },[]);
    return (
        <>
            <div className='bg-red-100'>
                <Draggable {...dragHandlers}
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

            </div>
            <img ref={imageRef} src='https://firebasestorage.googleapis.com/v0/b/defixdb.appspot.com/o/BUKIT%20PUCHONG-WAYNE-pork%40gmail.com%2FBUKIT%20PUCHONG-WAYNE-pork%40gmail.com-GROUND%20FLOOR?alt=media&token=3bf05cae-1296-400d-a46b-d87969ba9b4c' alt=''/>
            </>
    );
};




export default TestPage;
