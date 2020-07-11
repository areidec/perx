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
    getCars(0)
  }

  render() {
    const { Title } = Typography
    const { getCars, cars, dealers, currentPage, loading , totalPages} = this.props

    return (
      <Row style={{maxWidth: '1200px', margin: '0 auto'}}>
        <Col span={24}>
          <header>
            <Title>PERX Car's List</Title>
          </header>
        </Col>
        <Col span={24}>
        <CarTable 
          pag={{ current: currentPage, pageSize: 10, total: totalPages }}
          cars={cars} dealers={dealers} loading={loading}
          getCars={getCars}
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