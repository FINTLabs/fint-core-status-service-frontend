#!/bin/bash

# Check if kubectl is installed
if ! command -v kubectl &> /dev/null
then
    echo "kubectl command not found. Please ensure kubectl is installed and available in PATH."
    exit 1
fi

# Set the namespace to 'fint-core'
NAMESPACE="fint-core"

echo "Switching namespace to '$NAMESPACE'..."

# Verify if the namespace exists
if ! kubectl get namespace $NAMESPACE &> /dev/null
then
    echo "Namespace '$NAMESPACE' not found. Please ensure the namespace exists."
    exit 1
fi

# Get the deployment name for fint-core-status-service
echo "Fetching deployment for 'fint-core-status-service' in namespace '$NAMESPACE'..."
DEPLOYMENT_NAME=$(kubectl -n $NAMESPACE get deployment -l app=fint-core-status-service -o jsonpath='{.items[0].metadata.name}')

if [ -z "$DEPLOYMENT_NAME" ]; then
    echo "No deployment found for 'fint-core-status-service' in namespace '$NAMESPACE'. Please verify the deployment exists."
    exit 1
fi

# Function to clean up background process
cleanup() {
    echo "Stopping port forwarding..."
    kill $PORT_FORWARD_PID
    exit 0
}

# Trap to clean up on script exit
trap cleanup SIGINT SIGTERM

# Port forward the deployment
echo "Port forwarding 'fint-core-status-service' deployment on port 9090..."
kubectl -n $NAMESPACE port-forward deployment/$DEPLOYMENT_NAME 9090:8080 &
PORT_FORWARD_PID=$!

# Wait for the port-forwarding process to keep running
wait $PORT_FORWARD_PID
