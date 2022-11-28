import React, { Component } from 'react'
import Footer from '../../Component/Footer/Footer'
import Header from '../../Component/Header/Header'
import './Home.css'

export default class Home extends Component {
  render() {
    return (
      
      <div class="Body-home">
        <Header />

        <h1 className='Home'>Esto es Home/Tareas/DashBoard</h1>

        <Footer />
      </div>
    )
  }
}