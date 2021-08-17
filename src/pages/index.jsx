import React, { useState } from 'react';
import Image from 'next/image';
import { Layout, Button, Modal, Input, Select, Form } from 'antd';
import { Upload } from 'antd';
import { InboxOutlined, PlusOutlined } from '@ant-design/icons';
import { v4 as uuid } from 'uuid';
import { useSelector, useDispatch } from 'react-redux';
import TaskList from '../components/TaskList';
import EditTaskModal from '../components/EditTaskModal';

const { Dragger } = Upload;
const { Header, Content } = Layout;
const { Option } = Select;

// Actions

function addTaskAction(object) {
  return { type: 'ADD_TASKS', object };
}

function editTaskAction(object) {
  return { type: 'EDIT_TASK', object };
}

function closeModalAction() {
  return { type: 'OPEN_MODAL' };
}

// Modal de inserção de TASKS

const AddTaskModal = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();

  return (
    <Modal
      visible={visible}
      title='Novo ticket'
      centered
      okText='Criar ticket'
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout='vertical'
        name='form_in_modal'
        initialValues={{
          modifier: 'public',
        }}
      >
        <Form.Item
          label='Descrição'
          name='ticketDescription'
          rules={[
            { required: true, message: 'Please input your description!' },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='Tipo'
          name='ticketType'
          rules={[
            { required: true, message: 'Please select your ticket type!' },
          ]}
        >
          <Select style={{ width: '100%' }} placeholder='Menu'>
            <Option value='Bem'>Bem</Option>
            <Option value='Predial'>Predial</Option>s
            <Option value='Procedimento'>Procedimento</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label='Responsável'
          name='ticketOwner'
          rules={[
            { required: true, message: 'Please select the ticket owner!' },
          ]}
        >
          <Select style={{ width: '100%' }} placeholder='Menu'>
            <Option value='Mike'>Mike</Option>
            <Option value='Lucy'>Lucy</Option>
            <Option value='Jack'>Jack</Option>
          </Select>
        </Form.Item>

        <Form.Item label='Imagem' name='ticketImage'>
          <Dragger>
            <p className='ant-upload-drag-icon'>
              <InboxOutlined style={{ color: '#5349A1' }} />
            </p>

            <p className='ant-upload-hint'>
              Arraste uma imagem para anexar ao ticket
            </p>
          </Dragger>
        </Form.Item>
      </Form>
    </Modal>
  );
};

function Home() {
  const itemsFromBackend = useSelector((state) => state.tasks);
  const [visible, setVisible] = useState(false);
  const [editValues, setEditValues] = useState({});
  const dispatch = useDispatch();

  // Metodo de inserção

  const onCreate = (values) => {
    values.id = uuid();
    values.column = 0;
    if (values.ticketImage) {
      let reader = new FileReader();
      reader.readAsDataURL(values.ticketImage.file.originFileObj);
      reader.onload = function () {
        values.ticketImage = reader.result;
        dispatch(addTaskAction(values));
      };
    } else {
      dispatch(addTaskAction(values));
    }
    setVisible(false);
  };

  // Metodo de edição

  const onCreateEdit = (values) => {
    if (typeof values.ticketImage === 'object') {
      let reader = new FileReader();
      reader.readAsDataURL(values.ticketImage.file.originFileObj);
      reader.onload = function () {
        values.ticketImage = reader.result;
        dispatch(editTaskAction(values));
      };
    } else {
      dispatch(editTaskAction(values));
    }
    dispatch(closeModalAction(false));
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Modais
       */}
      <AddTaskModal
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
      />

      <EditTaskModal
        onCreate={onCreateEdit}
        onCancel={() => {
          dispatch(closeModalAction(false));
          setEditValues({});
        }}
        initialValues={editValues}
      />

      {/* Header */}

      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: 'white',
        }}
      >
        <Image
          src='/trilogo.svg'
          width='120px'
          height='80px'
          alt='Tilogo Logo'
        />
        <Button
          className='button-add'
          size='large'
          onClick={() => {
            setVisible(true);
          }}
        >
          <PlusOutlined /> Novo Ticket
        </Button>
      </Header>

      {/* Conteudo */}

      <Content>
        <TaskList
          itemsFromBackend={itemsFromBackend}
          setEditValues={setEditValues}
        />
      </Content>
    </Layout>
  );
}

export default Home;
