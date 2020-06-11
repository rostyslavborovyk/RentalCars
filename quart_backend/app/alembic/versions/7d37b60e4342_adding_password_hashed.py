"""adding password_hashed

Revision ID: 7d37b60e4342
Revises: 7e52dbcde3ff
Create Date: 2020-06-04 20:12:17.075376

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '7d37b60e4342'
down_revision = '7e52dbcde3ff'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('clients', sa.Column('hashed_password', sa.String(length=60), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('clients', 'hashed_password')
    # ### end Alembic commands ###
