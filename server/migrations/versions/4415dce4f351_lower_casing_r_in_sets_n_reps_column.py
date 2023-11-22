"""lower casing r in sets_n_Reps column

Revision ID: 4415dce4f351
Revises: 3e4aaad529eb
Create Date: 2023-11-21 15:20:16.355780

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '4415dce4f351'
down_revision = '3e4aaad529eb'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('routines', schema=None) as batch_op:
        batch_op.add_column(sa.Column('sets_n_reps', sa.String(), nullable=True))
        batch_op.drop_column('sets_n_Reps')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('routines', schema=None) as batch_op:
        batch_op.add_column(sa.Column('sets_n_Reps', sa.VARCHAR(), nullable=True))
        batch_op.drop_column('sets_n_reps')

    # ### end Alembic commands ###