from flask.cli import AppGroup
from .users import seed_users, undo_users
from .classes import seed_classes, undo_classes
from .decks import seed_decks, undo_decks
from .cards import seed_cards1, seed_cards2, seed_cards3, seed_cards4, seed_cards5, undo_cards
from .mastery_scores import seed_mastery_scores, undo_mastery_scores
# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_classes()
    seed_decks()
    seed_cards1()
    seed_cards2()
    seed_cards3()
    seed_cards4()
    seed_cards5()
    seed_mastery_scores()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_classes()
    undo_decks()
    undo_cards()
    undo_mastery_scores()
    # Add other undo functions here
