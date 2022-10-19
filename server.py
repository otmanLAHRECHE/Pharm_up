from waitress import serve

from Pharm_up.wsgi import application


if __name__ == '__main__':
    serve(application, listen='*:8000')