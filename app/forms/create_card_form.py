from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError

def card_question_length(form, field):
    question = field.data
    if len(question) > 500:
        raise ValidationError("Card question must be 500 characters or less.")

def card_answer_length(form, field):
    answer = field.data
    if len(answer) > 500:
        raise ValidationError("Card answer must be 500 characters or less.")

class CardForm(FlaskForm):
    question = StringField('question', validators=[DataRequired(), card_question_length])
    answer = StringField('answer', validators=[DataRequired(), card_answer_length])
    deck_id = IntegerField('deck id', validators=[DataRequired()])
