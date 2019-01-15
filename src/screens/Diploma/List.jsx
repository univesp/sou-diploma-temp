import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

import DiplomaList from '../../components/Diploma/List/List'

import UIHeader from '../../components/UI/Header'
import UIMain from '../../components/UI/Main'
import UILogo from '../../components/UI/Logo'

import Logo from '../../assets/imgs/logo-header.svg'

const ScreensDiplomaList = () => (
  <Fragment>
    <UIHeader>
      <Link
        to={{
          pathname: '/diploma/list'
        }} >
        <UILogo src={Logo} alt="UNIVESP" />
      </Link>
    </UIHeader>
    <UIMain>
      <DiplomaList />
    </UIMain>
  </Fragment>
)

export default ScreensDiplomaList