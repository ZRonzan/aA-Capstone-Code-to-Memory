from random import randint
from app.models import db, Mastery


# Adds a demo user, you can add other users here if you want
def seed_mastery_scores():

    for x in range(61,137):
        num = randint(0,5)
        if num != 0:
            db.session.add(
                Mastery(
                    user_id = 2,
                    card_id = x,
                    mastery_score = num
                )
            )

    for x in range(137,177):
        num = randint(0,5)
        if num != 0:
            db.session.add(
                Mastery(
                    user_id = 3,
                    card_id = x,
                    mastery_score = num
                )
            )

    for x in range(177,198):
        num = randint(0,5)
        if num != 0:
            db.session.add(
                Mastery(
                    user_id = 4,
                    card_id = x,
                    mastery_score = num
                )
            )

    for x in range(198,234):
        num = randint(0,5)
        if num != 0:
            db.session.add(
                Mastery(
                    user_id = 5,
                    card_id = x,
                    mastery_score = num
                )
            )


    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_mastery_scores():
    db.session.execute('TRUNCATE masteries RESTART IDENTITY CASCADE;')
    db.session.commit()
