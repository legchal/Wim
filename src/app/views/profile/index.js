import React, { useState, useEffect, Fragment } from 'react';
import { Card, Col, Row, Button, Icon, Upload, message } from 'antd';
import { Form } from '@rocketseat/unform';
import InputUnform from '../../components/InputUnform';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileRequest, updateProfileRequest, updateAvatarRequest } from '../../store/actions/profile.actions';

export default function Profile() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.profile);

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => { 
    dispatch(getProfileRequest());
  }, []);

  useEffect(() => {
    setImageUrl(profile.profile.avatar);
  }, [profile])

  function handleSubmit(data) {
    dispatch(updateProfileRequest(data));
  }

  function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  function handleChange(info) {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, imageUrl => {
        setLoading(false);
        setImageUrl(imageUrl);
      });
      
      const data = new FormData();
      data.append('file', info.file.originFileObj);
      dispatch(updateAvatarRequest(data));
    }
  };

  function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }

  
  const uploadButton = (
    <div>
      <Icon type={loading ? 'loading' : 'plus'} />
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  return (
    <Fragment>
      <Card
        title={
          <Row>
            <Icon type="user" style={{ fontSize: '20px' }} /> <span style={{ fontSize: '20px' }}>Seu Perfil</span>
          </Row>
        }
      >
        <Form className="form-users profile-layout" onSubmit={handleSubmit} initialData={profile.profile}>
          <Row>
            <center>
              <Col xs={{ span: 24 }} lg={{ span: 24 }} sm={{ span: 24 }}>
                <Upload
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  beforeUpload={beforeUpload}
                  onChange={handleChange}
                >
                  {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%', borderRadius: '60px' }} /> : uploadButton}
                </Upload>
              </Col>
            </center>
            <Col xs={{ span: 24 }} lg={{ span: 24 }} sm={{ span: 24 }}>
              <InputUnform contentLabel={'Nome:'} nameInput={'name'}></InputUnform>
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 24 }} sm={{ span: 24 }}>
              <InputUnform contentLabel={'E-mail:'} nameInput={'email'}></InputUnform>
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 24 }} sm={{ span: 24 }}>
              <InputUnform type="password" contentLabel={'Alterar Senha:'} nameInput={'password'}></InputUnform>
            </Col>
            <center>
              <Col xs={{ span: 24 }} lg={{ span: 24 }} sm={{ span: 24 }}>
                <Button className="btn ant-btn-primary btn-profile-position" htmlType="submit"><Icon type="save" />Salvar</Button>
              </Col>
            </center>
          </Row>
        </Form>
      </Card>
    </Fragment>
  );
}
