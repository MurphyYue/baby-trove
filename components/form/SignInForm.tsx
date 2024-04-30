"use client"
import { Input, Button, Form, Toast } from 'antd-mobile';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import GithubSignInButton from '@/components/GithubSignInButton'

const SignInForm: React.FC = () => {
  const router = useRouter();
  const onFinish = async (values: any) => {
    const signinData = await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false
    });
    if (!signinData?.ok) {
      Toast.show({
        icon: 'fail',
        content: 'wrong email or password',
      })
    } else {
      router.push('/')
    }
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
      <div className="text-center p-3">
        <GithubSignInButton>sign in with github</GithubSignInButton>
      </div>
      <div className="text-center">
        <p className="text-sm">
          Do not have an account? <a href="/sign-up" className="text-blue-500">Sign Up</a>
        </p>
      </div>
    </>
  );
};

export default SignInForm;