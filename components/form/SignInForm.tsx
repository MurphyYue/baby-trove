"use client"
import { Input, Button, Form } from 'antd-mobile';

const SignInForm: React.FC = () => {
  const onFinish = (values: any) => {
    console.log(values);
  }
  return (
    <>
      <Form
        onFinish={onFinish}
        layout='horizontal'
        footer={
          <Button block type='submit' color='primary' size='large'>
            sign in
          </Button>
        }
      >
        <Form.Item label='email' name='email' rules={[
          { required: true },
          { type: 'string', min: 6 },
          { type: 'email', warningOnly: true },
        ]}>
          <Input placeholder='please input email' clearable />
        </Form.Item>
        <Form.Item label='password' name='password' rules={[{ required: true, message: 'password can not be enpty' }]}>
          <Input placeholder='please input password' clearable type='password' />
        </Form.Item>
      </Form>
      <div className="text-center">
        <p className="text-sm">
          Don't have an account? <a href="/sign-up" className="text-blue-500">Sign Up</a>
        </p>
      </div>
    </>
  );
};

export default SignInForm;