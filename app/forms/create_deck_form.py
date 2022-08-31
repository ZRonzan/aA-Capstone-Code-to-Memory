from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def deck_name_length(form, field):
    name = field.data
    if len(name) > 30:
        raise ValidationError("Deck name must be 30 characters or less.")

def deck_objective_length(form, field):
    objective = field.data
    if len(objective) > 255:
        raise ValidationError("Deck objective must be 255 characters or less.")

class DeckForm(FlaskForm):
    name = StringField('deck name', validators=[DataRequired(), deck_name_length])
    objective = StringField('deck objective', validators=[deck_objective_length])
    class_id = IntegerField('class id', validators=[DataRequired()])
