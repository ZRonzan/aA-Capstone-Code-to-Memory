from .db import db

class Deck(db.Model):
    __tablename__ = "decks"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    objective = db.Column(db.String(100), nullable=True)
    class_id = db.Column(db.Integer, db.ForeignKey('classes.id'),  nullable=False)

    parent_class = db.relationship('Class', back_populates='decks')
    cards = db.relationship('Card', back_populates='deck', cascade='all, delete')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'objective': self.objective,
            'class_id': self.class_id,
            'cards': [card.to_dict_no_deck() for card in self.cards]
        }

    def to_dict_with_parent_class(self):
        return {
            'id': self.id,
            'name': self.name,
            'objective': self.objective,
            'parent_class': self.parent_class.to_dict_no_addons()
        }

    def to_dict_no_addons(self):
        return {
            'id': self.id,
            'name': self.name,
            'objective': self.objective,
            'class_id': self.class_id
        }
