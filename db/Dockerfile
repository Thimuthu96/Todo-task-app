# Use the official MySQL image as the base image
FROM mysql:8.0

# Copy .env file
COPY .env /.env

# Load environment variables from .env file
ENV $(cat /.env | xargs)

# Copy any initialization scripts
COPY ./init.sql /docker-entrypoint-initdb.d/

# Expose the default MySQL port
EXPOSE 3306

# Add healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD mysqladmin ping -h localhost -u root --password=$MYSQL_ROOT_PASSWORD || exit 1
