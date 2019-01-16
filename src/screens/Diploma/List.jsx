import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

import DiplomaList from '../../components/Diploma/List/List'

import UIHeader from '../../components/UI/Header'
import UIMain from '../../components/UI/Main'
import UILogo from '../../components/UI/Logo'

import Logo from '../../assets/imgs/logo-header.svg'

const ScreensDiplomaList = ({ location }) => {
  return (
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
        <DiplomaList pathname={location.pathname} success={location && location.state && location.state.success ?  true : false} />
      </UIMain>
    </Fragment>
    )
}

export default ScreensDiplomaList