import React, { Component, Fragment } from 'react'
import { withRouter } from "react-router-dom";

import { UITable, UIThead, UITbody, UITrow, UITcol } from '../../UI/Table';
import UICheck from '../../UI/Check';
import UIButton from '../../UI/Button';
import UITitle from '../../UI/Title';
import UILabel from '../../UI/Label';
import UIInput from '../../UI/Input';

import ServicesDiplomaApi from '../../../services/DiplomaApi';

class DiplomaVerify extends Component {
  constructor() {
    super()
    this.state = {
      checkeds: [],
      selectAll: true
    }
  }

  componentDidMount() {
    const { state: { checkeds } } = this.props;
    this.setState({ checkeds });
  }

  getLastSem = (date) => {
    const dateSplited = date.split('/');
    return `${dateSplited[0]}.${Math.ceil(dateSplited[1] / 6)}`;
  };

  handleSelectAll = () => {
    const { checkeds, selectAll } = this.state;
    this.setState({
      checkeds: checkeds.map((diploma) => ({ ...diploma, check: !selectAll })),
      selectAll: !selectAll
    });
  };

  handleSelect = (ra) => {
    const { checkeds } = this.state;
    const newCheckeds = checkeds.map((diploma) => (diploma.RA === ra ? { ...diploma, check: !diploma.check } : diploma));
    this.setState({
      checkeds: newCheckeds,
      selectAll: newCheckeds.every((diploma) => diploma.check)
    })
  };

  handleSubmit = () => {
    const { history } = this.props;
    const { checkeds } = this.state;
    const ras = checkeds.filter((diploma) => !diploma.check).map((diploma) => diploma.RA)
    ServicesDiplomaApi.patch('print-fail', {
      ras
    })
      .then((res) => {
        history.push('/', { success: true })
      })
      .catch((err) => console.error(err));
  }

  render() {
    const { checkeds, selectAll } = this.state;
    return (
      <Fragment>
        <UITitle>Caso haja problema na impressão deselecione os alunos abaixo</UITitle>
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
            {checkeds.map((row) => (
              <UITrow action="true" onClick={(e) => this.handleSelect(row.RA)} key={row.RA}>
                <UITcol>
                  <UICheck checked={row.check} />
                  <UIInput
                    hide="true"
                    type="checkbox"
                    onChange={(e) => this.handleSelect(row.RA)}
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
            }
          </UITbody>
        </UITable>
        <UIButton onClick={this.handleSubmit}>
          Enviar
			  </UIButton>
      </Fragment>
    )
  }
}

export default withRouter(DiplomaVerify)