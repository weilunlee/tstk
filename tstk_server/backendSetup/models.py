from sqlalchemy import Column, Integer, String
from backendSetup.Database import Base

class Book_Value(Base):
    __tablename__ = 'book_value'
    id = Column(Integer, primary_key=True, index=True)
    code = Column(String)
    SVoverBV = Column(String)
    book_value = Column(Integer)
    current_price = Column(String)
    BV_history = Column(String)
    rank1 = Column(Integer)
    rank2 = Column(Integer)
    rank3 = Column(Integer)
    rank4 = Column(Integer)
    rank5 = Column(Integer)
