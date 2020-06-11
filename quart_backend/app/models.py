from app import db, engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Numeric, Date, ForeignKey, Float
from sqlalchemy import update, insert
from sqlalchemy.sql.selectable import Select
from uuid import uuid4

Base = declarative_base()


class TableMixin:
    pass


class Car(Base):
    __tablename__ = 'cars'

    id = Column(String(32), primary_key=True)
    description = Column(String(60))
    cost = Column(Float)

    @classmethod
    async def select_car_by_id(cls, id_):
        return await db.fetch_one(query=Select([cls]).where(cls.id == id_))


class Client(Base):
    __tablename__ = 'clients'

    id = Column(String(32), primary_key=True)
    first_name = Column(String(60))
    last_name = Column(String(60))
    registration_date = Column(Date)  # datetime.date()
    passport_number = Column(String(60), unique=True)
    hashed_password = Column(String(60))

    @classmethod
    async def insert_client(cls, client):
        await db.execute(query=insert(cls), values={
            "id": uuid4().hex,
            "first_name": client.first_name,
            "last_name": client.last_name,
            "registration_date": client.registration_date,
            "passport_number": client.passport_number,
            "hashed_password": client.hashed_password
        })

    @classmethod
    async def select_by_passport_number(cls, number):
        return await db.fetch_one(query=Select([cls]).where(cls.passport_number == number))


class Order(Base):
    __tablename__ = 'orders'

    id = Column(String(32), primary_key=True)
    id_client = Column(String(32), ForeignKey("clients.id"), nullable=False)
    id_car = Column(String(32), ForeignKey("cars.id"), nullable=False)
    add_date = Column(Date)  # datetime.date()
    rental_time = Column(Integer)  # in days


# deprecated, use alembic migrations
# creates all tables
# Base.metadata.create_all(engine)
