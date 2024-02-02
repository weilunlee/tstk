from sqlalchemy import Column, Integer, String
from Database import Base


class Book_Value(Base):
    __tablename__ = 'book_value'
    id = Column(Integer, primary_key=True, index=True)
    code = Column(String)
    book_value = Column(Integer)
    rank = Column(Integer)
    BV_history = Column(String)
