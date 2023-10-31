
import React from "react";

import {
    Button,
    Form,
    Input,
  } from 'antd';
import Password from "antd/es/input/Password";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

  //DELETE SUFFIX SELECTOR AND PREFIX SELECTOR, Website options, website change

  
  
  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 8,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16,
      },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };



function CreateAccount() {
    //WILL NEED FETCH POST USER
    const history = useHistory()
    const [form] = Form.useForm();


    
    const onFinish = (values) => {
    fetch("/users", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            name: values.fName + values.lName,
            email: values.email,
            password: values.password
        })
    })
    .then(res => {
        if (res.ok) {
            res.json().then(() => {
                history.push("/")
            })
        }
    })
  };


    return (
        <div id="signUpPage">
            <div></div>

            <div id="simple">
                <div id="signUpDetailsTop"></div>
                <div id="superSimple">
                    <h2>Create Your Account</h2>
                </div>
            </div>

        <div id="signUpContainer">
            <div className="signUpDetails">

            </div>
            <Form
                className="signUpForm"
                {...formItemLayout}
                form={form}
                name="SignUp"
                onFinish={onFinish}
                // style={{
                //     maxWidth: 600
                // }}
                scrollToFirstError
            >
            <Form.Item
                name="fName"
                label="First Name"
                rules={[{type: 'text'}, {required: true, message: 'Please enter your first name'}]}
            >
                <Input/>
            </Form.Item>
            <Form.Item
                name="lName"
                label="Last Name"
                rules={[{type: 'text'}, {required: true, message: 'Please enter your last name'}]}
            >
                <Input/>
            </Form.Item>
            <Form.Item
                name="email"
                label="E-mail"
                rules={[
                {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                },
                {
                    required: true,
                    message: 'Please input your E-mail!',
                },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="password"
                label="Password"
                rules={[
                {
                    required: true,
                    message: 'Please input your password!',
                },
                ]}
                hasFeedback
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={['password']}
                hasFeedback
                rules={[
                {
                    required: true,
                    message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                    validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                    }
                    return Promise.reject(new Error('The new password that you entered do not match!'));
                    },
                }),
                ]}
            >
                <Input.Password />
            </Form.Item>

                <Form.Item {...tailFormItemLayout}>
                    <Button id="signUpButton" type="primary" htmlType="submit">
                    Create Account
                    </Button>
                </Form.Item>
            </Form>
        </div>
        </div>
    )
}

export default CreateAccount