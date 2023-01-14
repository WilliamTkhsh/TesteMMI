from flask import Blueprint, jsonify
from Models.solicitacaoModel import Solicitacao
from database import db
from flask import render_template, request
from flask_cors import cross_origin
from datetime import datetime

bp_solicitacao = Blueprint("solicitacao", __name__, template_folder = "views")

@bp_solicitacao.route('/criar', methods=['GET', 'POST'])
@cross_origin()
def criar():
    if request.method == 'GET':
        return render_template("criar_solicitacao.html")
    if request.method == 'POST':
        cnpj = request.form.get('cnpj')
        valor_emprestimo = request.form.get('valor_emprestimo')
        faturamento_anual = request.form.get('faturamento_anual')
        endereco = request.form.get('endereco')
        nome = request.form.get('nome')
        cpf = request.form.get('cpf')
        telefone = request.form.get('telefone')
        email = request.form.get('email')
        

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

@bp_solicitacao.route('/editar/<int:id>', methods=['GET', 'POST'])
@cross_origin()
def editarSolicitacoes(id):
    solicit = Solicitacao.query.get(id)
    if request.method == 'GET':
        return render_template('editar_solicitacao.html', solicitacao = solicit)
    if request.method == 'POST':
        valor_emprestimo = request.form.get('valor_emprestimo')
        faturamento_anual = request.form.get('faturamento_anual')
        endereco = request.form.get('endereco')
        telefone = request.form.get('telefone')
        email = request.form.get('email')

        solicit.valor_emprestimo = valor_emprestimo
        solicit.faturamento_anual = faturamento_anual
        solicit.endereco = endereco
        solicit.telefone = telefone
        solicit.email = email

        db.session.add(solicit)
        db.session.commit()

        solicit_json = {
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
