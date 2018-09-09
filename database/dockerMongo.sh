echo "$(tput setaf 7)$(tput setab 166)$(tput bold) --CREATING MONGO DOCKER CONTAINER-- $(tput sgr 0)"
docker kill localmongo
docker rm -f localmongo
docker run -p 27017:27017 --name localmongo -d mongo
sleep 3
echo "$(tput setaf 7)$(tput setab 166)$(tput bold) --LOADING DATA-- $(tput sgr 0)"
node ./database/loadTestMongoData.js