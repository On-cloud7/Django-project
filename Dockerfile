FROM python:3.12-slim
RUN apt-get update && apt-get install -y \
    pkg-config \
    libmariadb-dev-compat \
    gcc \
    && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY . /app/
RUN pip install --no-cache-dir -r requirements.txt
ENV PYTHONUNBUFFERED=1
ENV DOCKER_ENV=1
EXPOSE 8000
CMD ["sh", "-c", "python manage.py migrate && gunicorn mybookapp.wsgi:application --bind 0.0.0.0:8000"]