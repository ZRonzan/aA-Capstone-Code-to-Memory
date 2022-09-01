"""empty message

Revision ID: 4fb019c038c1
Revises: 
Create Date: 2022-08-31 13:22:38.148031

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '4fb019c038c1'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('first_name', sa.String(length=40), nullable=False),
    sa.Column('last_name', sa.String(length=40), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('classes',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=40), nullable=False),
    sa.Column('purpose', sa.String(), nullable=False),
    sa.Column('headline', sa.String(length=40), nullable=True),
    sa.Column('description', sa.String(length=1000), nullable=True),
    sa.Column('private', sa.Boolean(), nullable=True),
    sa.Column('owner_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['owner_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('decks',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=40), nullable=False),
    sa.Column('objective', sa.String(length=100), nullable=True),
    sa.Column('class_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['class_id'], ['classes.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('cards',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('question', sa.String(length=255), nullable=False),
    sa.Column('answer', sa.String(length=255), nullable=False),
    sa.Column('deck_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['deck_id'], ['decks.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('cards')
    op.drop_table('decks')
    op.drop_table('classes')
    op.drop_table('users')
    # ### end Alembic commands ###
