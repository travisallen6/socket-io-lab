import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Chat from './components/Chat'

export default (
    <Switch>
        <Route path='/' component={Chat} />
    </Switch>
)
