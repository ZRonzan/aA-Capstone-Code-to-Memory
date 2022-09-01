from .db import db

class Deck(db.Model):
    __tablename__ = "decks"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False)
    objective = db.Column(db.String(100), nullable=True)
    class_id = db.Column(db.Integer, db.ForeignKey('classes.id'),  nullable=False)

    parent_class = db.relationship('Class', back_populates='decks')
    cards = db.relationship('Card', back_populates='deck', cascade='all, delete')

    def to_dict(self):
        return {
            'name': self.name,
            'objective': self.objective,
            'class': self.parent_class,
            'class`'
            'cards': self.cards.to_dict_no_deck()
        }

    def to_dict_no_addons(self):
        return {
            'name': self.name,
            'objective': self.objective,
            'class': self.parent_class
        }
