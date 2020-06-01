from app import db, engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String
from sqlalchemy import update, insert
from sqlalchemy.sql.selectable import Select

Base = declarative_base()


class Car(Base):
    __tablename__ = 'cars'
    id = Column(Integer, primary_key=True)
    name = Column(String(30))

    @classmethod
    async def get_car_by_id(cls, id_):
        # todo replace connection, disconnection lines with decorated functions
        await db.connect()
        data = await db.fetch_all(query=Select([Car]).where(Car.id == id_))
        print(data)
        await db.disconnect()

# todo add migrations
# creates all tables
# Base.metadata.create_all(engine)
