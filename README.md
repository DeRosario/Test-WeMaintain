# Test-WeMaintain

## Requirements

### 1. Install nodejs
https://nodejs.org/fr/

### 2. Install Docker
https://docs.docker.com/engine/install/

### 3. Install Docker Compose
https://docs.docker.com/compose/install/

## How to start the project

### 1. Start the deployment script
Go into folder and run command :
```
sh deploy-project.sh
```

### 2. Server is running
Go to your web browser and access the application
The application is running on the port 80 (HTTP)

### 3. Setup the database
Just use the API to setup the database;
```
/main/setupdb
```

## Documentation API

#### GET - Setup the DB
```
/main/setupdb
```

#### GET - /main/?bandIds=[String - Comma separated list of bandIds]
```
Example :
/main/?bandIds=1
/main/?bandIds=1,4,5
```

#### GET - /main/?latitude=[String - Number in Float]&longitude=[String - Number in Float]&radius=[String - Number in Integer]

```
Example :
/main/?latitude=48.8814422&longitude=2.3684356&radius=5
```

#### GET - /main/?bandIds=[String - Comma separated list of bandIds]&latitude=[String - Number in Float]&longitude=[String - Number in Float]&radius=[String - Number in Integer]

```
Example :
/main/?bandIds=1,5&latitude=48.8814422&longitude=2.3684356&radius=5
```




# ANSWERS STEP 2

#### - Describe in detail how you would store and query the data, and what kind of mechanism you would leverage to consistently deliver short response times and guarantee the highest uptime possible.

1. Indexation of uniques values (SQL / NoSQL).
2. SQL use of Views (Virtual Tables) with the joins requests.
3. Caching response with Redis.
4. Use pagination in API call to send data parts by parts, and not everything at once.
5. Microservices architecture :
Microservices architecture provides long-term agility. Better maintainability in complex, large, and highly-scalable systems by letting you create applications based on many independently deployable services.
Microservices can scale out independently. That way, you can scale just the functional area that needs more processing power or network bandwidth to support demand, rather than scaling out other areas of the application that don't need to be scaled.

#### - What do you identify as possible risks in the architecture that you described in the long run, and how would you mitigate those?

With the microservices architecture, the application will be separated in a multiples differents services, increasing the complexity and deployment of the application.

#### What are the key elements of your architecture that would need to be monitored, and what would you use to monitor those?

The Key elements of the microservices architectures is the Docker containers. At any time, the containers can be down, so we will need to monitor theses containers to deploy new containers
to replace them or just to handle the high availability.
To monitor the containers we will need a container orchestrator like Kubernetes for example, to automate deployment, scale, and manage a containerized application.



