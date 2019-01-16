import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

const ScreensDiplomaList = lazy(() => import('./Diploma/List'))

const Root = () => (
  <Router>
    <Switch>
      <Suspense fallback={<p>Carregando...</p>}>
        <Route path="/diploma/list" component={ScreensDiplomaList} />
      </Suspense>
    </Switch>
  </Router>
)

export default Root
