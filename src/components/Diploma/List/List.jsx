import React, { Component, Fragment } from 'react';
import _ from 'lodash';
import Pagination from 'react-js-pagination';
import ReactToPrint from 'react-to-print';
import { withRouter } from "react-router-dom";
import Alert from 'react-s-alert';
import LoadingScreen from 'react-loading-screen';

import DiplomaLayout from '../Layout/Layout';

import { UITable, UIThead, UITbody, UITrow, UITcol } from '../../UI/Table';
import UILabel from '../../UI/Label';
import UIInput from '../../UI/Input';
import { UISearchbox, UISearch } from '../../UI/Searchbox';
import UIIcon from '../../UI/Icon';
import UICheck from '../../UI/Check';
import UIButton from '../../UI/Button';
import UITitle from '../../UI/Title';

import '../../../assets/styles/components/Pagination.scss';

import Search from '../../../assets/imgs/icons/search.svg';
import Previous from '../../../assets/imgs/icons/previous.svg';
import First from '../../../assets/imgs/icons/first.svg';
import Next from '../../../assets/imgs/icons/next.svg';
import Last from '../../../assets/imgs/icons/last.svg';

import ServicesDiplomaApi from '../../../services/DiplomaApi';

class DiplomaList extends Component {
	constructor() {
		super();
		this.state = {
			selectAll: false,
			diplomas: [],
			perPage: 10,
			totalItems: 0,
			page: 0,
			search: '',
			loading: true
		};
	}

	componentDidMount() {
		const { history, location } = this.props;
		const { perPage } = this.state;
		ServicesDiplomaApi.get('prints/all').then((res) => {
			this.setState({
				diplomas: _.chunk(res.data, perPage),
				totalItems: res.data.length,
				loading: false
			});
			if (location && location.state && location.state.success) {
				Alert.success('Processo de impressão finalizado!', {
					position: 'bottom-right',
					effect: 'slide'
				});
				history.replace({
					pathname: location.pathname,
					state: {}
				})
			}
		});
	}

	handleSelectAll = () => {
		const { search, page, diplomas, selectAll } = this.state;
		this.setState({
			diplomas: search
				? diplomas.map((chunk) =>
					chunk.map(
						(diploma) =>
							(RegExp(search, 'i').test(diploma.nome_aluno) ||
								RegExp(search, 'i').test(diploma.curso) ||
								RegExp(search, 'i').test(diploma.RA)) && !diploma.status_impress
								? { ...diploma, check: !selectAll }
								: diploma
					)
				)
				: diplomas.map((chunk, index) => index === page ? chunk.map((diploma) => (!diploma.status_impress ? { ...diploma, check: !selectAll } : diploma)) : chunk),
			selectAll: !selectAll
		});
	};

	handleSelect = (ra) => {
		const { diplomas, page } = this.state;
		const newDiplomas = diplomas.map((chunk) =>
			chunk.map((diploma) => (diploma.RA === ra ? { ...diploma, check: !diploma.check } : diploma))
		);
		this.setState({
			diplomas: newDiplomas,
			selectAll: newDiplomas[page].every((diploma) => diploma.check || diploma.status_impress)
		});
	};

	getLastSem = (date) => {
		const dateSplited = date.split('/');
		return `${dateSplited[0]}.${Math.ceil(dateSplited[1] / 6)}`;
	};

	handlePagination = (pageClick) => {
		const { diplomas } = this.state;
		const page = pageClick - 1;
		this.setState({ 
			page,
			selectAll: diplomas[page].every((diploma) => diploma.check || diploma.status_impress)
		});
	};

	renderContent = () => {
		return this.componentRef;
	};

	renderTrigger = () => {
		const { diplomas } = this.state
		const checkeds = diplomas.length ? diplomas
			.reduce((diplomas, chunk) => diplomas.concat(chunk))
			.filter((diploma) => diploma.check) : [];
		return (
			<UIButton disabled={checkeds.length === 0}>
				Imprimir
			</UIButton>
		);
	};

	afterPrint = () => {
		const { history } = this.props;
		const { diplomas } = this.state;
		const checkeds = diplomas
			.reduce((diplomas, chunk) => diplomas.concat(chunk))
			.filter((diploma) => diploma.check);
		const ras = checkeds
			.map((diploma) => diploma.RA);
		ServicesDiplomaApi.patch('print-status', {
			ras
		})
			.then((res) => {
				Alert.success('Processo de impressão iniciado, caso clicou em cancelar remova todos os alunos', {
					position: 'bottom-right',
					effect: 'slide'
				});
				history.push('/verify', { checkeds })
			})
			.catch((err) => console.error(err));
	};

	setRef = (ref) => {
		this.componentRef = ref;
	};

	handleSearch = ({ target }) => {
		this.setState({ search: target.value });
	};

	render() {
		const { diplomas, loading, search, selectAll, totalItems, perPage, page } = this.state;
		return (
			<LoadingScreen
				loading={loading}
				bgColor="#FFF"
				spinnerColor="#ED3B48">
				<UITitle>
					Selecione quais alunos deseja imprimir o diploma
				</UITitle>
				<UISearchbox>
					<UISearch type="text" onChange={this.handleSearch} value={search} />
					<UIIcon icon={Search} />
				</UISearchbox>
				<UITable>
					<UIThead>
						<UITrow>
							<UITcol>
								<UILabel>
									<UICheck checked={selectAll} />
									<UIInput
										hide="true"
										type="checkbox"
										onChange={this.handleSelectAll}
										checked={selectAll}
									/>
								</UILabel>
							</UITcol>
							<UITcol>RA</UITcol>
							<UITcol>Nome</UITcol>
							<UITcol>Semestre/Ano de ingresso</UITcol>
							<UITcol>Semestre/Ano de conclusão</UITcol>
							<UITcol>Curso</UITcol>
							<UITcol>N° do Processo</UITcol>
						</UITrow>
					</UIThead>
					<UITbody>
						{search ? (
							<Fragment>
								{diplomas
									.reduce((diplomas, chunk) => diplomas.concat(chunk))
									.filter(
										(diploma) =>
											RegExp(search, 'i').test(diploma.nome_aluno) ||
											RegExp(search, 'i').test(diploma.curso) ||
											RegExp(search, 'i').test(diploma.RA)
									)
									.map((row) => (
										<UITrow action={!row.status_impress} impress={row.status_impress} onClick={(e) => !row.status_impress ? this.handleSelect(row.RA) : null} key={row.RA}>
											<UITcol>
												{!row.status_impress && (
													<Fragment>
														<UICheck checked={row.check} />
														<UIInput
															hide="true"
															type="checkbox"
															onChange={(e) => this.handleSelect(row.RA)}
															checked={row.check}
														/>
													</Fragment>
												)}
											</UITcol>
											<UITcol>{row.RA}</UITcol>
											<UITcol>{row.nome_aluno}</UITcol>
											<UITcol>{row.year_entry_sem}</UITcol>
											<UITcol>{row.data_conclusao && this.getLastSem(row.data_conclusao)}</UITcol>
											<UITcol>{row.curso}</UITcol>
											<UITcol>{row.process_number}</UITcol>
										</UITrow>
									))}
							</Fragment>
						) : (
								<Fragment>
									{diplomas[page] ? (
										diplomas[page].map((row) => (
											<UITrow action={!row.status_impress} impress={row.status_impress} onClick={(e) => !row.status_impress ? this.handleSelect(row.RA) : null} key={row.RA}>
												<UITcol>
													{!row.status_impress && (
														<Fragment>
															<UICheck checked={row.check} />
															<UIInput
																hide="true"
																type="checkbox"
																onChange={(e) => this.handleSelect(row.RA)}
																checked={row.check}
															/>
														</Fragment>
													)}
												</UITcol>
												<UITcol>{row.RA}</UITcol>
												<UITcol>{row.nome_aluno}</UITcol>
												<UITcol>{row.year_entry_sem}</UITcol>
												<UITcol>{row.data_conclusao && this.getLastSem(row.data_conclusao)}</UITcol>
												<UITcol>{row.curso}</UITcol>
												<UITcol>{row.process_number}</UITcol>
											</UITrow>
										))
									) : null}
								</Fragment>
							)}
					</UITbody>
				</UITable>
				{totalItems && !search ? (
					<Pagination
						activePage={page + 1}
						itemsCountPerPage={perPage}
						totalItemsCount={totalItems}
						pageRangeDisplayed={5}
						onChange={this.handlePagination}
						firstPageText={<UIIcon icon={First} />}
						prevPageText={<UIIcon icon={Previous} />}
						nextPageText={<UIIcon icon={Next} />}
						lastPageText={<UIIcon icon={Last} />}
						innerClass="pagination"
						itemClass="item-class"
						itemClassNext="item-special"
						itemClassPrev="item-special"
						itemClassLast="item-special"
						itemClassFirst="item-special"
						linkClass="link-class"
						disabledClass="disabled"
					/>
				) : null}
				<ReactToPrint
					trigger={this.renderTrigger}
					content={this.renderContent}
					onAfterPrint={this.afterPrint}
				/>
				<DiplomaLayout
					diplomas={diplomas.map((chunk) => chunk.filter((item) => item.check))}
					ref={this.setRef}
				/>
			</LoadingScreen>
		);
	}
}

export default withRouter(DiplomaList);
