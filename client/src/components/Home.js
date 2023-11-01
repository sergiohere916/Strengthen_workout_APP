import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import CurrentRoutine from "./CurrentRoutine";

import { Layout, Space } from 'antd';

import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';

import pic from './glossy-red-push-pin-png.webp'
import DisplayExcercise from "./DisplayExcercise";

function Home({myWeeksRoutine, updateTargetUserRoutine, workouts}) {
    
    

    const { Header, Footer, Sider, Content } = Layout;
    const headerStyle = {
      textAlign: 'center',
      color: '#fff',
      height: 100,
      paddingInline: 50,
      lineHeight: '64px',
      backgroundColor: '#7dbcea',
    };
    const contentStyle = {
      textAlign: 'center',
      minHeight: 120,
      lineHeight: '120px',
      color: '#fff',
      backgroundColor: '#108ee9',
    };
    const siderStyle = {
      textAlign: 'center',
      lineHeight: '120px',
      color: '#fff',
      backgroundColor: '#3ba0e9',
    };
    const footerStyle = {
      textAlign: 'center',
      color: '#fff',
      backgroundColor: '#7dbcea',
    };
    
    return (
        <div>
            <NavBar/>
            <Space direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
                <Layout>
                <div id="homeImageContainer" >
                    <div className="homeImageHolders">
                        <img className="homeImages" src="https://www.orbitfitness.com.au/modules/prestablog/views/img/grid-for-1-7/up-img/thumb_6281.jpg?fa76d5fdcf40fa4cd56045f46c20c786" alt="WomanWorkout"/>
                    </div>
                    <div className="homeImageHolders">
                    <img className="homeImages" src="https://www.eatthis.com/wp-content/uploads/sites/4/2022/02/My-project-2022-02-09T120118.189.jpg?quality=82&strip=1" alt="WomanWorkout2"/>
                    </div>
                    <div className="homeImageHolders">
                        <img className="homeImages" src="https://www.viewbug.com/media/mediafiles/2019/03/04/83659692_large1300.jpg" alt="WomanWorkout"/>
                    </div>
                    <div className="homeImageHolders">
                        <img className="homeImages" src="https://www.ama-assn.org/sites/ama-assn.org/files/styles/related_article_stub_image_1200x800_3_2/public/2023-01/2022-12-05-MOREACTIVITY-Index_1170x780.jpg?itok=466M3EjJ" alt="WomanWorkout"/>
                    </div>
                    <div className="homeImageHolders">
                        <img className="homeImages" src="https://miro.medium.com/v2/resize:fit:839/0*YXGhd8vuuZNGAHG0.jpg" alt="WomanWorkout"/>
                    </div>
                    {/* <CardMedia
                        component="img"
                        height="400"
                        image="https://www.orbitfitness.com.au/modules/prestablog/views/img/grid-for-1-7/up-img/thumb_6281.jpg?fa76d5fdcf40fa4cd56045f46c20c786"
                        alt="green iguana"
                        elevation = {5}
                    /> */}
                </div>
                <CurrentRoutine myWeeksRoutine={myWeeksRoutine} updateTargetUserRoutine={updateTargetUserRoutine}/>
                <Layout hasSider>
                    {/* <Content style={contentStyle}>Content</Content>
                    <Sider style={siderStyle}>Sider</Sider> */}
                    <div id="homeContent3">
                        <DisplayExcercise myWeeksRoutine={myWeeksRoutine} workouts={workouts}/>
                        <div id="displayBonus">

                        </div>
                    </div>
                </Layout>
                <Footer style={footerStyle}>Footer</Footer>
                </Layout>
            </Space>
        </div>
    )
}

export default Home