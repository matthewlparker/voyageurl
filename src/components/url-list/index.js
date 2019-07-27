import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { postReorderedURLs } from '../../api-requests/post-reordered-urls';
import URLCard from '../url-card';
import styled from 'styled-components';

const grid = 8;

const StyledURLList = styled.div`
  width: 100%;
  background: ${props =>
    props.isDraggingOver ? 'lightblue' : 'var(--background-primary)'};
  margin-top: ${props => (props.user === 'visitor' ? '35px' : '0')};
`;

const StyledURLCard = styled.div`
  user-select: none;
  padding: ${grid * 2}px;
  margin: 0 0 ${grid}px 0;
  background: ${props => (props.isDragging ? 'lightgreen' : 'white')};
  box-shadow: 0 0 5px
    ${props => (props.isDragging ? 'var(--color-blue)' : 'var(--color-orange)')};
  overflow: hidden;
`;

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const URLList = props => {
  const [urls, setURLs] = useState(props.urls);
  // watch urls for change excepting initial render
  const firstUpdate = useRef(true);
  useLayoutEffect(
    () => {
      if (firstUpdate.current) {
        firstUpdate.current = false;
        return;
      }
      if (props.user && props.user !== 'visitor') {
        postReorderedURLs(props.urls, props.user._id).then(result =>
          props.setUser(result)
        );
      }
      // if (props.user && props.user === 'visitor') {
      //   localStorage.setItem('visitorURLs', JSON.stringify(urls));
      // }
    },
    [urls]
  );

  // useEffect(
  //   () => {
  //     if (props.user === 'visitor') {
  //       props.setURLs(urls);
  //     }
  //   },
  //   [urls]
  // );

  // watch props.urls for change
  useEffect(
    () => {
      if (arraysUnequal(props.urls, urls)) {
        setURLs(props.urls);
      }
    },
    [props.urls]
  );

  const arraysUnequal = (arr1, arr2) => {
    if (arr1.length !== arr2.length) return true;
    for (let i = arr1.length; i--; ) {
      if (arr1[i]._id !== arr2[i]._id) return true;
    }
    return false;
  };

  const onDragEnd = result => {
    if (!result.destination) {
      return;
    }

    const reorderedURLs = reorder(
      props.urls,
      result.source.index,
      result.destination.index
    );

    props.setURLs(reorderedURLs);
  };
  return (
    <DragDropContext onDragEnd={onDragEnd} id="scrolling-container">
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <StyledURLList
            ref={provided.innerRef}
            isDraggingOver={snapshot.isDraggingOver}
            user={props.user}
          >
            {props.urls.map((url, index) => (
              <Draggable key={url.hash} draggableId={url.hash} index={index}>
                {(provided, snapshot) => (
                  <StyledURLCard
                    ref={provided.innerRef}
                    style={provided.draggableProps.style}
                    isDragging={snapshot.isDragging}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <URLCard
                      url={url}
                      setUser={props.setUser}
                      handleRemove={props.urlRemove}
                    />
                  </StyledURLCard>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </StyledURLList>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default URLList;
