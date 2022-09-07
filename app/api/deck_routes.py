from flask import Blueprint, jsonify, session, request
from app.models import User, db, Class, Deck
from app.forms import DeckForm
from flask_login import current_user, login_user, logout_user, login_required
from .auth_routes import validation_errors_to_error_messages


deck_routes = Blueprint('decks', __name__)


# Get all decks
@deck_routes.route('')
def get_all_decks():

    decks = Deck.query.all()
    res = {"decks": []}

    for deck in decks:
        res["decks"].append(deck.to_dict())

    return res

# Get all owned decks
@deck_routes.route('/current-user-owned')
@login_required
def get_all_owned_decks():

    decks = Deck.query.all()
    res = {}

    for deck in decks:
        if deck.parent_class.owner_id == current_user.id:
            res[deck.id] = deck.to_dict()

    return res

# Get deck by id
@deck_routes.route('/<deckId>')
def get_one_deck(deckId):

    single_deck = Deck.query.get(deckId)
    print(single_deck)
    if single_deck is None:
        return {"message": "deck does not exist", "statusCode": 404}, 404
    else:
        res = {"deck": single_deck.to_dict()}
        return res

# create a deck
@deck_routes.route('/create', methods=["POST"])
@login_required
def create_deck():

    form = DeckForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data = form.data

        parent_class = Class.query.get(data['class_id'])

        if parent_class.to_dict_no_addons()['owner_id'] == current_user.id:
            new_deck = Deck(
                name = data['name'],
                objective = data['objective'],
                class_id = data['class_id']
            )
            db.session.add(new_deck)
            db.session.commit()
            return new_deck.to_dict_no_addons()
        else:
            return {'errors': ["Unauthorized"]}, 401
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400

# edit a deck
@deck_routes.route('/<int:deckId>/edit', methods=["PUT"])
@login_required
def edit_deck(deckId):

    form = DeckForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data = form.data
        deck_to_edit = Deck.query.get(deckId)
        parent_class = Class.query.get(deck_to_edit.class_id)

        if parent_class.to_dict_no_addons()['owner_id'] == current_user.id:

            deck_to_edit.name = data['name']
            deck_to_edit.objective = data['objective']
            deck_to_edit.class_id = data['class_id']

            db.session.commit()
            return deck_to_edit.to_dict_no_addons()
        else:
            return {'errors': ["Unauthorized"]}, 401
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400

# delete a deck by id
@deck_routes.route('/<int:deckId>/delete', methods=["DELETE"])
@login_required
def delete_deck(deckId):

    deck_to_delete = Deck.query.get(deckId)

    if deck_to_delete is not None:
        parent_class = Class.query.get(deck_to_delete.class_id)
        if parent_class.owner_id == current_user.id:
            db.session.delete(deck_to_delete)
            db.session.commit()
            return {"message": "Successfully deleted"}
        else:
            return {"errors": ["Unauthorized"]}, 401

    # else should throw 404
    else:
        return {"message": "Deck not found"}, 404
