import React, { Component, Fragment } from 'react';
import _ from 'lodash';
import Pagination from 'react-js-pagination';
import ReactToPrint from 'react-to-print';

import DiplomaLayout from '../Layout/Layout';

import UITable from '../../UI/Table';
import UIThead from '../../UI/Thead';
import UITbody from '../../UI/Tbody';
import UITrow from '../../UI/Trow';
import UITcol from '../../UI/Tcol';
import UILabel from '../../UI/Label';
import UIInput from '../../UI/Input';
import { UISearchbox, UISearch } from '../../UI/Searchbox';
import UIIcon from '../../UI/Icon';
import UICheck from '../../UI/Check';
import UIButton from '../../UI/Button';

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
			search: ''
		};
	}

	componentDidMount() {
		const { perPage } = this.state;
		ServicesDiplomaApi.get('prints/all').then((res) => {
			this.setState({
				diplomas: _.chunk(res.data, perPage),
				totalItems: res.data.length
			});
		});
	}

	handleSelectAll = () => {
		const { search, diplomas, selectAll } = this.state;
		this.setState({
			diplomas: search
				? diplomas.map((chunk) =>
						chunk.map(
							(diploma) =>
								RegExp(search, 'i').test(diploma.nome_aluno) ||
								RegExp(search, 'i').test(diploma.curso) ||
								RegExp(search, 'i').test(diploma.RA)
									? { ...diploma, check: !selectAll }
									: diploma
						)
					)
				: diplomas.map((chunk) => chunk.map((diploma) => ({ ...diploma, check: !selectAll }))),
			selectAll: !selectAll
		});
	};

	handleSelect = (ra) => {
		const { diplomas } = this.state;
		console.log(ra)
		this.setState({
			diplomas: diplomas.map((chunk) =>
				chunk.map((diploma) => (diploma.RA === ra ? { ...diploma, check: !diploma.check } : diploma))
			)
		});
	};

	getLastSem = (date) => {
		const dateSplited = date.split('/');
		return `${dateSplited[0]}.${Math.ceil(dateSplited[1] / 6)}`;
	};

	handlePagination = (pageClick) => {
		const page = pageClick - 1;
		this.setState({ page });
	};

	renderContent = () => {
		return this.componentRef;
	};

	renderTrigger = () => {
		return (
			<UIButton>
				Imprimir
			</UIButton>
		);
	};

	afterPrint = () => {
		const { diplomas } = this.state;
		const ras = diplomas
			.reduce((diplomas, chunk) => diplomas.concat(chunk))
			.filter((diploma) => diploma.check)
			.map((diploma) => diploma.RA);
		console.log(ras);
		ServicesDiplomaApi.patch('print-status', {
			ras
		})
			.then((res) => console.log(res))
			.catch((err) => console.error(err));
	};

	setRef = (ref) => {
		this.componentRef = ref;
	};

	handleSearch = ({ target }) => {
		this.setState({ search: target.value });
	};

	render() {
		const { diplomas, search, selectAll, totalItems, perPage, page } = this.state;
		return (
			<Fragment>
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
										<UITrow action="true" impress={row.status_impress} onClick={(e) => this.handleSelect(row.RA)} key={row.RA}>
											<UITcol>
												<UILabel>
													<UICheck checked={row.check} />
													<UIInput
														hide="true"
														type="checkbox"
														onChange={(e) => this.handleSelect(row.RA)}
														checked={row.check}
													/>
												</UILabel>
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
										<UITrow action="true" impress={row.status_impress} onClick={(e) => this.handleSelect(row.RA)} key={row.RA}>
											<UITcol>
												<UICheck checked={row.check} />
												<UIInput
													hide="true"
													type="checkbox"
													onClick={(e) => this.handleSelect(row.RA)}
													checked={row.check}
												/>
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
			</Fragment>
		);
	}
}

export default DiplomaList;
