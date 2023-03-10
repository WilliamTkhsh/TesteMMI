"""empty message

Revision ID: 1e952eda87fa
Revises: 9b59f19fd77f
Create Date: 2023-01-13 17:33:16.846885

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '1e952eda87fa'
down_revision = '9b59f19fd77f'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('solicitacao', schema=None) as batch_op:
        batch_op.add_column(sa.Column('data_criada', sa.String(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('solicitacao', schema=None) as batch_op:
        batch_op.drop_column('data_criada')

    # ### end Alembic commands ###
