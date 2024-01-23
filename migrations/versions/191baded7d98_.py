"""empty message

Revision ID: 191baded7d98
Revises: 49c53a0cd81d
Create Date: 2024-01-23 00:47:30.942403

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '191baded7d98'
down_revision = '49c53a0cd81d'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('hashed_password', sa.String(length=580), nullable=False))
        batch_op.drop_column('is_active')
        batch_op.drop_column('password')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('password', sa.VARCHAR(length=80), autoincrement=False, nullable=False))
        batch_op.add_column(sa.Column('is_active', sa.BOOLEAN(), autoincrement=False, nullable=False))
        batch_op.drop_column('hashed_password')

    # ### end Alembic commands ###