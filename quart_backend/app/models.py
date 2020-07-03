from bcrypt import hashpw, gensalt

# from app import db, engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Numeric, Date, ForeignKey, Float, Boolean
from sqlalchemy import update, insert, join, delete
from sqlalchemy.sql.selectable import Select
from uuid import uuid4
from datetime import date
from app.common.db_init import DbWrapper

Base = declarative_base()
db = DbWrapper.create_instance()


# todo implement __repr__ and add to models
class TableMixin:
    @classmethod
    async def select_by_id(cls, id_: str):
        return await db.fetch_one(query=Select([cls]).where(cls.id == id_))

    @classmethod
    async def delete(cls, id_):
        return await db.execute(query=delete(cls).where(cls.id == id_))


class Car(TableMixin, Base):
    __tablename__ = 'cars'

    id = Column(String(32), primary_key=True)
    description = Column(String(60))
    cost = Column(Float)

    @classmethod
    async def insert(cls, obj) -> str:
        id_ = uuid4().hex
        obj.update(id=id_)
        await db.execute(query=insert(cls), values=obj)
        return id_

    @classmethod
    async def select_for_cars_table(cls, num_of_items: str, offset: str):
        query = "SELECT ca.id, ca.description, ca.cost, COUNT(ord.id) as num_of_orders " \
                "FROM cars as ca " \
                "LEFT JOIN orders as ord on ca.id = ord.id_car " \
                "GROUP BY ca.id " \
                f"LIMIT {num_of_items} " \
                f"OFFSET {offset}"
        return await db.fetch_all(query=query)


class Client(TableMixin, Base):
    __tablename__ = 'clients'

    id = Column(String(32), primary_key=True)
    first_name = Column(String(60))
    last_name = Column(String(60))
    registration_date = Column(Date)  # datetime.date()
    passport_number = Column(String(60), unique=True)
    hashed_password = Column(String(60))
    admin = Column(Boolean(), default=0)

    # todo replace all usages to insert method
    @classmethod
    async def insert_client(cls, client) -> None:
        await db.execute(query=insert(cls), values={
            "id": uuid4().hex,
            "first_name": client.first_name,
            "last_name": client.last_name,
            "registration_date": client.registration_date,
            "passport_number": client.passport_number,
            "hashed_password": client.hashed_password,
            "admin": 0
        })

    @classmethod
    async def insert(cls, obj) -> str:
        id_ = uuid4().hex
        obj.update(id=id_)
        obj.update(registration_date=date.today())
        obj.update(hashed_password=hashpw(str(obj["password"]).encode("utf-8"), gensalt()))
        obj.pop("password")
        obj.update(admin=0)
        await db.execute(query=insert(cls), values=obj)
        return id_

    @classmethod
    async def select_by_passport_number(cls, number: str):
        return await db.fetch_one(query=Select([cls]).where(cls.passport_number == number))

    @classmethod
    async def select_for_clients_table(cls, num_of_items: str, offset: str):
        query = "SELECT cl.id, cl.first_name, cl.last_name, cl.registration_date, COUNT(ord.id) as num_of_orders " \
                "FROM clients as cl " \
                "LEFT JOIN orders as ord ON cl.id = ord.id_client " \
                "GROUP BY cl.id " \
                f"LIMIT {num_of_items} " \
                f"OFFSET {offset}"
        return await db.fetch_all(query=query)


class Order(TableMixin, Base):
    __tablename__ = 'orders'

    id = Column(String(32), primary_key=True)
    id_client = Column(String(32), ForeignKey("clients.id"), nullable=False)
    id_car = Column(String(32), ForeignKey("cars.id"), nullable=False)
    add_date = Column(Date)  # datetime.date()
    rental_time = Column(Integer)  # in days

    @classmethod
    async def select_for_orders_table(cls, num_of_items: str, offset: str):
        query = "SELECT ord.id, ca.id, cl.passport_number, ord.add_date," \
                "ord.rental_time, ca.cost, (ord.rental_time * ca.cost) as total " \
                "FROM clients as cl " \
                "INNER JOIN orders as ord ON cl.id = ord.id_client " \
                "INNER JOIN cars as ca ON ord.id_car = ca.id " \
                f"LIMIT {num_of_items} " \
                f"OFFSET {offset}"
        return await db.fetch_all(query=query)

    @classmethod
    async def insert(cls, obj) -> str:
        id_ = uuid4().hex
        obj.update(id=id_)
        obj.update(add_date=date.today())
        await db.execute(query=insert(cls), values=obj)
        return id_

# deprecated, use alembic migrations
# creates all tables
# Base.metadata.create_all(engine)
