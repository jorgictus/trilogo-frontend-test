import React, { useState, useEffect } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import Task from '../Task';

const TaskList = ({ itemsFromBackend, setEditValues }) => {
  const dispatch = useDispatch();
  const [columns, setColumns] = useState([]);

  // Actions

  function moveTaskAction(object) {
    return { type: 'MOVE_TASK', object };
  }

  useEffect(() => {
    const columnsFromBackend = {
      0: {
        name: 'Abertos',
        items: [],
        color: '#F6C7CA',
      },
      1: {
        name: 'Executados',
        items: [],
        color: '#F4D8CB',
      },
      2: {
        name: 'Vistoriados',
        items: [],
        color: '#D3F0C5',
      },
      3: {
        name: 'Arquivados',
        items: [],
        color: '#EFEDED',
      },
    };
    itemsFromBackend.map((item) => {
      columnsFromBackend[item.column].items.push(item);
    });
    setColumns(columnsFromBackend);
  }, [itemsFromBackend]);

  // Metodo drag (Responsavel por fazer o drag and drop pacote dnd)

  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);

      destItems.splice(destination.index, 0, removed);

      destItems.map((item, key) => {
        destItems[key].column = destination.droppableId;
      });

      dispatch(moveTaskAction(destItems));

      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: { ...column, items: copiedItems },
      });
    }
  };

  return (
    <div
      className='flex justify-beetween'
      style={{
        padding: '30px 50px',
      }}
    >
      {/* Correção bug de integração do nextJs com dnd */}

      {typeof window !== 'undefined' && (
        <DragDropContext
          onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
        >
          {Object.entries(columns).map(([columnId, column]) => {
            return (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
                key={columnId}
                className='column-style'
              >
                <div
                  style={{
                    width: '100%',
                    borderTopLeftRadius: '10px',
                    borderTopRightRadius: '10px',
                    padding: '10px',
                    backgroundColor: column.color,
                  }}
                  className='font-semibold'
                >
                  {column.name}
                </div>

                <div style={{ padding: '0px 8px 0px 8px' }}>
                  <Droppable droppableId={columnId} key={columnId}>
                    {(provided, snapshot) => {
                      return (
                        <div
                          className='taskList'
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={{
                            background: snapshot.isDraggingOver
                              ? '#cdcae3'
                              : 'white',
                            padding: 4,
                            width: 280,
                            minHeight: 500,
                          }}
                        >
                          {column.items.map((item, index) => {
                            return (
                              <Draggable
                                key={item.id}
                                draggableId={item.id}
                                index={index}
                              >
                                {(provided) => {
                                  return (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                    >
                                      {/* Card Task */}

                                      <Task
                                        item={item}
                                        setEditValues={setEditValues}
                                      />
                                    </div>
                                  );
                                }}
                              </Draggable>
                            );
                          })}
                          {provided.placeholder}
                        </div>
                      );
                    }}
                  </Droppable>
                </div>
              </div>
            );
          })}
        </DragDropContext>
      )}
    </div>
  );
};

export default TaskList;
