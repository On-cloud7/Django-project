import os
import dj_database_url
import logging

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

from pathlib import Path
BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = "django-insecure-yp(ewn-3r@d4ra$g_1t6*nuo!z^ddj0ec%u@)0%!sg2nd8b_9$"
DEBUG = True
ALLOWED_HOSTS = ['localhost', '127.0.0.1', 'host.docker.internal']

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    'core',
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "mybookapp.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [BASE_DIR / "templates"],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "mybookapp.wsgi.application"

# Database
if os.environ.get('DOCKER_ENV'):
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.mysql',
            'NAME': 'mysql',
            'USER': 'myappdbuser',
            'PASSWORD': 'myappdbpass',
            'HOST': 'localhost',
            'PORT': '3306',
            'OPTIONS': {}
        }
    }
    logger.debug("Running in Docker, forcing TCP")
else:
    db_config = dj_database_url.config(default='sqlite:///db.sqlite3')
    if 'DATABASE_URL' in os.environ:
        logger.debug(f"Using DATABASE_URL: {os.environ['DATABASE_URL']}")
        # Ensure TCP if localhost:3306 is specified
        if 'localhost:3306' in os.environ['DATABASE_URL']:
            db_config['HOST'] = 'localhost'
            db_config['PORT'] = '3306'
            db_config['OPTIONS'] = {}
    else:
        db_config.update({
            'ENGINE': 'django.db.backends.mysql',
            'NAME': 'mysql',
            'USER': 'myappdbuser',
            'PASSWORD': 'myappdbpass',
            'HOST': 'localhost',
            'PORT': '3306',  # Default to TCP
              
        })
    DATABASES = {'default': db_config}
    logger.debug(f"Local DB config: {DATABASES['default']}")

AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]

LANGUAGE_CODE = "en-us"
TIME_ZONE = "UTC"
USE_I18N = True
USE_TZ = True

STATIC_URL = '/static/'
STATICFILES_DIRS = [BASE_DIR / "static"]
STATIC_ROOT = BASE_DIR / "staticfiles"

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"
