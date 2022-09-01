from app.models import db, Class


# Adds a demo user, you can add other users here if you want
def seed_classes():
    intro_to_javascript = Class(
        name = "Learning javascript",
        purpose = None,
        headline = "This class is provided to you upon new user signup to Code-to-Memory./n Feel free to use this class as a starting point to your coding endeavors!",
        description = "This class contains a few decks fo you to study, focused on some of the fundamentals of javascript./n Feel free to use these materials as inspiration for creating your own decks!",
        private = False,
        owner_id = 1
    )
    intro_to_python = Class(
        name = "Learning Python",
        purpose = None,
        headline = None,
        description = None,
        private = False,
        owner_id = 2
    )
    intro_to_github = Class(
        name = "Learning github",
        purpose = None,
        headline = "Use flashcards to conveniently study Git commands and examples.",
        description = "Propel your mastery of software development forward with this collection of Git Command flashcards, which are designed to test and build your programming skills.",
        private = False,
        owner_id = 2
    )
    intro_to_node = Class(
        name = "Learning node",
        purpose = None,
        headline = None,
        description = None,
        private = False,
        owner_id = 2
    )
    intro_to_flask = Class(
        name = "Learning react",
        purpose = None,
        headline = None,
        description = None,
        private = False,
        owner_id = 2
    )
    test_class_1 = Class(
        name = "Test Class 1 for Marnie",
        purpose = None,
        headline = None,
        description = None,
        private = False,
        owner_id = 3
    )
    test_class_2 = Class(
        name = "Test Class 2 for Marnie",
        purpose = None,
        headline = None,
        description = None,
        private = False,
        owner_id = 3
    )
    test_class_3 = Class(
        name = "Test Class for Bobbie",
        purpose = None,
        headline = None,
        description = None,
        private = False,
        owner_id = 4
    )
    test_class_4 = Class(
        name = "Test Class for Jimmy",
        purpose = None,
        headline = None,
        description = None,
        private = False,
        owner_id = 5
    )

    db.session.add(intro_to_javascript)
    db.session.add(intro_to_python)
    db.session.add(intro_to_github)
    db.session.add(intro_to_node)
    db.session.add(intro_to_flask)
    db.session.add(test_class_1)
    db.session.add(test_class_2)
    db.session.add(test_class_3)
    db.session.add(test_class_4)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_classes():
    db.session.execute('TRUNCATE classes RESTART IDENTITY CASCADE;')
    db.session.commit()
