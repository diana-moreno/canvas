import React from 'react';
import { Route } from 'react-router-dom'
import Board from '../Board'

export default function () {
  return <>
    <Route path="/" render={() => <Board />} />
  </>
}
