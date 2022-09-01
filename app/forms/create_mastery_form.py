from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired, ValidationError


def mastery_score_check(form, field):
    mastery_score = field.data
    if mastery_score not in range(1,6):
        raise ValidationError("Mastery score must be an integer between 1 and 5 inclusive.")

class MasteryForm(FlaskForm):
    user_id = IntegerField('user id', validators=[DataRequired()])
    card_id = IntegerField('card id', validators=[DataRequired()])
    mastery_score = IntegerField('mastery score', validators=[DataRequired(), mastery_score_check])
