import React, { Component } from 'react'
import { Table } from 'antd'

export default class CarTable extends Component {
  render() {
    const { pagination, cars, dealers, loading } = this.props
    const { current } = pagination
    let dataWithDealers = []

    if(!loading) {

    }

    const columns = [
      {
        title: 'VIN',
        dataIndex: 'vin',
      },
      {
        title: 'Brand',
        dataIndex: 'brand',
      },
      {
        title: 'Model',
        dataIndex: 'model',
      },
      {
        title: 'Grade',
        dataIndex: 'grade',
      },
      {
        title: 'Dealer',
        dataIndex: 'dealerData.name',
      },
    ]


    return(
      <Table pagination={pagination} columns={columns} loading={loading} dataSource={dataWithDealers} />
    )
  }
}