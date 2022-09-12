from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError


def deck_name_length(form, field):
    name = field.data
    if name is not None and len(name) > 50 or name is not None and len(name) == 0:
        raise ValidationError("Deck name must be 150 characters or less.")

def deck_objective_length(form, field):
    objective = field.data
    if objective is not None and len(objective) > 100:
        raise ValidationError("Deck objective must be 100 characters or less.")

class DeckForm(FlaskForm):
    name = StringField('deck name', validators=[DataRequired(), deck_name_length])
    objective = StringField('deck objective', validators=[deck_objective_length])
    class_id = IntegerField('class id', validators=[DataRequired()])
