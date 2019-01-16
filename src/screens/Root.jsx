import React, { Fragment, Suspense, lazy } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Alert from 'react-s-alert'
import LoadingScreen from 'react-loading-screen'
import 'react-s-alert/dist/s-alert-default.css'
import 'react-s-alert/dist/s-alert-css-effects/slide.css'

const ScreensDiplomaList = lazy(() => import('./Diploma/List'))
const ScreensDiplomaVerify = lazy(() => import('./Diploma/Verify'))

const Root = () => (
  <Fragment>
    <Router>
      <Switch>
        <Suspense fallback={
          <LoadingScreen
            loading={true}
            bgColor="#FFF"
            spinnerColor="#ED3B48"
          ><div /></LoadingScreen>
        }>
          <Route exact path="/" component={ScreensDiplomaList} />
          <Route path="/verify" component={ScreensDiplomaVerify} />
        </Suspense>
      </Switch>
    </Router>
    <Alert stack={{ limit: 3 }} />
  </Fragment>
)

export default Root
