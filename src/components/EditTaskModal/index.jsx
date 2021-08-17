import React from 'react';
import { Modal, Input, Select, Form } from 'antd';
import { Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';

const EditTaskModal = ({ onCreate, onCancel, initialValues }) => {
  const [form] = Form.useForm();
  const visible = useSelector((state) => state.modal);
  const { Option } = Select;
  const { Dragger } = Upload;

  return (
    <Modal
      visible={visible}
      title='Editar ticket'
      okText='Editar ticket'
      centered
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate({
              ...values,
              id: initialValues.id,
              column: initialValues.column,
            });
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        initialValues={initialValues}
        layout='vertical'
        name='form_in_modal'
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

export default EditTaskModal;
