from flask import Flask, render_template, request
from database import db
from flask_migrate import Migrate
from routes import bp_solicitacao
from flask_cors import CORS


app = Flask(__name__)
CORS(app)
conexao = "sqlite:///mydatabase.sqlite"

app.config['CORS_HEADERS'] = 'Content-Type'
app.config['SECRET_KEY'] = 'my-key'
app.config['SQLALCHEMY_DATABASE_URI'] = conexao
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.register_blueprint(bp_solicitacao, url_prefix='/solicitacao')

db.init_app(app)
migrate = Migrate(app, db)

@app.route("/")
def index():
    return "Hello from flask"

if __name__ == "__main__":
    app.run()