from .db import db

class Deck(db.Moedl):
    __tablename__ = "cards"

    id = db.Column(db.Integer, primary_key=True)
    question = db.Column(db.String(255), nullable=False)
    answer = db.Column(db.String(255), nullable=False)
    deck_id = db.Column(db.Integer, db.Foreignkey('decks.id'),  nullable=False)

    deck = db.relationship('Deck', back_populates='cards')

    def to_dict(self):
        return {
            'question': self.question,
            'answer': self.answer,
            'deck': self.deck.to_dict_no_addons()
        }

    def to_dict_no_deck(self):
        return {
            'question': self.question,
            'answer': self.answer
        }
