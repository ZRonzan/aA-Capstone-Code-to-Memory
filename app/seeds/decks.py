from app.models import db, Deck


# Adds a demo user, you can add other users here if you want
def seed_decks():

    # class 1
    intro_to_javascript_deck_1 = Deck(
        name = "Operators, data types, some syntax",
        objective= None,
        class_id = 1
    )
    intro_to_javascript_deck_2 = Deck(
        name = "Functions and Scope",
        objective= None,
        class_id = 1
    )
    intro_to_javascript_deck_3 = Deck(
        name = "Strings and arrays",
        objective= None,
        class_id = 1
    )

    # class 2
    intro_to_python_deck_4 = Deck(
        name = "Python string methods",
        objective= None,
        class_id = 2
    )
    intro_to_python_deck_5 = Deck(
        name = "Python set methods",
        objective= None,
        class_id = 2
    )
    # class 3
    intro_to_github_deck_6 = Deck(
        name = "Git",
        objective= None,
        class_id = 3
    )
    # class 4
    intro_to_node_deck_7 = Deck(
        name = "Basics",
        objective= None,
        class_id = 4
    )
    # class 5
    intro_to_react_deck_8 = Deck(
        name = "React components",
        objective= None,
        class_id = 5
    )
    # class 6
    test_class_1_deck_9 = Deck(
        name = "User 3 test deck 1",
        objective= None,
        class_id = 6
    )
    # class 7
    test_class_2_deck_10 = Deck(
        name = "User 3 test deck 2",
        objective= None,
        class_id = 7
    )
    # class 8
    test_class_3_deck_11 = Deck(
        name = "User 4 test deck",
        objective= None,
        class_id = 8
    )
    # class 9
    test_class_4_deck_12 = Deck(
        name = "User 5 test deck",
        objective= None,
        class_id = 9
    )
    # user 1
    db.session.add(intro_to_javascript_deck_1)
    db.session.add(intro_to_javascript_deck_2)
    db.session.add(intro_to_javascript_deck_3)

    # user 2
    db.session.add(intro_to_python_deck_4)
    db.session.add(intro_to_python_deck_5)

    db.session.add(intro_to_github_deck_6)

    db.session.add(intro_to_node_deck_7)

    db.session.add(intro_to_react_deck_8)

    # user 3
    db.session.add(test_class_1_deck_9)

    db.session.add(test_class_2_deck_10)

    # user 4
    db.session.add(test_class_3_deck_11)

    # user 5
    db.session.add(test_class_4_deck_12)




    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_decks():
    db.session.execute('TRUNCATE decks RESTART IDENTITY CASCADE;')
    db.session.commit()
