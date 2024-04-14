from Database import create_session
import models

session = create_session()

result = session.query(models.Book_Value).first()
