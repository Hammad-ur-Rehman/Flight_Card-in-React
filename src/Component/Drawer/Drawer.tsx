// Drawer.tsx
import React, { useState, useEffect} from 'react';
import styled from 'styled-components';
import { FlightDetails } from '../Types/Types';
interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  cardRef: React.RefObject<HTMLDivElement>;
  flightdetails:FlightDetails[];
}

const DrawerWrapper = styled.div<{ isOpen: boolean; top: number }>`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  top: ${({ top }) => `${top}px`};
  width: 100%;
  box-shadow: 0px 0px 1px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  `;

const Overlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  animation-duration: 4s;
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
`;

const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose, children, cardRef }) => {
  const [top, setTop] = useState(0);

  useEffect(() => {
    if (cardRef.current && isOpen) {
      const rect = cardRef.current.getBoundingClientRect();  //This method returns the size and position of an element relative to the viewport.  
      
                                                              //rect.bottom gives the vertical position of the bottom edge of the referenced element.
       setTop(rect.bottom); //This updates the top state with the bottom position of the referenced element, ensuring the drawer appears directly below the referenced element.
    }
  }, [isOpen, cardRef]);


  return (
    <>
      <Overlay isOpen={isOpen} onClick={onClose} />
      <DrawerWrapper isOpen={isOpen} top={top}>
        {children}
      </DrawerWrapper>
    </>
  );
};

export default Drawer;
