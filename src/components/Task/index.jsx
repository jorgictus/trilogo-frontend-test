import React from 'react';
import { Button, Card, Popover, Modal } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';

function deleteTaskAction(id) {
  return { type: 'DELETE_TASK', id };
}

function openModalAction() {
  return { type: 'OPEN_MODAL' };
}

const Task = ({ item, setEditValues }) => {
  const dispatch = useDispatch();

  const { confirm } = Modal;

  function showDeleteConfirm(item) {
    confirm({
      title: `Você tem certeza que deseja deletar essa atividade?`,
      icon: <ExclamationCircleOutlined />,
      content: `${item.ticketOwner} - ${item.ticketType} - ${item.ticketDescription}`,
      okText: 'Sim',
      okType: 'danger',
      cancelText: 'Não',
      onOk() {
        dispatch(deleteTaskAction(item.id));
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  return (
    <Card
      style={{
        width: '100%',
      }}
      cover={
        item.ticketImage && (
          <img className='p-5' alt='example' src={item.ticketImage} />
        )
      }
    >
      <div className='flex flex-col'>
        <p
          style={{ width: 100 }}
          className='bg-indigo-300 rounded-lg flex justify-center text-indigo'
        >
          {item.ticketType}
        </p>
        <span className='font-semibold'>{item.id}</span>
        <span className='text-gray'>{item.ticketDescription}</span>
      </div>
      <div className='flex items-center justify-beetween'>
        <div>{item.ticketOwner}</div>

        <Popover
          placement='bottomLeft'
          content={
            <div className='flex flex-col'>
              <Button
                onClick={() => {
                  dispatch(openModalAction());
                  setEditValues(item);
                }}
                type='text'
              >
                Editar
              </Button>

              <Button onClick={() => showDeleteConfirm(item)} type='text'>
                Excluir
              </Button>
            </div>
          }
          trigger='hover'
        >
          <Button type='text' shape='circle'>
            <EllipsisOutlined key='ellipsis' style={{ fontSize: 32 }} />
          </Button>
        </Popover>
      </div>
    </Card>
  );
};

export default Task;
