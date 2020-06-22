from databases import Database


class DbWrapper:
    @classmethod
    def create_instance(cls):
        if not hasattr(cls, 'instance'):
            if hasattr(cls, 'database_url'):
                cls.instance = Database(cls.database_url)
            else:
                raise Exception("Database url must be set")
        return cls.instance

    @classmethod
    def set_url(cls, url):
        cls.database_url = url
