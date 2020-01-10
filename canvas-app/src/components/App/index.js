import React from 'react';
import { Route, withRouter } from 'react-router-dom'
import Board from '../Board'

export default withRouter(function({ history }) {
  return <>
    <Route
      path="/" render={() => <Board />}
    />
  </>
})
