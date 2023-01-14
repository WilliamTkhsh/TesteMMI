from database import db

class Solicitacao(db.Model):
    __tablename__ = "solicitacao"
    id = db.Column(db.Integer, primary_key = True)
    cnpj = db.Column(db.String)
    valor_emprestimo = db.Column(db.Integer)
    faturamento_anual = db.Column(db.Integer)
    endereco = db.Column(db.String)
    nome = db.Column(db.String)
    cpf = db.Column(db.String)
    telefone = db.Column(db.String)
    email = db.Column(db.String)
    data_criada = db.Column(db.String)

    def __init__(self, cnpj, valor_emprestimo, faturamento_anual, endereco, nome, cpf, telefone, email):
        self.cnpj = cnpj
        self.valor_emprestimo = valor_emprestimo
        self.faturamento_anual = faturamento_anual
        self.endereco = endereco
        self.nome = nome
        self.cpf = cpf
        self.telefone = telefone
        self.email = email
    
    def __repr__(self):
        return "Usuario: {}".format(self.nome)