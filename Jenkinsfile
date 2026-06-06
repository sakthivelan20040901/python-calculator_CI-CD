pipeline {

```
agent any

stages {

    stage('Checkout') {

        steps {

            git 'https://github.com/sakthivelan20040901/YOUR_REPO.git'

        }
    }

    stage('Validate Compose') {

        steps {

            sh 'docker compose config'

        }
    }

    stage('Build Containers') {

        steps {

            sh 'docker compose build'

        }
    }

    stage('Deploy') {

        steps {

            sh 'docker compose down || true'

            sh 'docker compose up -d'

            sh 'sleep 30'

        }
    }

    stage('Health Checks') {

        steps {

            sh 'curl -f http://localhost:3000/api/products'

            sh 'curl -f http://localhost:8080/products'

            sh 'curl -f http://localhost:5000/recommend/1'

            sh 'curl -f http://localhost:8081/inventory/1'

            sh 'curl -f "http://localhost:8082/?price=1000"'

        }
    }

    stage('Verify Containers') {

        steps {

            sh 'docker compose ps'

        }
    }
}

post {

    success {

        echo "PolyShop deployment successful"

    }

    failure {

        echo "Pipeline failed"

    }
}
```

}
