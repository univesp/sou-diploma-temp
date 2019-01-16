import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

import DiplomaVerify from '../../components/Diploma/Verify/Verify'

import UIHeader from '../../components/UI/Header'
import UIMain from '../../components/UI/Main'
import UILogo from '../../components/UI/Logo'

import Logo from '../../assets/imgs/logo-header.svg'

const ScreensDiplomaVerify = ({ location: { state } }) => (
  <Fragment>
    <UIHeader>
      <Link
        to={{
          pathname: '/'
        }} >
        <UILogo src={Logo} alt="UNIVESP" />
      </Link>
    </UIHeader>
    <UIMain>
      <DiplomaVerify state={state} />
    </UIMain>
  </Fragment >
)

export default ScreensDiplomaVerify