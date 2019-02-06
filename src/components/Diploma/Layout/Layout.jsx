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

class DiplomaLayout extends Component {
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
		const { diplomas } = this.props;
		return (
			<Fragment>
				{diplomas.map((chunk) =>
					chunk.map((diploma) => (
						<div className="diploma" key={diploma.RA}>
							<div className="front">
								<div className="content">
									<p className="paragraph">
										O presidente da <span>Universidade Virtual do Estado de São Paulo</span>,
									</p>
									<p className="paragraph -marginBottom">no uso de suas atribuições, confere a</p>
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
									<p className="paragraph">o grau de</p>
									<h2 className="course">
										{diploma.gender === 'M' ? 'Licenciado' : 'Licenciada'} em{' '}
										{diploma.curso.split(' ')[2]}
									</h2>
									<p className="paragraph">
										obtido em {diploma.data_conclusao ? (
											diploma.data_conclusao.split('-')[2]
										) : (
											''
										)}{' '}
										de{' '}
										{diploma.data_conclusao ? (
											months[Number(diploma.data_conclusao.split('-')[1]) - 1]
										) : (
											''
										)}{' '}
										de {diploma.data_conclusao ? diploma.data_conclusao.split('-')[0] : ''} no curso
										de {diploma.curso}
									</p>
									<p className="paragraph -marginBottom">
										para que possa gozar de todos os direitos e prerrogativas legais, outorga-lhe o
										presente diploma.
									</p>
									<p className="paragraph">
										São Paulo, {new Date().getDate()} de {months[new Date().getMonth()]} de{' '}
										{new Date().getFullYear()}.
									</p>
								</div>
								<div className="signatures">
									<p className="signature">
										Profa. Dra. Simone Telles Martins Ramos<span>Diretora Acadêmica</span>
									</p>
									<p className="signature">
										Prof. Dr. Rodolfo Jardim de Azevedo<span>Presidente</span>
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
									<p className="paragraph">
										Criação - Lei Nº 14.836, de 20/07/2012, publicado no DO de 21/07/2012, Seção 1,
										página 01
									</p>
									<p className="paragraph">
										Credenciamento no Conselho Estadual de Educação de São Paulo - Portaria
										CEE-GP-120, de 22/03/2013, publicado no DO de 23/03/2013, Seção 1, página 61
									</p>

									<p className="paragraph">
										Credenciamento no Ministério da Eduacação para oferta de Cursos EAD-Portaria
										N°945, de 18/09/2015, publicado no DOU de 21/09/2015, Seção 1, página 16
									</p>
								</div>
								<div className="recognized">
									<p className="paragraph">Curso de {diploma.curso}</p>
									<p className="paragraph">{diploma.Portaria}</p>
								</div>
								<div className="zone">
									<div className="area">
										<p className="university -marginBottom">
											Secretaria de Registros Acadêmicos - SRA
										</p>
										<p className="paragraph">
											Diploma registrado sob n° {diploma.degree_number_diploma}
										</p>
										<p className="paragraph">Processo n° {diploma.process_number_diploma}</p>
										<p className="paragraph -marginBottom">
											nos termos do artigo 48 da Lei 9.394, de 20/12/1996, DOU de 23/12/1996.
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
									<div className="QR">
										<p className="paragraph -marginLeft">Verifique a</p>
										<p className="paragraph -marginLeft">autenticidade</p>
										<img
											src={`https://chart.googleapis.com/chart?chs=128x128&cht=qr&chl=https://univesp.br/valida-diploma?ra=${diploma.RA}%26turma=${diploma.class_id}`}
											alt="QRCode"
										/>
									</div>
								</div>
							</div>
						</div>
					))
				)}
			</Fragment>
		);
	}
}

export default DiplomaLayout;
