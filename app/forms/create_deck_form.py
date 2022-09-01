from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError


def deck_name_length(form, field):
    name = field.data
    if name is not None and len(name) > 150 or name is not None and len(name) == 0:
        raise ValidationError("Deck name must be 150 characters or less.")

def deck_objective_length(form, field):
    objective = field.data
    if objective is not None and len(objective) > 255 or objective is not None and len(objective) == 0:
        raise ValidationError("Deck objective must be 255 characters or less.")

class DeckForm(FlaskForm):
    name = StringField('deck name', validators=[DataRequired(), deck_name_length])
    objective = StringField('deck objective', validators=[deck_objective_length])
    class_id = IntegerField('class id', validators=[DataRequired()])
