import React, { Component } from 'react';

import CertificateLayout from '../Certificate/Layout/Layout';
import DiplomaLayout from '../Diploma/Layout/Layout';

import './styles.scss';

class Print extends Component {
	render() {
		const { data } = this.props;
		return (
			<div className="container">
				<DiplomaLayout diplomas={data} />
				<CertificateLayout certificates={data} />
			</div>
		);
	}
}

export default Print;
