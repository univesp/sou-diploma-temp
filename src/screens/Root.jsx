import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

const ScreensDiplomaList = lazy(() => import('./Diploma/List'))

const Root = () => (
  <Router>
    <Switch>
      <Suspense fallback={<h1>Carregando...</h1>}>
        <Route path="/diploma/list" component={ScreensDiplomaList} />
      </Suspense>
    </Switch>
  </Router>
)

export default Root
