output "cluster_name" {
  description = "Nome do cluster Kind criado"
  value       = kind_cluster.devops.name
}

output "kubeconfig" {
  description = "Kubeconfig do cluster"
  value       = kind_cluster.devops.kubeconfig
  sensitive   = true
}