import React, { Component, Fragment } from 'react';

const months = [
	'janeiro',
	'fevereiro',
	'março',
	'abril',
	'maio',
	'junho',
	'julho',
	'agosto',
	'setembro',
	'outubro',
	'novembro',
	'dezembro'
];

class CertificateLayout extends Component {
	getState = (state) => {
		switch (state) {
			case 'Acre':
			case 'Amapá':
			case 'Amazonas':
			case 'Ceará':
			case 'Espírito Santo':
			case 'Maranhão':
			case 'Pará':
			case 'Paraíba':
			case 'Paraná':
			case 'Piauí':
			case 'Rio de Janeiro':
			case 'Rio Grande do Norte':
			case 'Rio Grande do Sul':
			case 'Tocantins':
				return 'do';
			case 'Bahia':
				return 'da';
			default:
				return 'de';
		}
	};
	render() {
		const { certificates } = this.props;

		return (
			<Fragment>
				{certificates.map((chunk) =>
					chunk.map((diploma) => (
						<div className="diploma -seq" key={diploma.RA}>
							<div className="front">
								<div className="content">
									<p className="paragraph">
										A presidente da <span>Universidade Virtual do Estado de São Paulo</span>,
									</p>
									<p className="paragraph -marginBottom">no uso de suas atribuições, outorga a</p>
									<h1 className="name">{diploma.assumed_name || diploma.nome_aluno}</h1>
									<p className="paragraph">de nacionalidade {diploma.Nacionalidade},</p>
									<p className="paragraph">
										portador{diploma.gender === 'F' && 'a'} da cédula de identidade RG N°{' '}
										{diploma.rg} - SSP/SP,
									</p>
									<p className="paragraph">
										nascid{diploma.gender === 'F' ? 'a' : 'o'} em{' '}
										{diploma.birth_date ? new Date(diploma.birth_date).getDate() : ''} de{' '}
										{diploma.birth_date ? months[new Date(diploma.birth_date).getMonth()] : ''} de{' '}
										{diploma.birth_date ? new Date(diploma.birth_date).getFullYear() : ''} e natural
										do Estado {this.getState(diploma.natural)} {diploma.natural},
									</p>
									<p className="paragraph">o diploma do</p>
									<h2 className="course">{diploma.seq_course}</h2>
									<p className="paragraph">
										concluído em{' '}
										{diploma.data_conclusao_certificado ? (
											diploma.data_conclusao_certificado.split('/')[0]
										) : (
											''
										)}{' '}
										de{' '}
										{diploma.data_conclusao_certificado ? (
											months[Number(diploma.data_conclusao_certificado.split('/')[1]) - 1]
										) : (
											''
										)}{' '}
										de{' '}
										{diploma.data_conclusao_certificado ? (
											diploma.data_conclusao_certificado.split('/')[2]
										) : (
											''
										)}
									</p>
									<p className="paragraph -marginBottom">
										para que possa gozar de todos os direitos e prerrogativas legais.
									</p>
									<p className="paragraph">
										São Paulo, {new Date().getDate()} de {months[new Date().getMonth()]} de{' '}
										{new Date().getFullYear()}.
									</p>
								</div>
								<div className="signatures">
									<p className="signature">
										&nbsp;<span>Diretora Acadêmica</span>
									</p>
									<p className="signature">
										&nbsp;<span>Presidente</span>
									</p>
									<p className="signature">
										{diploma.assumed_name || diploma.nome_aluno}
										<span>Diplomad{diploma.gender === 'M' ? 'o' : 'a'}</span>{' '}
									</p>
								</div>
							</div>
							<div className="back">
								<div className="recognized -small">
									<p className="paragraph">
										Fundação Universidade Virtual do Estado de São Paulo - CNPJ 17.455.396/0001-64
									</p>
									<p className="paragraph">Criação - Lei N° 14.836, de 20/07/2012</p>
									<p className="paragraph">
										Credenciamento no Conselho Estadual de Educação de São Paulo - Portaria
										CEE-GP-120, de 22/03/2013, publicado no DO de 23/03/2013, Seção 1, Página 61
									</p>

									<p className="paragraph">
										Credenciamento no Ministério da Eduacação para oferta de Cursos EAD-Portaria
										N°945, de 18/09/2015, publicado no DOU de 21/09/2015, Seção 1, página 16
									</p>
								</div>
								<div className="recognized">
									<p className="paragraph">{diploma.seq_course}</p>
									<p className="paragraph">{diploma.seq_portaria}</p>
								</div>
								<div className="zone">
									<div className="area">
										<p className="university">
											Universidade Virtual do Estado de São Paulo - UNIVESP
										</p>
										<p className="paragraph -marginBottom">
											Secretaria de Registro Acadêmico - SRA
										</p>
										<p className="paragraph">
											Diploma registrado sob n° {diploma.degree_number}{' '}
											{diploma.degree_label.split('.')[5]}
										</p>
										<p className="paragraph">processo n° {diploma.process_number}</p>
										<p className="paragraph -marginBottom">
											nos termos do artigo 48 da lei 9.394, de 20/12/1996, DOU de 23/12/1996.
										</p>
										<p className="paragraph">
											São Paulo, {new Date().getDate()} de {months[new Date().getMonth()]} de{' '}
											{new Date().getFullYear()}.
										</p>
										<div className="signatures">
											<p className="signature">
												<span>{diploma.respons}</span> {diploma.cargo}
											</p>
											<p className="signature">
												<span>Andrea Gonçalves Mariano Souza</span> Coordenadora de Registros
												Acadêmicos
											</p>
											<p className="paragraph">de acordo,</p>
											<p className="signature">
												<span>Genivaldo Linhares Brandão</span> Gerente de Registros Acadêmicos
												e Apoio Administrativo
											</p>
										</div>
									</div>
									{diploma.assumed_name && (
										<div className="area -name">
											<p className="paragraph">
												Nome Civil: <span>{diploma.nome_aluno}</span>
											</p>
										</div>
									)}
								</div>
							</div>
						</div>
					))
				)}
			</Fragment>
		);
	}
}

export default CertificateLayout;