"""editRestaurant

Revision ID: bb5dbf16f4ec
Revises: 736c2d6aea3b
Create Date: 2022-07-26 17:14:53.983448

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'bb5dbf16f4ec'
down_revision = '736c2d6aea3b'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('restaurants', sa.Column('open_hours', sa.Time(), nullable=False))
    op.add_column('restaurants', sa.Column('close_hours', sa.Time(), nullable=False))
    op.add_column('restaurants', sa.Column('image_url', sa.String(), nullable=False))
    op.drop_column('restaurants', 'hours')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('restaurants', sa.Column('hours', sa.VARCHAR(), autoincrement=False, nullable=False))
    op.drop_column('restaurants', 'image_url')
    op.drop_column('restaurants', 'close_hours')
    op.drop_column('restaurants', 'open_hours')
    # ### end Alembic commands ###
