from flask import Blueprint, jsonify
from Models.solicitacaoModel import Solicitacao
from database import db
from flask import render_template, request
from flask_cors import cross_origin
from datetime import datetime

bp_solicitacao = Blueprint("solicitacao", __name__, template_folder = "views")

@bp_solicitacao.route('/criar', methods=['POST'])
@cross_origin()
def criar():
    if request.method == 'POST':
        json_data = request.get_json()
        cnpj = json_data['cnpj']
        valor_emprestimo = json_data['valor_emprestimo']
        faturamento_anual = json_data['faturamento_anual']
        endereco = json_data['endereco']
        nome = json_data['nome']
        cpf = json_data['cpf']
        telefone = json_data['telefone']
        email = json_data['email']

        objeto = Solicitacao(cnpj, valor_emprestimo, faturamento_anual, endereco, nome, cpf, telefone, email)
        objeto.data_criada = datetime.now()

        db.session.add(objeto)
        db.session.commit()

        solicit_json = {
            'cnpj': objeto.cnpj, 
            'valor_emprestimo': objeto.valor_emprestimo,
            'faturamento_anual': objeto.faturamento_anual,
            'endereco': objeto.endereco, 
            'nome': objeto.nome,
            'cpf': objeto.cpf,
            'telefone': objeto.telefone, 
            'email': objeto.email,
            'data_criada': objeto.data_criada,
        }
        return solicit_json

@bp_solicitacao.route('/listar')
@cross_origin()
def listarSolicitacoes():
    solicitacoes = Solicitacao.query.all()
    solicit_json = []
    for solicitacao in solicitacoes:
       solicit_json.append({
            'id': solicitacao.id,
            'cnpj': solicitacao.cnpj, 
            'valor_emprestimo': solicitacao.valor_emprestimo,
            'faturamento_anual': solicitacao.faturamento_anual,
            'endereco': solicitacao.endereco, 
            'nome': solicitacao.nome,
            'cpf': solicitacao.cpf,
            'telefone': solicitacao.telefone, 
            'email': solicitacao.email,
            'data_criada': solicitacao.data_criada,
        })
    return jsonify(solicit_json)

@bp_solicitacao.route('/editar/<int:id>', methods=['POST'])
@cross_origin()
def editarSolicitacoes(id):
    solicit = Solicitacao.query.get(id)
    if request.method == 'POST':
        json_data = request.get_json()
        valor_emprestimo = json_data['valor_emprestimo']
        faturamento_anual = json_data['faturamento_anual']
        endereco = json_data['endereco']
        telefone = json_data['telefone']
        email = json_data['email']

        solicit.valor_emprestimo = valor_emprestimo
        solicit.faturamento_anual = faturamento_anual
        solicit.endereco = endereco
        solicit.telefone = telefone
        solicit.email = email

        db.session.add(solicit)
        db.session.commit()

        solicit_json = {
            'id': solicit.id,
            'valor_emprestimo': solicit.valor_emprestimo,
            'faturamento_anual': solicit.faturamento_anual,
            'endereco': solicit.endereco, 
            'telefone': solicit.telefone, 
            'email': solicit.email,
        }

        return solicit_json

@bp_solicitacao.route('/deletar/<int:id>', methods=['POST'])
@cross_origin()
def excluirSolicitacao(id):
    solicit = Solicitacao.query.get(id)
    if request.method == 'POST':
        db.session.delete(solicit)
        db.session.commit()
        return 'Dados Excluídos com sucesso'
