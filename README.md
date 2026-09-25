\# Cluster Kubernetes com Terraform e Kind



\## Objetivo



O objetivo da atividade foi criar um cluster Kubernetes local utilizando \*\*Terraform e Kind\*\*, com todo o provisionamento sendo feito pelo Terraform.



\## Cluster criado



Foi criado o cluster \*\*devops\*\* com a seguinte estrutura:



\* 1 node \*\*control-plane\*\*

\* 2 nodes \*\*workers\*\*



Os nodes criados foram:



\* `devops-control-plane`

\* `devops-worker`

\* `devops-worker2`



Após a criação, os três nodes ficaram com status \*\*Ready\*\*.



\## Principais componentes



\*\*Control-plane:\*\* é responsável por controlar e gerenciar o cluster.



\* \*\*API Server:\*\* recebe as requisições feitas ao Kubernetes.

\* \*\*Scheduler:\*\* define em qual node os Pods serão executados.

\* \*\*Controller Manager:\*\* acompanha e controla o estado dos recursos do cluster.

\* \*\*etcd:\*\* armazena as configurações e informações do cluster.



\*\*Workers:\*\* são os nodes responsáveis pela execução das aplicações e containers.



\* \*\*Kubelet:\*\* acompanha a execução dos Pods em cada node.

\* \*\*Container Runtime:\*\* executa os containers.

\* \*\*Kube-proxy:\*\* auxilia na comunicação de rede dentro do cluster.



\*\*CoreDNS:\*\* é responsável pela resolução de nomes e comunicação entre os serviços dentro do cluster.



\## Tecnologias utilizadas



Foram utilizados \*\*Terraform, Kind, Docker Desktop, Kubernetes e kubectl\*\*.



\## Validação



Para verificar se o cluster foi criado corretamente, foram utilizados os comandos:



`kubectl get nodes -o wide`



Esse comando mostrou o control-plane e os dois workers com status \*\*Ready\*\*.



`kubectl cluster-info`



Esse comando confirmou que o cluster Kubernetes estava funcionando.



O cluster \*\*devops\*\* foi criado com sucesso pelo Terraform com \*\*1 control-plane e 2 workers\*\*, conforme solicitado na atividade.



