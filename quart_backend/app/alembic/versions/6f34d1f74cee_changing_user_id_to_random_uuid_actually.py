"""Changing user id to random uuid ACTUALLY

Revision ID: 6f34d1f74cee
Revises: 8290838af9de
Create Date: 2020-06-05 22:27:47.065788

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '6f34d1f74cee'
down_revision = '8290838af9de'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table("orders")
    op.drop_table("clients")
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    pass
    # ### end Alembic commands ###
