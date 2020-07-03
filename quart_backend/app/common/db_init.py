from databases import Database


class DbWrapper:
    @classmethod
    def create_instance(cls):
        if not hasattr(cls, 'instance'):
            if hasattr(cls, '_database_url'):
                cls.instance = Database(cls._database_url)
            else:
                raise Exception("Database url must be set")
        return cls.instance

    @classmethod
    def set_url(cls, url):
        cls._database_url = url
