node('mac_mini') {
    def buildPlatform = sh(script: 'uname', returnStdout: true).toLowerCase()
    echo 'buildPlatform: ' + buildPlatform

    def buildTimestamp = sh(script: 'date +%Y%m%d%H%M%S%Z', returnStdout: true).replaceAll("\r", "").replaceAll("\n", "");

    // for MacOS only
    def sshKeyPath = '/Users/handeducation/.ssh/server_keys/azure_dockerhost'

    def environment = 'test' // dev & dev2 & test & progresstest & staging & production & test2
    def buildType = 'dev' // dev or prod

    // default variables for dev2 env
    def versionNum = '1.0.0'
    def buildNumber = '100'
    def clientConfig = """
    export class HEMPConfig {
        basePath = "https://dev2.zhishinet.com/app/HEMPlatform-service/rest/v6";
        zAuth = "https://dev2.zhishinet.com/api/zauth/v1";
        appStudent = "https://dev2.zhishinet.com/api/user-profile/v1";
        teacherBasePath = "https://dev2.zhishinet.com/api/teacher/v1";
        currentVersion = "1.0.0";
        currentBuildNumber = 100;
    }
    """

    // default variables for deployment
    def nginxServerIP = '172.0.0.11'
    def nginxServerUsername = 'core'
    def nginxProjectPath = '/home/core/nginx/html/static_res_dev2/pages'

    stage('checkout') {
        checkout scm
    }
    stage('config'){
        echo "config with ${environment} env"

        switch (environment) {
            case 'dev' :
                nginxServerIP = '172.0.0.11'
                nginxServerUsername = 'core'
                nginxProjectPath = '/home/core/nginx/html/static_res_dev/pages'
                clientConfig = """
                export class HEMPConfig {
                    basePath = "https://dev.zhishinet.com/app/HEMPlatform-service/rest/v6";
                    zAuth = "https://dev.zhishinet.com/api/zauth/v1";
		    appStudent = "https://dev.zhishinet.com/api/user-profile/v1";
                    teacherBasePath = "https://dev.zhishinet.com/api/teacher/v1";
                    currentVersion = "1.0.0";
                    currentBuildNumber = 100;
                }
                """
                break;
            case 'dev2' :
                nginxServerIP = '172.0.0.11'
                nginxServerUsername = 'core'
                nginxProjectPath = '/home/core/nginx/html/static_res_dev2/pages'
                clientConfig = """
                export class HEMPConfig {
                    basePath = "https://dev2.zhishinet.com/app/HEMPlatform-service/rest/v6";
                    zAuth = "https://dev2.zhishinet.com/api/zauth/v1";
                    appStudent = "https://dev2.zhishinet.com/api/user-profile/v1";
                    teacherBasePath = "https://dev2.zhishinet.com/api/teacher/v1";
                    currentVersion = "1.0.0";
                    currentBuildNumber = 100;
                }
                """
                break;
            case 'test' :
                nginxServerIP = '172.0.0.11'
                nginxServerUsername = 'core'
                nginxProjectPath = '/home/core/nginx/html/static_res/pages'
                clientConfig = """
                export class HEMPConfig {
                    basePath = "https://test.zhishinet.com/app/HEMPlatform-service/rest/v6";
                    zAuth = "https://test.zhishinet.com/api/zauth/v1";
                    appStudent = "https://test.zhishinet.com/api/user-profile/v1";
                    teacherBasePath = "https://test.zhishinet.com/api/teacher/v1";
                    currentVersion = "1.0.0";
                    currentBuildNumber = 100;
                }
                """
                break;
            case 'test2' :
                nginxServerIP = '172.0.0.11'
                nginxServerUsername = 'core'
                nginxProjectPath = '/home/core/nginx/html/static_res_test2/pages'
                clientConfig = """
                export class HEMPConfig {
                    basePath = "https://test2.zhishinet.com/app/HEMPlatform-service/rest/v6";
                    zAuth = "https://test2.zhishinet.com/api/zauth/v1";
                    appStudent = "https://test2.zhishinet.com/api/user-profile/v1";
                    teacherBasePath = "https://test2.zhishinet.com/api/teacher/v1";
                    currentVersion = "1.0.0";
                    currentBuildNumber = 100;
                }
                """
                break;
            case 'progresstest' :
                nginxServerIP = '172.0.0.11'
                nginxServerUsername = 'core'
                nginxProjectPath = '/home/core/nginx/html/static_res_progresstest/pages'
                clientConfig = """
                export class HEMPConfig {
                    basePath = "https://progresstest.zhishinet.com/app/HEMPlatform-service/rest/v6";
                    zAuth = "https://progresstest.zhishinet.com/api/zauth/v1";
                    appStudent = "https://progresstest.zhishinet.com/api/user-profile/v1";
                    teacherBasePath = "https://progresstest.zhishinet.com/api/teacher/v1";
                    currentVersion = "1.0.0";
                    currentBuildNumber = 100;
                }
                """
                break;
            case 'staging' :
                nginxServerIP = '172.0.0.15'
                nginxServerUsername = 'core'
                nginxProjectPath = '/home/core/nginx/html/staging_static_res/pages'
                clientConfig = """
                export class HEMPConfig {
                    basePath = "https://staging.zhishinet.com/app/HEMPlatform-service/rest/v6";
                    zAuth = "https://staging.zhishinet.com/api/zauth/v1";
                    appStudent = "https://staging.zhishinet.com/api/user-profile/v1";
                    teacherBasePath = "https://staging.zhishinet.com/api/teacher/v1";
                    currentVersion = "1.0.0";
                    currentBuildNumber = 100;
                }
                """
                break;
            case 'production' :
                nginxServerIP = '172.0.0.15'
                nginxServerUsername = 'core'
                nginxProjectPath = '/home/core/nginx/html/static_res/pages'
                clientConfig = """
                export class HEMPConfig {
                    basePath = "https://www.zhishinet.com/app/HEMPlatform-service/rest/v6";
                    zAuth = "https://www.zhishinet.com/api/zauth/v1";
                    appStudent = "https://www.zhishinet.com/api/user-profile/v1";
                    teacherBasePath = "https://www.zhishinet.com/api/teacher/v1";
                    currentVersion = "1.0.0";
                    currentBuildNumber = 100;
                }
                """
                buildType = 'prod'
                break;
        }

        // overwrite ./src/config/ClientConfig.json with environment template
        sh "echo '${clientConfig}' > ./src/config.ts"

        // change versionNumber in ./src/config/ClientConfig.json
        if (buildPlatform.contains('darwin')) {
            sh 'gsed -i \'s/currentVersion\\s*=\\s*"\\([0-9\\.]*\\)"/currentVersion = "' + versionNum + '"/g\' ./src/config.ts'
        } else if (buildPlatform.contains('linux')) {
            sh 'sed -i \'s/currentVersion\\s*=\\s*"\\([0-9\\.]*\\)"/currentVersion = "' + versionNum + '"/g\' ./src/config.ts'
        }

        // change versionNumber in ./config.xml
        if (buildPlatform.contains('darwin')) {
            sh 'gsed -i \'s/<widget\\(.*\\)version="\\([^"]*\\)"\\([^>]*\\)>/<widget\\1version="' + versionNum + '"\\3>/g\' ./config.xml'
        } else if (buildPlatform.contains('linux')) {
            sh 'sed -i \'s/<widget\\(.*\\)version="\\([^"]*\\)"\\([^>]*\\)>/<widget\\1version="' + versionNum + '"\\3>/g\' ./config.xml'
        }

        // change buildNumber in ./src/config/ClientConfig.json
        if (buildPlatform.contains('darwin')) {
            sh 'gsed -i \'s/currentBuildNumber\\s*=\\s*\\([0-9]*\\)/currentBuildNumber = ' + buildNumber + '/g\' ./src/config.ts'
        } else if (buildPlatform.contains('linux')) {
            sh 'sed -i \'s/currentBuildNumber\\s*=\\s*\\([0-9]*\\)/currentBuildNumber = ' + buildNumber + '/g\' ./src/config.ts'
        }
    }
    stage('build'){
        echo 'build www project'
        def nodeHome = tool name: 'recent node', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
        //sh "${nodeHome}/bin/node -v"
        env.PATH="${env.PATH}:${nodeHome}/bin"
        if (buildType == 'dev') {
            // sh "npm install && npm install -g gulp && gulp clean && gulp build-dev"
            sh "npm install && npm run build-libs-dev && npm run build-dev"
        } else {
            // sh "npm install && npm install -g gulp && gulp clean && gulp build-prod"
            sh "npm install && npm run build-libs-prod && npm run build-prod"
        }
    }
    stage('test') {
        echo 'run unit test (not supported now)'
    }
    stage('archive') {
        sh "tar -zcvf react-redux-antd-webpack.tar.gz ./www"
        archiveArtifacts artifacts: 'react-redux-antd-webpack.tar.gz', fingerprint: true
    }
    stage('deploy-website') {
        echo "publish to ${environment} env"
        sshagent(credentials: ['04d588f3-fbbd-4547-8b0c-9c23de17e21e']) {
            if (buildPlatform.contains('darwin')) {
                sh "ssh -i ${sshKeyPath} -o StrictHostKeyChecking=no ${nginxServerUsername}@${nginxServerIP} uname -a"
                sh "scp -i ${sshKeyPath} -o StrictHostKeyChecking=no ./StudentClient.tar.gz ${nginxServerUsername}@${nginxServerIP}:~/"
                sh 'ssh -i ' + sshKeyPath + ' -o StrictHostKeyChecking=no ' + nginxServerUsername + '@' + nginxServerIP + ' "cd ' +nginxProjectPath + ' && tar -zcvf react-redux-antd-webpack\\`date -r ./StudentClient +%Y%m%d%H%M%S%Z\\`.tar.gz -C ./react-redux-antd-webpack www && rm -rf ./react-redux-antd-webpack/*"'
                sh 'ssh -i ' + sshKeyPath + ' -o StrictHostKeyChecking=no ' + nginxServerUsername + '@' + nginxServerIP + ' "cd ' +nginxProjectPath + ' && tar -zxvf ~/react-redux-antd-webpack.tar.gz -C ./StudentClient && rm -rf ~/react-redux-antd-webpack.tar.gz"'
            } else if (buildPlatform.contains('linux')) {
                sh "ssh -o StrictHostKeyChecking=no ${nginxServerUsername}@${nginxServerIP} uname -a"
                sh "scp -o StrictHostKeyChecking=no ./StudentClient.tar.gz ${nginxServerUsername}@${nginxServerIP}:~/"
                sh 'ssh -o StrictHostKeyChecking=no ' + nginxServerUsername + '@' + nginxServerIP + ' "cd ' +nginxProjectPath + ' && tar -zcvf react-redux-antd-webpack\\`date -r ./react-redux-antd-webpack +%Y%m%d%H%M%S%Z\\`.tar.gz -C ./react-redux-antd-webpack www && rm -rf ./react-redux-antd-webpack/*"'
                sh 'ssh -o StrictHostKeyChecking=no ' + nginxServerUsername + '@' + nginxServerIP + ' "cd ' +nginxProjectPath + ' && tar -zxvf ~/react-redux-antd-webpack.tar.gz -C ./react-redux-antd-webpack && rm -rf ~/react-redux-antd-webpack.tar.gz"'
            }
        }
    }
}
