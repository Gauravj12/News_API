import React, { Component } from 'react'
// import loading from './loading.gif'

export class Spinner extends Component {
  render() {
    return (
      <div className="d-flex justify-content-center">
  <div className="spinner-border" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
</div>
    )
  }
}

export default Spinner
