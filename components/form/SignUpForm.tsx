"use client"
import { Input, Button, Form } from 'antd-mobile';
import { useRouter } from 'next/navigation';

const SignInForm: React.FC = () => {
  const router = useRouter();
  const onFinish = async (values: any) => {
    const { username, email, password, confirmPassword } = values;
    if (password !== confirmPassword) {
      alert("password do not match");
      return;
    }
    const response = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });
    console.log(response.json())
    if (response.ok) {
      router.push('/sign-in')
    } else {
      console.error('something went wrong when sign up')
    }
  }
  const onValuesChange = (changedValues: any, values: any) => {
    if (changedValues.password || changedValues.confirmPassword) {
        if (values.confirmPassword && values.password && values.confirmPassword !== values.password) {
            alert('password do not match')
        }
    }
  }
  return (
    <>
      <Form
        onFinish={onFinish}
        // onValuesChange={onValuesChange}
        footer={
          <Button block type='submit' color='primary' size='large'>
            sign up
          </Button>
        }
      >
        <Form.Item
          name='username'
          label='username'
          rules={[{ required: true, message: 'username can not be enpty' }]}
        >
            <Input placeholder='please input username' clearable />
        </Form.Item>
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
        <Form.Item label='confirm password' name='confirmPassword' rules={[{ required: true, message: 'password can not be enpty' }]}>
          <Input placeholder='Re-Enter the password' clearable type='password'/>
        </Form.Item>
      </Form>
      <div className="text-center">
        <p className="text-sm">
          Have an account? <a href="/sign-in" className="text-blue-500">Sign in</a>
        </p>
      </div>
    </>
  );
};

export default SignInForm;