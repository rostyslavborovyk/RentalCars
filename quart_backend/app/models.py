from app import db, engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Numeric, Date, ForeignKey, Float
from sqlalchemy import update, insert
from sqlalchemy.sql.selectable import Select

Base = declarative_base()


class TableMixin:
    pass


class Car(Base):
    __tablename__ = 'cars'

    id = Column(Integer, primary_key=True, autoincrement=True)
    description = Column(String(60))
    cost = Column(Float)

    @classmethod
    async def get_car_by_id(cls, id_):
        data = await db.fetch_all(query=Select([cls]).where(cls.id == id_))
        return data[0]


class Client(Base):
    __tablename__ = 'clients'

    id = Column(Integer, primary_key=True, autoincrement=True)
    first_name = Column(String(60))
    last_name = Column(String(60))
    registration_date = Column(Date)  # datetime.date()
    passport_number = Column(String(60))
    


class Order(Base):
    __tablename__ = 'orders'

    id = Column(Integer, primary_key=True, autoincrement=True)
    id_client = Column(Integer, ForeignKey("clients.id"), nullable=False)
    id_car = Column(Integer, ForeignKey("cars.id"), nullable=False)
    add_date = Column(Date)  # datetime.date()
    rental_time = Column(Integer)  # in days

# todo add migrations
# creates all tables
# Base.metadata.create_all(engine)
