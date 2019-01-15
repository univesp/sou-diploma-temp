import React, { Component, Fragment } from 'react'
import _ from 'lodash'
import Pagination from 'react-js-pagination'
import ReactToPrint from 'react-to-print'

import DiplomaLayout from '../Layout/Layout'

import UITable from '../../UI/Table'
import UIThead from '../../UI/Thead'
import UITbody from '../../UI/Tbody'
import UITrow from '../../UI/Trow'
import UITcol from '../../UI/Tcol'
import UILabel from '../../UI/Label'
import UIInput from '../../UI/Input'

import ServicesDiplomaApi from '../../../services/DiplomaApi'


class DiplomaList extends Component {
  constructor () {
    super()
    this.state = {
      selectAll: false,
      diplomas: [],
      perPage: 10,
      page: 0
    }
  }

  componentDidMount() {
    const { page } = this.state
		ServicesDiplomaApi.get('v_print_list_temp').then((res) => {
			this.setState({ diplomas: res.data })
		});
  }
  
  handleSelectAll = () => {
		const { diplomas, selectAll } = this.state
		this.setState({
			diplomas: diplomas.map((diploma) => ({ ...diploma, check: !diploma.check })),
			selectAll: !selectAll
		})
	}

	handleSelect = ra => {
		const { diplomas } = this.state
		this.setState({
			diplomas: diplomas.map((diploma) => (diploma.RA === ra ? { ...diploma, check: !diploma.check } : diploma))
		})
  }
  
  getLastSem = date => {
    const dateSplited = date.split('/');
    return `${dateSplited[0]}.${Math.ceil(dateSplited[1] / 6)}`
  }

  handlePagination = (pageClick) => {
		const page = pageClick - 1
		const { diplomas, perPage } = this.state
		const pages = parseInt(diplomas.length / perPage)
		if (page < 0 || page >= pages) return false
		this.setState({ page })
  }
  
  renderContent = () => {
		return this.componentRef
	}

	renderTrigger = () => {
		return (
			<button className="selecionar" type="button">
				Imprimir
			</button>
		)
	}

	afterPrint = () => {
		const { diplomas } = this.state
		const ras = diplomas.filter((diploma) => diploma.check).map((diploma) => diploma.RA)
		ServicesDiplomaApi
			.patch('print-status', {
				ras
			})
			.then((res) => console.log(res))
			.catch((err) => console.error(err))
	}

	setRef = (ref) => {
		this.componentRef = ref
	}
  
  render() {
    const { diplomas, selectAll, perPage, page } = this.state
    const data = _.chunk(diplomas, perPage)
    return (
      <Fragment>
        <UILabel>
			    <UIInput type="checkbox" onChange={this.handleSelectAll} checked={selectAll} /> Selecionar todos
		    </UILabel>
        <UITable>
          <UIThead>
            <UITrow>
              <UITcol>RA</UITcol>
              <UITcol>Nome</UITcol>
              <UITcol>Semestre/Ano de ingresso</UITcol>
              <UITcol>Semestre/Ano de conclusão</UITcol>
              <UITcol>Curso</UITcol>
              <UITcol>N° do Processo</UITcol>
              <UITcol />
            </UITrow>
          </UIThead>
          <UITbody>
            {data[page] ? data[page].map(row => (
              <UITrow onClick={e => this.handleSelect(row.RA)}>
                <UITcol>{row.RA}</UITcol>
                <UITcol>{row.nome_aluno}</UITcol>
                <UITcol>{row.year_entry_sem}</UITcol>
                <UITcol>{row.data_conclusao && this.getLastSem(row.data_conclusao)}</UITcol>
                <UITcol>{row.curso}</UITcol>
                <UITcol>{row.process_number}</UITcol>
                <UITcol>
                  <UIInput type="checkbox" onClick={e => this.handleSelect(row.RA)} checked={row.check} />
                </UITcol>
              </UITrow>
            )) : null}
          </UITbody>
        </UITable>
        <Pagination
          activePage={page + 1}
          itemsCountPerPage={perPage}
          totalItemsCount={diplomas.length}
          pageRangeDisplayed={5}
          onChange={this.handlePagination}
          innerClass="pagination"
          itemClass="page-item"
          linkClass="page-link"
        />
        <ReactToPrint
					trigger={this.renderTrigger}
					content={this.renderContent}
					onAfterPrint={this.afterPrint}
				/>
				<DiplomaLayout diplomas={diplomas.filter((item) => item.check)} ref={this.setRef} />
      </Fragment>
    )
  }
}

export default DiplomaList