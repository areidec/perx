import React, { Component } from 'react'
import {
  Row, 
  Col, 
  Typography
} from 'antd'
import { connect } from 'react-redux'

import { getCars } from "../../actions";
import CarTable from '../CarTable'

class App extends Component {

  componentDidMount() {
    const { getCars } = this.props
    getCars(1)
  }

  render() {
    const { Title } = Typography
    const { getCars, cars, dealers, currentPage, loading } = this.props
    console.log(this.props)
    return (
      <Row style={{maxWidth: '1200px', margin: '0 auto'}}>
        <Col span={24}>
          <header>
            <Title>PERX Car's List</Title>
          </header>
        </Col>
        <Col span={24}>
        <CarTable 
          pagination={{ current: currentPage, pageSize: 10 }}
          cars={cars} dealers={dealers} loading={loading}
        />
        </Col>
      </Row>
    )
  }
}

const mapDispatchToProps = {
  getCars
}

const mapStateToProps = state => ({
  ...state
})

export default connect(mapStateToProps, mapDispatchToProps)(App)