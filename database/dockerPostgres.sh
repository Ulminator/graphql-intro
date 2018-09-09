echo "$(tput setaf 7)$(tput setab 166)$(tput bold) --CREATING POSTGRES DOCKER CONTAINER-- $(tput sgr 0)"
docker kill localpostgres
docker rm -f localpostgres
docker run -p 5432:5432 --name localpostgres -d postgres

echo "$(tput setaf 7)$(tput setab 166)$(tput bold) --COPYING FILES-- $(tput sgr 0)"
docker cp ./database/test-pg-data.sql localpostgres:/test-pg-data.sql
sleep 3

echo "$(tput setaf 7)$(tput setab 166)$(tput bold) --CREATING TABLES-- $(tput sgr 0)"
docker exec -d localpostgres psql -U postgres -w -f test-pg-data.sql